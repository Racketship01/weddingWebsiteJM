# Debug Session: rsvp-email-failure
**Status:** [OPEN]
**Created:** 2026-10-09
**Symptom:** RSVP form responses are not being delivered via email to Gmail after form submission.
**Expected:** Submitting the RSVP form should send a formatted email to the configured Gmail recipient.

---

## Step 1 · Hypotheses (pre-evidence)
| # | Hypothesis | Falsifiable Test | Status |
|---|------------|------------------|--------|
| H1 | `.env` file is missing or `GMAIL_USER` / `GMAIL_APP_PASSWORD` are not set, causing the `getConfig()` check in `send-email.ts` to throw a 500. | Check env file existence + content; inspect /api/rsvp error response for "not configured" message. | Pending |
| H2 | `GMAIL_APP_PASSWORD` is a regular Gmail password instead of a 16-char App Password (2FA is on for the account), so Gmail rejects SMTP AUTH. | Inspect nodemailer error code / message at catch site inside `sendRsvpEmail()`. | Pending |
| H3 | Gmail SMTP (ssl/port 465 or tls/587) connection is blocked by the local network / firewall / antivirus on Windows. | Look for `ECONNREFUSED`, `ETIMEDOUT`, or `EPROTO` in server logs. | Pending |
| H4 | Nuxt server route is not being reached / 404 — the server-side code under `app/server/` may not be picked up by Nuxt's auto-import because of `srcDir: 'app'` interaction. | Call `POST /api/rsvp` directly and compare HTTP status vs expected. | Pending |
| H5 | `nodemailer` fails to load or is not bundled by Nitro for the server build (ESM/CJS mismatch), so importing it throws at runtime. | Check server console (nuxt dev) for import errors at request time. | Pending |

---

## Step 2 · Instrumentation
- [ ] Add debug-server instrumentation at key points
  - [ ] `app/server/utils/send-email.ts`: getConfig(), createTransport(), sendMail() call + catch
  - [ ] `app/server/api/rsvp.post.ts`: request body validation, pre-email send, post-email send, catch
  - [ ] `app/components/sections/RsvpForm.vue`: client-side fetch response + catch

---

## Step 3 · Evidence Log
*(link to log lines / excerpts after reproduction)*

### Pre-fix evidence
- **API call `POST http://127.0.0.1:3000/api/rsvp` returned HTTP 404** (Invoke-WebRequest test)
- **Nuxt dev server console emitted:** `[VUE_ROUTER_R0004] No match found for location with path "/api/rsvp"` — the request was routed to Vue's client-side router, not to Nitro server handlers → Nuxt was unaware of any server API route under `/api`.
- **Debug Server log bucket is empty (`[]`) at `/logs`** — proves none of the server-side instrumentation points ran (not D:route-entry, not A:get-config, not B:create-transporter, …). The handler code never executed.
- **Directory layout:** `server/` currently lives at `app/server/` (`srcDir: 'app'` in [nuxt.config.ts](file:///c:/project/wedding-yeng/nuxt.config.ts#L2-L6)). Nuxt/Nitro scans for `server/` at the **project root** (the folder containing `nuxt.config.ts`), NOT inside `srcDir`.
- **H2 secondary finding (pre-emptive):** `GMAIL_APP_PASSWORD` in `.env` contains spaces: `gvbf hizu abbv dtae`. Google App Passwords are 16 chars with no whitespace; spaces are a UI affordance only. SMTP AUTH may reject whitespace.
- **H1 status:** env vars ARE set in `.env` (user/pass/recipient values present).

## Step 4 · Root Cause Determination
### Primary root cause: H4 CONFIRMED — Route registration 404 (server directory in wrong place)
**Why:** Nuxt 4 + Nitro discover server API routes / middleware / utils by scanning a `server/` folder at the **project root** — the same directory that holds `nuxt.config.ts`. With `srcDir: 'app'` the project intentionally relocates `components/`, `pages/`, etc. inside `app/`, but `server/` is NOT part of `srcDir` scanning — it is always anchored at project root. The current `app/server/api/rsvp.post.ts` and `app/server/utils/send-email.ts` are invisible to Nitro.

Fix (minimal): relocate `app/server/` → `./server/` (project-root level alongside `nuxt.config.ts`). No further config change is needed because this is Nitro's default scan location.

### Secondary root cause: H2 LIKELY — Spaces in GMAIL_APP_PASSWORD
Google App Passwords are 16 characters with no whitespace (e.g. `gvbfhizuabbvdtae`). The UI shows them grouped with spaces for readability, but SMTP AUTH PLAIN encodes the password verbatim. Including spaces changes the byte string length from 16 → 19 and almost certainly causes Google to reject with `535-5.7.8 Username and Password not accepted` (SMTP auth error).

Fix: Normalize the password inside `getConfig()` by stripping all whitespace before passing to nodemailer, so it works whether the user pastes the spaced or unspaced variant.


---

## Step 5 · Fix Applied
**Two minimal fixes:**

### Fix #1 (H4 — primary): Relocate server/ from srcDir to project root
- Before: `app/server/api/rsvp.post.ts` + `app/server/utils/send-email.ts`
- After:  `server/api/rsvp.post.ts` + `server/utils/send-email.ts` (siblings to `nuxt.config.ts`)
- Note: `rsvp.post.ts` import path updated from `'../../utils/send-email'` → `'../utils/send-email'` to match new relative location.
- No `nuxt.config.ts` change required because Nitro's default `serverDir` === `./server` at project root.

### Fix #2 (H2 — secondary): Strip whitespace in GMAIL_APP_PASSWORD before AUTH
In [send-email.ts `getConfig()`](file:///c:/project/wedding-yeng/server/utils/send-email.ts#L27-L45):
```ts
const rawPass = process.env.GMAIL_APP_PASSWORD
const smtpPass = rawPass ? rawPass.replace(/\s+/g, '') : rawPass
```
This turns `gvbf hizu abbv dtae` (19 chars with spaces, what users paste from Google UI) into `gvbfhizuabbvdtae` (16 chars, what Google/SMTP AUTH expects). Logging reports the before (`rawPassLen`) / after (`smtpPassLen`) lengths and whether the original contained spaces.

### Instrumentation retained
All debug-point wrappers kept, but `runId` flipped from `'pre'` to `'post'` so the comparison step can distinguish the two runs.


---

## Step 6 · Post-fix Verification (pre vs post log comparison)

---

## Step 7 · Cleanup
- [ ] Remove instrumentation code
- [ ] Stop Debug Server
- [ ] Remove .dbg/* and log file
