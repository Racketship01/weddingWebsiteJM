# Julius & Mariel Wedding Website - Product Requirements Document

## Overview
- **Summary**: A single-page, polished, responsive wedding invitation website for the wedding of Julius and Mariel on November 27, 2026, in Manila, Philippines. The site features a romantic editorial aesthetic inspired by a powder blue and champagne color palette with elegant serif and script typography.
- **Purpose**: Provide wedding guests with all necessary event information (details, schedule, entourage, venue, RSVP, dress code, gifts) in a beautiful, mobile-first, production-ready web experience.
- **Target Users**: Family and friends of Julius and Mariel who have been invited to the wedding.

## Goals
- Deliver a visually stunning, emotionally resonant wedding invitation that matches the provided design reference aesthetic
- Ensure all 15 sections are implemented with accurate wedding information, proper typography hierarchy, and responsive layout
- Provide a smooth, accessible user experience across all device sizes with proper animations and interactivity
- Use Nuxt 3, Nuxt UI Pro, Tailwind CSS, and TypeScript according to best practices

## Non-Goals
- Server-side RSVP submission or data storage (demo only with client-side validation and preview toast)
- Backend integration, authentication, or database
- Printable invitation generation
- Multi-language support
- E-commerce or payment processing (gift QR is a static placeholder only)

## Background & Context
- Fresh Nuxt 4 project (v4.5.2) with Vue 3.5.43 and Vue Router 5.3.1 at `c:\project\wedding-yeng`
- Current `app.vue` contains only default welcome component
- No existing component structure, Tailwind config, or Nuxt UI setup
- Color palette: powder blue family (`#AFC8DC`, `#BFD6E5`, `#91B5CF`, `#D7E5EE`), champagne/gold (`#D8C09A`, `#C9A46A`), neutrals (`#FBF8F1`, `#FFFDFC`, `#E8DDCC`, `#4A4A4A`)
- Design reference image uses a burgundy theme; this spec adapts to powder blue + champagne while preserving editorial structure and feeling
- No actual wedding photo assets provided; will use the Trae text-to-image API with appropriate wedding prompts

## Functional Requirements

### FR-1: Hero Section
- Full-screen hero with couple photo background + darker powder blue overlay for readability
- Label: "TOGETHER WITH THEIR FAMILIES" (small uppercase, letter-spaced sans)
- Title: "Julius & Mariel" (large elegant serif)
- Supporting line, event date, hashtag `#JCfoundhisforeverMAR`
- CTA button "BEGIN THE CELEBRATION" with smooth scroll to Details
- Circular date badge (NOVEMBER / 27 / 2026)
- Floral decorations top-left and bottom-right corners
- Scroll-down indicator

### FR-2: Sticky Navigation
- Sticky navbar with cream background and burgundy text
- Links: Details, Schedule, Entourage, Gallery, Venue, RSVP
- Smooth-scroll to sections with scroll-spy active link highlighting
- Mobile hamburger/collapse menu on small screens
- Compact, elegant styling

### FR-3: Wedding Details Section
- Soft ivory background, two-column layout
- Left: portrait couple photo with thin cream border, handwritten caption "Our favorite chapter begins"
- Right: script label "The celebration", heading "Wedding Details", invitation paragraph
- Event info list: Date, Arrival 2:30 PM, Ceremony 3:00 PM (Iglesia Ni Cristo, Lokal ng Paco), Reception 5:00 PM (Manila Events Place), Address
- Buttons: "ADD TO CALENDAR", "VIEW DIRECTIONS"

### FR-4: Countdown Section
- Full-width image with powder blue overlay
- Label "COUNTING DOWN TO FOREVER", heading "Until We Say 'I Do'"
- 4 circular countdown items: Days, Hours, Minutes, Seconds
- Real reactive countdown to `2026-09-27 15:00:00 Asia/Manila` (updates every second)
- When countdown reaches zero: display "Today is the day!"

### FR-5: Invitation Message Section
- Cream background, split layout
- Left: bordered white card with oversized decorative quotation marks
  - Script label "With joy", heading "We Would Be Honored by Your Presence"
  - Message paragraph, signature "Julius & Mariel"
- Right: vertical couple photo with bottom-corner floral decoration

### FR-6: Quote Banner
- Full-width photo section with dark translucent overlay
- Centered script text: "A love chosen every day, celebrated for a lifetime."
- Responsive sizing

### FR-7: Wedding Schedule Timeline
- Cream section: script label "Our wedding day", heading "A Beautiful Day Awaits", supporting text
- 3-event timeline: Guest Arrival (2:30 PM), Wedding Ceremony (3:00 PM, venue), Wedding Reception (5:00 PM, venue)
- Horizontal timeline on desktop, vertical on mobile
- Numbered circles connected by thin lines

### FR-8: Wedding Entourage
- Darker powder blue section with subtle texture/blurred floral background
- Label "SURROUNDED BY LOVE", heading "Our Wedding Entourage", supporting text
- Groups: Parents of Bride/Groom, Maid of Honor, Best Man, Bridesmaids (6), Groomsmen (6)
- Principal Sponsors: 7 Ninongs, 7 Ninangs
- Other roles: Ring Bearer, Flower Girl
- Responsive grid of bordered cards; collapsible panels on mobile for readability

### FR-9: Gallery Section
- Soft section with script label "Soft moments in bloom" or similar
- Responsive grid/masonry of wedding photos with hover effects
- Lazy-loaded images

### FR-10: Venue Section
- Dark photographic background with centered darker powder blue content panel
- Script label "Where to find us", heading "The Wedding Venues", address text
- 2 venue cards: Ceremony (Iglesia Ni Cristo, 3:00 PM, photo, map placeholder, OPEN CEREMONY MAP button) and Reception (Manila Events Place, 5:00 PM, photo, map placeholder, OPEN RECEPTION ROUTE button)
- External Google Maps links (no API key needed)

### FR-11: Dress Code Section
- Light section, heading "Dress Code"
- Responsive bordered card containing an attire-guide image
- Note: "Please celebrate with us in semi-formal or smart casual attire."
- Image opens in a modal dialog when clicked

### FR-12: Gifts Section
- Darker powder blue background with bordered inner panel
- Script label "With gratitude", heading "Your Presence Is Our Greatest Gift", message paragraph
- InstaPay QR code placeholder image, caption "MONETARY GIFTS"

### FR-13: Guest Reminders
- Cream section: script label "A few gentle reminders", heading "For Our Intimate Celebration"
- 3 cards: Strictly RSVP Only, No Unlisted Plus Ones, Adults-Only Celebration (with provided descriptions)

### FR-14: RSVP Section
- Darker powder blue background with floral decorations, two-column layout
- Left: script label "Kindly reply", heading "RSVP", note "Please respond as early as possible."
- Right: Nuxt UI Pro form with:
  - Name input (required)
  - Attendance radio: Joyfully accepts / Regretfully declines (required)
  - Optional short message textarea
  - Submit button: "PREVIEW RSVP – SAMPLE ONLY"
- Client-side validation with accessible error messages
- On submit: show success toast/modal explaining preview-only (no data sent)

### FR-15: Site Footer
- Full-width photo background with dark overlay
- Centered: script "Julius & Mariel", supporting text, event label "NOVEMBER 27, 2026 · MANILA CITY"
- Footer bar: Facebook, Email, Website links
- Floating back-to-top button

## Non-Functional Requirements

### NFR-1: Technology Stack
- Nuxt 3/4 with TypeScript strict typing
- Nuxt UI Pro components and composables (UButton, UCard, USeparator, UModal, UForm, UInput, URadioGroup, UTextarea, etc.)
- Tailwind CSS for layout and responsive utilities
- Organized components directory structure

### NFR-2: Typography
- Elegant serif (e.g., Playfair Display / Cormorant Garamond) for major headings
- Handwritten script (e.g., Great Vibes / Dancing Script) for short accent labels
- Small uppercase sans-serif (Inter / system sans) with letter-spacing for metadata

### NFR-3: Responsiveness
- Mobile-first design
- Breakpoints: sm (<640), md (<768), lg (<1024), xl (<1280)
- No horizontal overflow on any viewport
- Timeline collapses to vertical on mobile, entourage uses collapsible groups, nav collapses to hamburger

### NFR-4: Accessibility
- Semantic HTML landmarks: header, nav, main, section, footer
- All images have descriptive alt text
- Buttons/links have visible hover and focus states (ring + color shift)
- Form fields have associated `<label>` and aria attributes
- Contrast ratio >= 4.5:1 for body text, >= 3:1 for large text
- All interactive elements keyboard-navigable

### NFR-5: Performance
- Below-the-fold images lazy-loaded
- Smooth CSS transitions with `prefers-reduced-motion` respect
- No layout shift from images

### NFR-6: SEO & Metadata
- Page title: "Julius & Mariel · November 27, 2026"
- Meta description with couple name, date, location
- Open Graph: og:title, og:description, og:image (placeholder), og:type=website

### NFR-7: Animations
- Tasteful fade-in on scroll using IntersectionObserver or CSS scroll-trigger
- Smooth scrolling behavior
- `transition` / `opacity` only for reduced-motion-safe animations

### NFR-8: Code Quality
- All event data centralized in `app/data/wedding.ts` TypeScript file with proper interfaces
- Components under `app/components/sections/` named as provided
- Clean, maintainable code with no lorem ipsum, no unused imports, no TODOs

## Constraints
- **Technical**: No actual wedding photo assets; generate via Trae text-to-image endpoint. No map API key; use placeholder images + external Google Maps links. No QR image provided; use placeholder graphic.
- **Business**: No real RSVP backend; demo-only preview. No real payment data in gifts section.
- **Dependencies**: Must install `@nuxt/ui` (Nuxt UI Pro) and `@nuxt/image` if available, Tailwind, Google Fonts.

## Assumptions
- Nuxt UI Pro is available via standard package manager (fallback to `@nuxt/ui` community version if Pro cannot be installed)
- The count-down target date given in the spec (`2026-09-27 15:00:00 Asia/Manila`) is used as-is even though it precedes the stated wedding date Nov 27; the spec text takes precedence
- Trae text-to-image service will provide reasonable wedding photos for the given prompts
- Browser Google Fonts loading is acceptable (no self-hosted fonts required)

## Open Questions
- None. All content and design requirements are fully specified by the user.

## Acceptance Criteria

### AC-1: All 15 Sections Rendered
- **Type**: `rule`
- **Given**: The site is loaded in a browser at 1024px width
- **When**: The user scrolls from top to bottom
- **Then**: All sections (Hero, Nav, Details, Countdown, Invitation, Quote Banner, Schedule, Entourage, Gallery, Venue, Dress Code, Gifts, Reminders, RSVP, Footer) appear in order with correct headings and the couple/event data matching the spec exactly
- **Pass Condition**: Visual inspection of rendered page confirms each section's presence and textual accuracy
- **Evidence**: Screenshot or DOM snapshot of each section heading and content

### AC-2: Countdown Timer Functional
- **Type**: `rule`
- **Given**: The site is open and current time is before 2026-09-27 15:00:00 PHT
- **When**: The page is visible for 5 seconds
- **Then**: The seconds value decreases by ~5 (live-updating reactive timer), D/H/M/S labels visible
- **Pass Condition**: A 5-second observation shows countdown advancing; Vue devtools confirm reactive ref updates
- **Evidence**: Video clip or console timestamp diff showing seconds decreasing

### AC-3: Navigation Smooth Scroll & Active State
- **Type**: `rule`
- **Given**: The page is loaded
- **When**: Each nav link (Details, Schedule, Entourage, Gallery, Venue, RSVP) is clicked
- **Then**: Page smoothly scrolls to the corresponding section; nav item gains active highlight class; on mobile the menu collapses after selection
- **Pass Condition**: Each click scrolls to section within 500ms; active class present on clicked item
- **Evidence**: DOM class list inspection + scroll position log

### AC-4: RSVP Form Validation
- **Type**: `rule`
- **Given**: RSVP section rendered
- **When**: User clicks submit with empty name / no radio selection
- **Then**: Accessible error messages appear under each invalid field and form does not submit
- **When**: User fills required fields then submits
- **Then**: Success toast/modal appears stating "This is a preview only — no data was sent"
- **Pass Condition**: Required-field errors show before submit; success feedback shown after valid submit
- **Evidence**: Screenshots of error state and success state

### AC-5: Mobile Responsiveness
- **Type**: `rule`
- **Given**: Browser viewport set to 375x812 (iPhone)
- **When**: Each section is scrolled into view
- **Then**: No horizontal scrollbar; all text visible and readable; nav collapses to mobile menu; timeline vertical; entourage cards stack
- **Pass Condition**: window.innerWidth 375 shows no horizontal overflow (document.documentElement.scrollWidth === 375)
- **Evidence**: DevTools responsive-mode screenshots

### AC-6: Accessibility Minimums
- **Type**: `rule`
- **Given**: The rendered page
- **When**: Axe or Lighthouse accessibility audit runs
- **Then**: No critical or serious violations; all images have non-empty alt; all form inputs have associated labels; keyboard focus visible on all interactive elements
- **Pass Condition**: Lighthouse a11y score >= 90; manual tab-through reaches all buttons/inputs in order
- **Evidence**: Lighthouse report + keyboard tab sequence recording

### AC-7: Data Centralization
- **Type**: `rule`
- **Given**: The source tree
- **When**: All sections are reviewed for where they source textual content
- **Then**: All couple names, dates, times, addresses, entourage names, reminder text, RSVP copy, gift message originate from a single `app/data/wedding.ts` file with typed interfaces; no hardcoded duplicates across components
- **Pass Condition**: Grep for hardcoded couple/event strings shows they only exist in wedding.ts (except image alt and aria labels)
- **Evidence**: Grep output + file listing

### AC-8: TypeScript Strict Compilation
- **Type**: `rule`
- **Given**: Project with TypeScript strict mode
- **When**: `nuxt typecheck` or `vue-tsc --noEmit` runs
- **Then**: Zero type errors
- **Pass Condition**: Exit code 0
- **Evidence**: Command output

### AC-9: Build Success
- **Type**: `rule`
- **Given**: Dependencies installed
- **When**: `nuxt build` runs
- **Then**: Build completes with exit code 0 and no warnings related to missing dependencies or unresolvable imports
- **Pass Condition**: Exit code 0
- **Evidence**: Build command output

### AC-10: Visual Aesthetic — Color Palette & Typography
- **Type**: `rubric`
- **Dimension**: Faithfulness of visual aesthetic to specified powder blue + champagne palette and serif/script/sans typography hierarchy
- **Scale**: 1-5
- **Anchors**:
  1 = Wrong colors, single font throughout, looks nothing like a wedding invitation
  3 = Colors present but not consistently applied; some heading hierarchy but fonts mixed
  5 = Palette applied uniformly across all sections (hero overlay, cards, buttons, section backgrounds); serif headings, script accent labels, sans metadata all used correctly and consistently as specified
- **Pass Threshold**: >= 4
- **Evidence**: Visual screenshot review against reference direction

### AC-11: Visual Aesthetic — Spacing & Editorial Feel
- **Type**: `rubric`
- **Dimension**: Generous whitespace, thin borders, subtle shadows, rounded buttons, floral corner decorations, photo treatment — editorial romantic wedding feel without clutter
- **Scale**: 1-5
- **Anchors**:
  1 = Cramped, no whitespace, no decorations, flat
  3 = Some spacing present, basic borders, but inconsistent and lacks the refined editorial quality
  5 = Every section has balanced breathing room; thin elegant borders/shadows on cards; floral decorations placed at corners; full-width photos have soft overlays; rounded CTAs; no section feels cluttered
- **Pass Threshold**: >= 4
- **Evidence**: Full-page screenshot

### AC-12: Section Layout Completeness
- **Type**: `rubric`
- **Dimension**: Adherence to all structural details specified per section (photo positions, two-column vs split layouts, badge, timeline connections, entourage groups, venue cards, gift QR, 3 reminder cards, footer links, back-to-top)
- **Scale**: 1-5
- **Anchors**:
  1 = Multiple sections missing key structural elements (e.g., no countdown circles, no timeline numbers, missing entourage groups)
  3 = Most elements present, but several sections simplified or with missing sub-components
  5 = Every structural element from FR-1 through FR-15 is present: date badge, floral corners, 4 countdown circles, 3-item timeline, all entourage groups incl. 7+7 sponsors, gallery grid, 2 venue cards with map buttons, dress code modal, 3 reminders, RSVP fields, back-to-top button
- **Pass Threshold**: >= 4
- **Evidence**: Section-by-section DOM and visual inspection

### AC-13: Code Maintainability & Component Organization
- **Type**: `rubric`
- **Dimension**: Component separation, data files, reusability, naming, absence of dead code
- **Scale**: 1-5
- **Anchors**:
  1 = Everything in app.vue, no data file, duplicate code
  3 = Components split but some too large; some hardcoded strings; minor duplication
  5 = Each section as its own SFC under `app/components/sections/`; shared UI helpers extracted if needed; `app/data/wedding.ts` with all content and interfaces; clean `<script setup lang="ts">`; no unused code; no // TODO or console.log
- **Pass Threshold**: >= 4
- **Evidence**: Code inspection of component directory, data file, and app.vue
