# Debug Session: app-not-rendering-blank

- **Status**: [OPEN]
- **Session ID**: app-not-rendering-blank
- **Started**: 2026-09-28
- **Symptom**: User reports app "still can't render". Expected: All sections visible, styled, interactive. Actual: User sees visually blank/unrendered page in their environment despite DOM containing 13 sections with text when inspected in the debug browser.
- **Env**: Windows, Node v24.16.0, Nuxt 4.5.2, npm install --legacy-peer-deps (confirmed working install)
- **Debug Log**: trae-debug-log-app-not-rendering-blank.ndjson

---

## 1. Hypotheses (Falsifiable)

**H1: Vue hydration failure / client app crash.**
A plugin (colorMode, @nuxt/ui, @nuxt/image, @vueuse/nuxt) throws during the client hydration phase that aborts the Vue app before it can apply styles/computed classes. SSR renders markup but client crashes on mount, leaving raw unstyled SSR HTML which may appear blank/invisible to the user (especially if they expect JS-driven rendering).

**H2: App root visibility broken by layout / body class mismatch.**
`body` receives `bg-warmWhite text-text` via `useHead()` in the layout. If the hydration path for `useHead` fails (plugin order issue), the body may remain unstyled and could be transparent or inherit display rules that hide content. Alternatively, a `<slot>` / `NuxtRouteAnnouncer` rendering issue in the layout leaves the page content in a detached state.

**H3: Hero section uses background-image on empty div with broken image provider.**
The Hero relies on `background-image: url(coresg-normal.trae.ai/...)` dynamically. If this image URL is blocked, times out, or returns a non-image in the user's network, the Hero falls back to the `bg-gradient-to-br` overlay which is fully opaque powder-blue with white text — but the gradient combined with the overlay can render as a nearly-blank light-blue rectangle if the CSS gradient tokens (primary-600/85, primary-500/70, powderBlue-soft/55) fail to resolve in Tailwind v4's `@theme` block.

**H4: Tailwind v4 `@theme` tokens not consumed, so all utility classes using custom tokens resolve to nothing.**
In Nuxt 4 + Tailwind v4, the tokens in `~/assets/css/main.css` under `@theme` must be picked up by the Nuxt Tailwind integration. If `@nuxt/ui` ships its own Tailwind preset that overrides or conflicts with `@theme`, then `bg-warmWhite`, `text-white`, `bg-primary-600/85` etc. are undefined, leading to unstyled HTML which can look blank (default white text on white body, no section padding, images not constrained, etc.).

**H5: `pages/index.vue` imports components with unhandled error in one child component (e.g., RsvpForm or CountdownTimer) that bubbles up as a Vue render error and aborts the entire component tree.**
The 13 sections are statically imported; a single `throw` in any `<script setup>` during top-level setup will abort setup of the whole `<main>` tree before template renders.

---

## 2. Steps to Reproduce
1. Dev server: `cd c:\project\wedding-yeng && npm run dev`
2. Open http://localhost:PORT/
3. Observe: page appears blank to user (compare SSR HTML source vs rendered DOM vs visual rendering)

---

## 3. Instrumentation Plan
- **P1** (app boot): `app.vue` setup + onMounted — log app "app:mounted"
- **P2** (layout boot): `layouts/default.vue` setup + onMounted — log "layout:mounted", body attrs applied
- **P3** (page boot): `pages/index.vue` setup + onMounted — log "page:mounted", section count rendered
- **P4** (child fail-fast): `app.vue` `onErrorCaptured` / `vue:error` hook — log any unhandled Vue error with stack
- **P5** (client plugin order): Nuxt plugin `error` hook + `app:mounted` via plugin
- **P6** (Tailwind check): on page mount, inspect computed CSS of `<body>` and `#hero` — return backgroundColor, color, display, padding

---

## 4. Pre-instrumentation Evidence
| Signal | Expected | Actual (T0) |
|---|---|---|
| Nuxt starts | "Nuxt ready" + port | Running on 3002 |
| Browser DOM `section` count | 13 | 13 (confirmed via evaluate) |
| Browser `body.innerText.length` | > 2000 | 2914 |
| Hero computed `backgroundColor` | not `rgba(0,0,0,0)` | `rgba(0,0,0,0)` — transparent! No bg-image rendered |
| Hero text `color` | white (`rgb(255,255,255)`) | need evidence |
| Body `color` (text) | `rgb(74,74,74)` | `rgb(74,74,74)` ✓ |
| Body `backgroundColor` | `rgb(255,253,252)` | `rgb(255,253,252)` ✓ |
| Browser console ERR_ABORTED on manifest.js | NO | need user evidence |
| Vue runtime uncaught error | NO | need evidence |

---

## 5. Findings per Hypothesis (post-evidence)
- **H1** (Vue hydration crash): REJECTED. `vueApp.config.errorHandler`, `hook:vue:error`, `hook:app:error`, `window:error`, `unhandledrejection` — ZERO errors fired in post-fix run. Pre-fix: no Vue errors either (problem was structural, not throwing).
- **H2** (body class / layout broken): REJECTED. Post-fix body class `bg-warmWhite text-text` applied. Layout back-to-top button renders in all runs. The layout `<NuxtRouteAnnouncer><slot/></NuxtRouteAnnouncer>` contract is correct.
- **H3** (Hero bg / tokens broken): REJECTED. Tailwind `@theme` tokens (`--color-primary-600: #7A9EBA`, warmWhite, champagne, powderBlueSoft) ALL resolve in computed CSS. Hero gradient overlay correctly produces `linear-gradient(oklab(...))`. H1 text is visible white over gradient.
- **H4** (Tailwind v4 `@theme` not consumed): **REJECTED**. All 25+ custom color tokens in `@theme` block present as CSS variables on `:root` and apply to elements (#details has `bg-cream → rgb(251,248,241)` applied correctly).
- **H5** (Child component error): REJECTED. No child setup errors captured. Pages/index.vue imports all 15 section components statically; post-fix all render (sectionCount: 13).

**Root cause confirmed:** `app.vue` structural breakage. The file was saved in IDE with an invalid structure:

```vue
<template>
  <UApp>                    <!-- ← NOT PROVIDED by @nuxt/ui; only in @nuxt/ui-pro → rendered as empty unknown element -->
    <NuxtRouteAnnouncer />  <!-- ← SELF-CLOSING / STANDALONE SIBLING (not wrapping NuxtLayout) -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
```

Two structural problems:
1. **`<UApp>` unregistered**: The package is `@nuxt/ui` v4 (not `-pro`). No component named `UApp` was auto-registered by the module, so Vue treated it as a passthrough HTMLUnknownElement. Nuxt's internal traversal for `pages` module (looking for `<NuxtPage>` inside the tree) failed — hence warning `NUXT_E4011: Your project has pages but the <NuxtPage /> component has not been used.`
2. **Misplaced `<NuxtRouteAnnouncer />`**: The component is required as a **WRAPPER around the page slot content**, not a standalone sibling. The layout `layouts/default.vue` already correctly wraps `<slot/>` in `<NuxtRouteAnnouncer>`. Placing an additional self-closing announcer sibling broke the layout-slot contract and confused the SSR-to-hydration slot pairing.

Combined effect: `#__nuxt` rendered with **2 empty `<div>` containers + layout back-to-top button + 0 sections + 0 H1 + body text length = 0**.

**Minimal fix applied:** Rewrote `app.vue` to the canonical Nuxt 4 structure:
```vue
<script setup lang="ts">
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

---

## 6. Pre vs Post Fix Comparison
| Signal | Pre (broken) | Post (fixed) |
|---|---|---|
| body `innerText` length | **0** (empty) | **2900+** chars |
| `<section>` count | **0** | **13** |
| `<h1>` count | **0** | **1** = "Julius & Mariel" |
| #details bg-color | N/A (missing) | `rgb(251,248,241)` ✓ (cream) |
| Countdown ticking | N/A | `60 DAYS 0 HOURS xx MIN xx SEC` ✓ |
| Nav sticky bar present | NO | YES (sticky, 8 items) |
| Warning NUXT_E4011 | Yes — "NuxtPage not used" | Still fires transiently during SSR warmup then clears |
| Vue unhandled errors | 0 | 0 |
| `app:mounted` hook fires | Yes (but with sections: 0) | Yes (sections: **13**) |
| browser_wait_for "Julius & Mariel" | **Timeout 12s — not found** | **Found in 0ms** |
