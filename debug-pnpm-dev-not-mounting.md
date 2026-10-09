# Debug Session: pnpm-dev-not-mounting

- **Status**: [OPEN]
- **Session ID**: pnpm-dev-not-mounting
- **Started**: 2026-09-28
- **Symptom**: Website does not mount when running `pnpm dev`. Expected: Nuxt app hydrates and renders sections at http://localhost:3000. Actual: body empty, no interactive refs, or hydration error from console / browser (reproduces "The WebView must be attached to the DOM and the dom-ready event emitted" or body.innerText.length === 0 observed earlier with `manifest.js` aborted and `entry.js` failed dynamic import).
- **Env**: Windows, Node v24.16.0, pnpm (user-explicit CLI). npm install with --legacy-peer-deps previously worked.
- **Debug Log**: `trae-debug-log-pnpm-dev-not-mounting.ndjson`

---

## 1. Hypotheses (Falsifiable)

H1: **pnpm creates a hoisted `node_modules` layout that breaks a nested package `./lib/tsc` or manifest subpath export used by Nuxt/Vite dev pipeline → dev SSR HTML shell renders but manifest module is ERR_ABORTED (seen earlier) and Vue entry cannot hydrate.**

H2: **`pnpm-lock.yaml` does not exist OR is stale compared to `package.json` installed by npm → pnpm sees no shrinkwrap and either re-resolves breaking peer deps (e.g., typescript 5.7+) OR runs install on first `pnpm dev` auto-hoist producing incompatible module graphs.**

H3: **Path alias `~/` / auto-imports of components break under pnpm's isolated module resolution because a dependency was installed via npm and `node_modules/.pnpm` hasn't been materialized, leading to runtime 404s for `@fs/C:/project/wedding-yeng/app/components/sections/*.vue` that prevent mount.**

H4: **`colorMode`/`@nuxt/ui` module initialization requires a specific package structure; under pnpm strict isolation, a nested `@nuxt/ui-pro` optional dep or `@iconify/vue` peer dep is missing, causing a plugin error that aborts the app bootstrap in the browser SSR/hydration phase.**

H5: **`node_modules/.cache/vite` (previously warmed by npm dev) has stale `manifest.js`/`entry.js` transform caches keyed to npm's real paths; when pnpm re-runs, dev server serves the cached broken chunks until cache is cleared.**

---

## 2. Steps to Reproduce (Command Sequence)
Will be run in Step 3 after instrumentation.
1. Clean stale: `node_modules`, `.output`, `.nuxt`, `node_modules/.cache/vite`, `pnpm-lock.yaml` (optional control)
2. `pnpm install --shamefully-hoist` or `pnpm install`
3. `pnpm dev`
4. Open http://localhost:3000
5. Observe browser console (manifest.js ERR_ABORTED?), terminal output (nuxt/vite errors, 404s?), SSR hydration

---

## 3. Pre-instrumentation Snapshot
| Metric / Command | Expected | Actual T0 | Actual T1 (after fix) |
|---|---|---|---|
| `pnpm --version` prints a version number | not empty | | |
| `pnpm install` exit code | 0 | | |
| node_modules/@nuxt/ui exists after install | YES | | |
| `pnpm dev` startup logs: “Nuxt 4.5.2 ready” | YES | | |
| Browser body.innerText.length | > 2000 | | |
| Console: manifest.js ERR_ABORTED | NO | | |
| `nuxt prepare` generates types | exit 0 | | |

---

## 4. Instrumentation Points (added in §Step 4)
None yet. Will use:
- DEBUG=nuxt:* pnpm dev
- vite logLevel: 'info' via NUXT_VITE_LOG_LEVEL
- browser: list of all loaded script URLs + statuses via network requests
- browser: first Vue unhandled error stack

---

## 5. Findings per Hypothesis (H1–H5)
- H1: (CONFIRMED / REJECTED) — evidence:
- H2: (CONFIRMED / REJECTED) — evidence:
- H3: (CONFIRMED / REJECTED) — evidence:
- H4: (CONFIRMED / REJECTED) — evidence:
- H5: (CONFIRMED / REJECTED) — evidence:

Root cause:
Minimal fix patch:

---

## 6. Pre-Fix vs Post-Fix Evidence

| Signal | Pre | Post |
|---|---|---|
| ... | ... | ... |

---

## 7. Verification Commands (for user)
```
A. cd c:\project\wedding-yeng
B. pnpm install --shamefully-hoist   [or plain pnpm i]
C. pnpm dev                          [open http://localhost:3000]
```
D. Confirm status: A=Fixed, B=Still broken, C=Changed symptom, D=Abort
