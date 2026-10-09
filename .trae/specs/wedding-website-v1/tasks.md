# Julius & Mariel Wedding Website - Implementation Plan

## Task 1: Project Setup — Dependencies, Nuxt Config, Tailwind, Fonts
- **Status**: `pending`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - Install `@nuxt/ui`, `@nuxt/image`, `@vueuse/core`, and `@vueuse/nuxt` (for scroll-spy, intersection observer, countdown utils)
  - Configure `nuxt.config.ts`: enable Nuxt UI, Nuxt Image, VueUse, add Google Fonts (Playfair Display or Cormorant Garamond, Great Vibes or Dancing Script, Inter)
  - Create `app/assets/css/main.css` with Tailwind directives, custom color tokens (powder blue, champagne, cream, etc.) mapped via `theme.extend.colors`, custom serif/script/sans font families
  - Update `app.vue` to mount `<NuxtLayout>` and include global styles
  - Add custom color palette CSS variables for the wedding theme
- **Acceptance Criteria Addressed**: AC-8, AC-9, AC-10, NFR-1, NFR-2
- **Test Requirements**:
  - `rule` TR-1.1: `pnpm install` succeeds without errors; all listed packages appear in node_modules; `nuxt.config.ts` has correct module entries
  - `rule` TR-1.2: Dev server starts (`pnpm dev` returns listening message) with no console errors for missing modules or fonts
  - `rubric` TR-1.3: Tailwind config completeness; scale 1-5; 1=barely configured; 3=colors+fonts present; 5=all palette tokens mapped + custom utilities (e.g., `.text-serif`, `.text-script`, `.text-sans-small-caps`); evidence: `app.css` and `nuxt.config.ts` content
- **Notes**: Use `@nuxt/ui` (open-source). If Pro-specific components are used we fall back to their open equivalents.

## Task 2: Central Wedding Data File (wedding.ts)
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1
- **Description**:
  - Create `app/data/wedding.ts` with TypeScript interfaces: `WeddingInfo`, `TimelineEvent`, `EntourageGroup`, `VenueInfo`, `ReminderCard`, `CountdownConfig`
  - Populate with ALL textual content: couple names, dates/times, addresses, full entourage list (parents, MoH, BM, 6 bridesmaids, 6 groomsmen, 7 ninongs, 7 ninangs, ring bearer, flower girl), invitation messages, reminders text, RSVP copy, gift message, dress code note
  - Export typed constants: `weddingInfo`, `timelineEvents`, `entourageGroups`, `venues`, `reminders`, `countdownTarget` (as Date with Asia/Manila handling via TZ string parse)
  - No lorem ipsum; all copy exact from user spec
- **Acceptance Criteria Addressed**: AC-1, AC-7, AC-8
- **Test Requirements**:
  - `rule` TR-2.1: Grep for each name (e.g., "Chery Mar M. Seña", "Mr. Angelito K. Cruz Jr.", "Czean Rhain L. Ladera") returns exactly the wedding.ts file (except alt text in templates)
  - `rule` TR-2.2: File compiles with TypeScript strict; `vue-tsc --noEmit` reports zero errors for the file
  - `rubric` TR-2.3: Interface completeness; scale 1-5; 1=single untyped object; 3=some interfaces; 5=all content organized into 6+ typed interfaces with readonly arrays; evidence: file structure

## Task 3: App Shell — Layout, SEO, Smooth Scroll, Scroll-Spy Composable
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1, Task 2
- **Description**:
  - Create `app/layouts/default.vue` with a main layout
  - Add SEO metadata via `useSeoMeta` in layout or app root: title, meta description, Open Graph tags (og:title, og:description, og:image placeholder, og:type)
  - Implement scroll-spy composable `useScrollSpy.ts` under composables/ using VueUse `useElementVisibility` or IntersectionObserver to detect current section and return active section ID
  - Ensure `scroll-behavior: smooth` globally and respect `prefers-reduced-motion` to disable animations
  - Configure `<body>` with correct default text color `text-[#4A4A4A]` on `bg-warmWhite`
  - Mount sticky nav + all sections inside the layout
- **Acceptance Criteria Addressed**: AC-3, AC-7, NFR-4, NFR-5, NFR-6, NFR-7
- **Test Requirements**:
  - `rule` TR-3.1: `<head>` contains `<title>Julius & Mariel · November 27, 2026</title>`, meta description, and at least 4 `og:` meta tags
  - `rule` TR-3.2: Scrolling with mouse makes active section id change in scroll-spy observable within 200ms of section crossing 50% of viewport
  - `rule` TR-3.3: Reduced-motion media query respected — if enabled, transition/opacity animations disabled; evidence: CSS rule present

## Task 4: HeroSection.vue
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 3
- **Description**:
  - Full-screen section with generated couple photo background (Trae text-to-image prompt: "romantic wedding couple portrait, bride and groom embracing outdoors, soft golden hour lighting, editorial wedding photography")
  - Overlay: darker powder blue (`bg-blue/70` or gradient from `rgba(145,181,207,0.85)` to `rgba(191,214,229,0.55)`)
  - Top label "TOGETHER WITH THEIR FAMILIES" — `.text-sans-small-caps`
  - Title "Julius & Mariel" — serif 5xl md:7xl text-white tracking-tight
  - Supporting line, event date "FRIDAY · NOVEMBER 27, 2026 · 3:00 PM" — small caps
  - Hashtag `#JCfoundhisforeverMAR` — script text
  - CTA UButton "BEGIN THE CELEBRATION" rounded, champagne/gold bg, powder blue text, smooth scroll to `#details`
  - Circular date badge with NOVEMBER / 27 / 2026 — fixed or absolute position
  - SVG floral decorations in top-left and bottom-right (simple pastel flower SVG inline)
  - Scroll-down chevron indicator at bottom with gentle bounce animation
  - Fade-in on mount
- **Acceptance Criteria Addressed**: AC-1, AC-10, AC-11, AC-12
- **Test Requirements**:
  - `rule` TR-4.1: Section has `id="hero"`; clicking "BEGIN THE CELEBRATION" scrolls to element with `id="details"`
  - `rule` TR-4.2: Date badge visible with text "NOVEMBER", "27", "2026"
  - `rubric` TR-4.3: Visual quality — overlay readability, typography hierarchy, decorations; scale 1-5; threshold >=4

## Task 5: StickyNavigation.vue + Mobile Menu
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 3, Task 4
- **Description**:
  - Sticky top navbar with cream `bg-cream` and burgundy/deep text `#722F37` accent
  - Desktop: inline links to `#details`, `#schedule`, `#entourage`, `#gallery`, `#venue`, `#rsvp` with smooth scroll
  - Active link highlighting: underline or color change via scroll-spy composable from Task 3
  - Mobile (<md): hamburger button opens vertical menu (Nuxt UI drawer/modal or custom slide-down)
  - Compact elegant bar — padding-y 3, thin bottom border
  - Back-to-top floating button at bottom-right of screen (part of nav or separate — implement here)
- **Acceptance Criteria Addressed**: AC-3, AC-5, NFR-4
- **Test Requirements**:
  - `rule` TR-5.1: At 375px, links collapse; hamburger click shows menu; each link in mobile menu closes menu after click
  - `rule` TR-5.2: Scrolling past hero adds sticky behavior; nav is always visible after passing hero
  - `rule` TR-5.3: Back-to-top button scrolls to top smoothly when clicked

## Task 6: WeddingDetails.vue Section
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 3
- **Description**:
  - `id="details"` soft ivory `bg-cream` section, py-20
  - 2-column layout (lg:flex) — left: portrait photo with cream border `border-4 border-warmWhite shadow-lg`, handwritten caption "Our favorite chapter begins" below
  - Right: script label "The celebration", heading "Wedding Details" serif 3xl, invitation paragraph
  - Structured info list: Date, Arrival, Ceremony, Reception, Location each with small-caps label + text
  - USeparator between list items
  - UButtons: "ADD TO CALENDAR" (champagne bg) opens .ics data URL; "VIEW DIRECTIONS" opens Google Maps query URL for address in new tab
- **Acceptance Criteria Addressed**: AC-1, AC-12
- **Test Requirements**:
  - `rule` TR-6.1: All 5 info items present with exact text; "VIEW DIRECTIONS" `target="_blank"` href contains google.com/maps
  - `rule` TR-6.2: Columns stack on mobile (375px single column)
  - `rubric` TR-6.3: Card styling (border/shadow/whitespace); scale 1-5; threshold >=4

## Task 7: CountdownTimer.vue Section
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 2, Task 3
- **Description**:
  - `id="countdown"` full-width photo background (romantic outdoor wedding scenery) with darker powder blue overlay
  - Label "COUNTING DOWN TO FOREVER" small caps white; heading serif "Until We Say 'I Do'" text-white
  - 4 circular countdown items (w-24 h-24 rounded-full bg-white/15 backdrop-blur border border-white/30) displaying Days / Hours / Minutes / Seconds with number + label
  - Reactive countdown composable: target = `2026-09-27T15:00:00+08:00` (Asia/Manila UTC+8); updates every 1s with `setInterval` inside onMounted + cleaned up onUnmounted
  - If remaining <= 0 show message "Today is the day!" instead of circles
  - Accessibility: `aria-live="polite"` region for counter; prefers-reduced-motion respected (no flash)
- **Acceptance Criteria Addressed**: AC-2, AC-1, NFR-4, NFR-5
- **Test Requirements**:
  - `rule` TR-7.1: Composable returns correct D/H/M/S at T-1 day = (1,0,0,0)
  - `rule` TR-7.2: SetInterval triggers; Vue devtools show seconds value decreases by 1 each second for 3 seconds
  - `rule` TR-7.3: When target in past, rendered DOM contains "Today is the day!" (verify by overriding target in test)

## Task 8: InvitationMessage.vue + QuoteBanner.vue
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 3
- **Description**:
  - InvitationMessage (`id="message"`): cream section, split layout (lg)
    - Left: UCard bordered-white, oversized decorative `"` marks (champagne color), script label "With joy", heading "We Would Be Honored by Your Presence", message paragraph, signature "Julius & Mariel" script
    - Right: vertical couple photo `object-cover h-full` rounded shadow; floral SVG decoration at bottom corner
  - QuoteBanner: full-width photo bg with dark overlay `bg-black/50`; centered script text "A love chosen\nevery day,\ncelebrated for a\nlifetime." responsive text-2xl md:text-4xl text-white
- **Acceptance Criteria Addressed**: AC-1, AC-12, AC-10
- **Test Requirements**:
  - `rule` TR-8.1: Invitation message paragraph text matches spec exactly; signature present
  - `rule` TR-8.2: Quote banner text split across lines (br or block elements) matches spec text verbatim

## Task 9: WeddingTimeline.vue
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 2, Task 3
- **Description**:
  - `id="schedule"` cream section; script label "Our wedding day", serif heading "A Beautiful Day Awaits", supporting text
  - Source timeline from `wedding.ts` data
  - 3 events: (1) Guest Arrival 2:30 PM (2) Wedding Ceremony 3:00 PM (3) Wedding Reception 5:00 PM
  - Desktop: horizontal layout — numbered circles connected by thin line between them; each event content under circle
  - Mobile: vertical layout — circles on left; line running vertically down; content to right of each circle
  - Elegant champagne-colored numbered circles (w-12 h-12 rounded-full, border-2, centered number)
- **Acceptance Criteria Addressed**: AC-1, AC-5, AC-12
- **Test Requirements**:
  - `rule` TR-9.1: At >=1024px layout is flex-row (horizontal); at 375px layout is flex-col (vertical)
  - `rule` TR-9.2: All 3 events with exact title/time/description rendered; circles contain 1, 2, 3

## Task 10: EntourageSection.vue — All Groups
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 2, Task 3
- **Description**:
  - `id="entourage"` darker powder blue section (`bg-blue/90` or gradient); subtle texture (add SVG dots pattern as background) or blurred floral bg
  - Label "SURROUNDED BY LOVE" white small caps; heading serif white "Our Wedding Entourage"; supporting paragraph white
  - Source all names from `wedding.ts` `entourageGroups`
  - Responsive card grid (2-col md, 4-col lg) for core group: Parents (2 cards, each with 2 names), MOH + BM (2 cards), Bridesmaids (6 names), Groomsmen (6 names)
  - Principal Sponsors section under: heading "Ninongs & Ninangs" script; 2-column grid: 7 Ninongs / 7 Ninangs with divider
  - Other roles: Ring Bearer, Flower Girl cards
  - Mobile: wrap groups in Nuxt UI collapsible/accordion `UAccordion` items (Parents, Wedding Party, Principal Sponsors, Bearers) so page stays scrollable
- **Acceptance Criteria Addressed**: AC-1, AC-5, AC-7, AC-12
- **Test Requirements**:
  - `rule` TR-10.1: All 4 Parents, MOH, BM, 6 Bridesmaids, 6 Groomsmen, 7 Ninongs, 7 Ninangs, Ring Bearer, Flower Girl names appear exactly as specified in DOM textContent
  - `rule` TR-10.2: At 375px accordion present; groups collapsed/expanded cleanly
  - `rule` TR-10.3: Cards have light border and rounded corners consistent with wedding theme

## Task 11: GallerySection.vue
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 3
- **Description**:
  - `id="gallery"` soft section `bg-warmWhite`
  - Script label "Soft moments in bloom", serif heading, supporting text
  - Asymmetric responsive grid: 1 large image + 4 smaller around it (masonry feel using grid row-/col-span)
  - 5 wedding images generated via Trae text-to-image with different prompts (couple portrait, ceremony setting, rings close-up, bride details, outdoor couple)
  - Images have `loading="lazy"` and rounded corners + soft shadow
  - Hover: subtle scale (1.03) transition — respects reduced-motion
- **Acceptance Criteria Addressed**: AC-1, NFR-5
- **Test Requirements**:
  - `rule` TR-11.1: Section has `id="gallery"` and at least 5 `<img>` elements all with non-empty alt and `loading="lazy"`
  - `rule` TR-11.2: Grid reflows to single column at 375px

## Task 12: VenueSection.vue + Map Placeholders
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 2, Task 3
- **Description**:
  - `id="venue"` dark photographic background + darker powder blue centered panel (max-w-5xl mx-auto, `bg-blue/80` backdrop-blur, bordered, rounded-xl padding)
  - Script label "Where to find us", heading "The Wedding Venues", address text
  - 2 UCards side-by-side: Ceremony and Reception
    - Each card: venue image, name, time (3:00 PM / 5:00 PM), styled map placeholder card (styled div that looks like map: pastel blue with marker pin SVG), UButton opens Google Maps external link:
      - Ceremony: https://www.google.com/maps/search/?api=1&query=Iglesia+Ni+Cristo+Lokal+ng+Paco+Manila
      - Reception: https://www.google.com/maps/search/?api=1&query=Manila+Events+Place+Manila
  - Map placeholder: do NOT use actual map API; use CSS gradient + pin SVG + address line
- **Acceptance Criteria Addressed**: AC-1, AC-12
- **Test Requirements**:
  - `rule` TR-12.1: Ceremony button href contains google.com/maps with Iglesia Ni Cristo query; Reception button contains Manila Events Place query; both `target="_blank"` with `rel="noopener noreferrer"`
  - `rule` TR-12.2: Both venue cards render at >=768px; stack vertically at 375px

## Task 13: DressCodeSection.vue with Modal
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 3
- **Description**:
  - `id="dresscode"` light `bg-warmWhite` section
  - Heading "Dress Code" centered serif
  - Responsive bordered UCard containing: attire-guide image (generate: "wedding attire guide semi-formal smart casual color palette powder blue champagne illustration") with rounded corners
  - Note paragraph below image: "Please celebrate with us in semi-formal or smart casual attire."
  - Clicking the image opens UModal/UDialog with full-size (max 90vw max 90vh) image view; close button + outside-click close
- **Acceptance Criteria Addressed**: AC-1, AC-12
- **Test Requirements**:
  - `rule` TR-13.1: Click on image opens modal; click outside or close button closes it; aria-modal and aria-labelledby present on modal dialog
  - `rule` TR-13.2: Note text exact match to spec

## Task 14: GiftsSection.vue + RemindersSection.vue
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 2, Task 3
- **Description**:
  - Gifts: darker powder blue `bg-blue/90` section
    - Inner bordered panel `border border-champagne/40 bg-cream/5 rounded-2xl p-8 md:p-12`
    - Script label "With gratitude", heading "Your Presence Is Our Greatest Gift", message paragraph
    - Centered QR placeholder image (generate: "minimal InstaPay QR code style placeholder graphic gray simple square") in white card bordered; caption "MONETARY GIFTS" small caps
  - Reminders (`id="reminders"`): cream section
    - Script label "A few gentle reminders", heading "For Our Intimate Celebration"
    - 3 responsive cards (grid 1-col md:3-col) sourced from data file:
      1. Strictly RSVP Only: due to limited venue capacity...
      2. No Unlisted Plus Ones: only invited/confirmed...
      3. Adults-Only Celebration: while we love little ones...
- **Acceptance Criteria Addressed**: AC-1, AC-12
- **Test Requirements**:
  - `rule` TR-14.1: 3 reminder card descriptions match spec exactly
  - `rule` TR-14.2: Gifts section contains image (QR placeholder) + caption "MONETARY GIFTS"
  - `rubric` TR-14.3: Card styling and spacing consistent with rest of site; scale 1-5; threshold >=4

## Task 15: RsvpForm.vue — Validated Form + Preview Toast
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 3
- **Description**:
  - `id="rsvp"` darker powder blue section (`bg-blue/90`) with floral SVG decorations top-left/right
  - Two-column (lg): left text (script "Kindly reply", serif heading "RSVP", note paragraph); right Nuxt UI Pro form
  - Form fields (Nuxt UI UForm with schema or manual v-model + validation):
    1. Name — UInput, `<label>Full Name</label>`, required, minlength 2, error message "Please enter your full name"
    2. Attendance — URadioGroup with 2 options: "Joyfully accepts" and "Regretfully declines", required, error "Please select your attendance"
    3. Message — UTextarea, `<label>Leave a short message (optional)</label>`, max 500 chars
  - Submit UButton "PREVIEW RSVP – SAMPLE ONLY"
  - Client-side validation on submit; prevent default; use Nuxt UI toast `useToast()` on valid submit: title "RSVP Preview", description "Thank you! This is a sample preview only — no data was sent."; also show success state inside form (green check + summary)
  - Accessible: aria-invalid on fields with errors, aria-describedby to error messages
- **Acceptance Criteria Addressed**: AC-4, NFR-4
- **Test Requirements**:
  - `rule` TR-15.1: Empty submit shows 2 error messages (name + attendance); console shows no POST/fetch calls
  - `rule` TR-15.2: Valid submit triggers toast with title containing "Preview" or "Preview"; no network requests made
  - `rule` TR-15.3: All inputs have `<label>` associated via `for`/`id` or nesting; failing fields have `aria-invalid="true"`

## Task 16: SiteFooter.vue — Closing Banner + Footer Bar + Back to Top
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 3, Task 5
- **Description**:
  - Full-width photo background with dark overlay; centered content:
    - Script "Julius & Mariel" (large, white)
    - Supporting text "We cannot wait to celebrate this beautiful beginning with you."
    - Small caps "NOVEMBER 27, 2026 · MANILA CITY"
  - Footer bar below (solid dark powder blue or `bg-[#4A4A4A]` text-white/90):
    - 3 links: Facebook (https://facebook.com), Email (mailto:wedding@example.com), Website (#)
    - Copyright line: "© 2026 Julius & Mariel"
  - Floating back-to-top button (from Task 5) — verify it's visible only when scrolled > 400px
- **Acceptance Criteria Addressed**: AC-1, AC-12
- **Test Requirements**:
  - `rule` TR-16.1: Footer script heading "Julius & Mariel" present; event label present; 3 social/contact links
  - `rule` TR-16.2: At scrollY=0, back-to-top is `hidden` or opacity 0; at scrollY=600 it is visible

## Task 17: Build, Typecheck, Lint — Final Verification
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Tasks 4–16 all completed
- **Description**:
  - Run `pnpm typecheck` (or `npx vue-tsc --noEmit`) — resolve all TS errors
  - Run `pnpm build` — resolve all build warnings/errors
  - Run dev server and manually scroll through all sections on 2 viewports (375, 1024) to verify no overlaps, no horizontal scroll, images load
  - Check all external links (maps, directions, calendar, socials) actually open valid URLs
  - Clean up any TODO comments, console.log statements, unused imports
- **Acceptance Criteria Addressed**: AC-5, AC-8, AC-9, AC-13
- **Test Requirements**:
  - `rule` TR-17.1: `npx vue-tsc --noEmit` exit code 0 with no warnings
  - `rule` TR-17.2: `nuxt build` exit code 0 with no critical warnings
  - `rubric` TR-17.3: Overall site visual polish on 2 viewports; scale 1-5; threshold >=4; evidence: screenshots + no-horizontal-overflow check

## Task 18: Independent Review Coordination
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 17
- **Description**:
  - After all tasks 1-17 completed and evidence recorded, hand off to Review phase: create review.md structure, delegate to independent reviewer subagent
  - Address any actionable findings as remediation Issue tasks and re-verify
- **Acceptance Criteria Addressed**: All AC (comprehensive coverage)
- **Test Requirements**:
  - `rule` TR-18.1: review.md exists with all AC covered as checkpoints (rule or rubric)
  - `rule` TR-18.2: If Review fails, at least 1 remediation Issue exists under tasks.md; if passes, final result `pass` recorded in review history
