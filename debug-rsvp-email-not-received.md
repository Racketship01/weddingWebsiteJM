# Debug Session: rsvp-email-not-received
**Status:** [OPEN]
**Created:** 2026-10-09
**Symptom:** User submits the RSVP form but does not receive the RSVP notification email in their Gmail inbox. Success toast may or may not appear on the frontend; regardless, the email never arrives.
**Expected:** After successfully submitting the RSVP form, a formatted HTML email with the guest's name, attendance, and message should arrive in the configured Gmail recipient's inbox (rsvpjuliusyeng@gmail.com by default).

---

## Step 1 · Hypotheses (pre-evidence)
| # | Hypothesis | Falsifiable Test | Status |
|---|------------|------------------|--------|
| H1 | Gmail App Password in `.env` is a placeholder/incorrect. Nodemailer SMTP AUTH fails with `535 5.7.8 Username and Password not accepted` and the API route returns 500. | Inspect Debug Server log for point `B:sendmail-error` or catch in rsvp.post.ts; look for `errCode=EAUTH` or SMTP 535 response. | Pending |
| H2 | Gmail SMTP connection blocked by Windows firewall/antivirus/network. Nodemailer fails with `ECONNREFUSED`, `ETIMEDOUT`, or `EPROTO` when connecting to `smtp.gmail.com:587`. | Inspect Debug Server log at point `B:sendmail-error` for `errCode=ECONNREFUSED/ETIMEDOUT`. | Pending |
| H3 | Email was sent successfully by Nodemailer (API returns `ok:true`) but Gmail delivered it to Spam/Trash or soft-bounced it. `accepted: [rsvpjuliusyeng@gmail.com]` appears in the success log. | Inspect `B:sendmail-success` log line; check `accepted` vs `rejected` arrays. Also manually check Gmail Spam folder. | Pending |
| H4 | API route is not being reached (404), or throws 400 validation error before `sendRsvpEmail` is called — the frontend swallows it in toast and user never sees it. | Check Debug Server for presence of `D:route-entry` log line. If absent, route never ran. Check for 400 validation errors. | Pending |
| H5 | `.env` vars not loaded by Nuxt dev server (e.g. server not restarted after .env edit). `getConfig()` throws "not configured" 500. | Check Debug Server log `A:get-config-missing` is reported; error response says "Email service is not configured". | Pending |

---

## Step 2 · Instrumentation
Existing instrumentation is in place from the prior `rsvp-email-failure` session in:
- [send-email.ts](file:///c:/project/wedding-yeng/server/utils/send-email.ts) — points A (config), B (transporter/verify/sendMail+catch)
- [rsvp.post.ts](file:///c:/project/wedding-yeng/server/api/rsvp.post.ts) — points D (route-entry, validation, send-call, send-ok, send-exception)
- [RsvpForm.vue](file:///c:/project/wedding-yeng/app/components/sections/RsvpForm.vue) — client submit, ok, catch

We reuse these but point them at a new Debug Server sessionId `rsvp-email-not-received` by writing a new `.dbg/rsvp-email-not-received.env` via `--sessionId` at server launch.

- [x] Reuse existing instrumentation (in-code debug points).
- [x] Start Debug Server with sessionId `rsvp-email-not-received` so env file auto-writes new session to `.dbg/rsvp-email-not-received.env`.
- [x] User will: 1) restart Nuxt dev server (to pick up the new .dbg env file), 2) submit RSVP once.

---

## Step 3 · Evidence Log
*(runtime log excerpts collected from Debug Server `/logs` endpoint after reproduction)*

### Pre-fix evidence (reproduced 2026-10-09 via direct POST /api/rsvp)
| Hypothesis | Evidence point | Finding | Status |
|---|---|---|---|
| H1 (bad password) | B:verify-transporter + A:get-config | smtpUserLen=24, smtpPassLen=16 (spaces stripped OK), transporter.verify()=true. SMTP AUTH succeeds against Gmail. | REJECTED |
| H2 (firewall block) | B:verify-transporter | verify returns true — connection established, TLS handshake works. | REJECTED |
| H3 (spam folder) | B:sendmail-error | sendMail never runs; throws TypeError BEFORE Gmail accepts message for delivery. | REJECTED |
| H4 (route 404) | D:route-entry | Route runs successfully; 7 log points flow A -> B -> D as expected. | REJECTED |
| H5 (env missing) | A:get-config | smtpUserSet=true, smtpPassSet=true, recipientSet=true. | REJECTED |
| NEW Hx (Nodemailer v10 + Nitro API incompat) | B:sendmail-error | errMsg=`transporter.sendMail(...) is not a function`. After IIFE rewrite: ASI crash `(intermediate value) is not a function`. | CONFIRMED (2 sub-bugs) |

---

## Step 4 · Root Cause Determination
Primary (Hx-a): Nodemailer v10 Mail object inside Nitro bundle — .sendMail typeof-check passes but direct `await transporter.sendMail(...)` invocation throws "not a function" (Proxy/getter object shape mismatch). Only callback-based invocation `tAny.sendMail(options, callback)` works reliably.

Secondary (Hx-b): ASI parser corner case — `} catch (...) {} (async () => __dbgReport())()` — IIFE directly after closing brace without separator -> Nitro/ESBuild try/catch parser confused -> crash "Expected finally but found }" or "(intermediate value) is not a function".

---

## Step 5 · Fix Applied
File: send-email.ts function sendRsvpEmail():
1. Replaced direct `await transporter.sendMail(options)` with callback-style wrapped in Promise (falls back to .then() if callback unused). Strategy: `top_sendMail_callback`.
2. Removed 4 IIFE wrappers — replaced `;(async()=>{await __dbgReport(...)})()` with direct `__dbgReport(...).catch(()=>{})` (function is already async).
3. Added optional chaining on info (info?.accepted) for non-standard sendMail returns.

---

## Step 6 · Post-fix Verification
| Check | Pre-fix | Post-fix |
|---|---|---|
| sendMail call | TypeError / ASI crash | SUCCESS strategy=top_sendMail_callback |
| Gmail SMTP | (never reached) | 250 2.0.0 OK ... gsmtp |
| API HTTP status | 500 / worker crash | **200 OK: ok:true, accepted:[rsvpjuliusyeng@gmail.com]** |

---

## Step 7 · Cleanup
(Pending user confirmation of email delivery)
