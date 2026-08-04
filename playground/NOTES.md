# Playground: Accessibility & Radix/shadcn Component Audit

## Hand-built Components Overview
The components in `/app/playground/page.tsx` were built strictly against W3C ARIA Authoring Practices Guide (APG) standards without external UI dependencies.

1. **Modal Dialog:** Utilizes `role="dialog"`, `aria-modal="true"`, focus trap cycling via keyboard `Tab` / `Shift+Tab`, `Escape` listener, and focus restoration to trigger button via `useRef`.
2. **Tabs:** Uses `role="tablist"`, `role="tab"`, and `role="tabpanel"` with ARIA roving `tabIndex` (active tab `0`, inactive `-1`) and Left/Right keyboard arrow navigation.
3. **Disclosure:** Simple collapsible control implementing `aria-expanded` and clean keyboard toggling via standard `<button>`.

---

## Concrete Gaps: Hand-built vs. shadcn (Radix Primitives)

When comparing custom components against `shadcn/ui` (built on top of Radix UI primitives), several crucial gaps and edge cases emerge:

### Gap 1: Body Scroll Lock & Portal Rendering
* **Our Implementation:** Renders the modal inline inside the current DOM hierarchy. Background scrolling on the main page is still possible while the modal is open.
* **shadcn/Radix Solution:** Radix uses `@radix-ui/react-portal` to render dialog overlays directly at the body root (`document.body`). Furthermore, it automatically appends `pointer-events: none` and disables document scrolling (`overflow: hidden`) on the underlying body to prevent accidental background scrolling and touch interactions.

### Gap 2: Dynamic Focus Restoration & Outside Click Detection
* **Our Implementation:** Simple focus restoration saves `document.activeElement` on open. However, if DOM nodes unmount or change dynamically, hardcoded focus references break.
* **shadcn/Radix Solution:** Radix provides sophisticated focus traps that handle dynamic elements, scroll-locking, and explicit outside-click/escape listeners (`DismissableLayer`). It properly handles focus trapping even if inside nesting or complex shadow DOM setups.

### Gap 3: Screen Reader Announcement & Portal Focus
* **Our Implementation:** Uses standard `aria-labelledby` but lacks dynamic `aria-describedby` handling and screen-reader polite status announcements when tab panels swap dynamically.
* **shadcn/Radix Solution:** Automatically generates unique IDs for `DialogTitle` and `DialogDescription`, binding them via `aria-describedby` seamlessly so screen readers immediately read dialog intent upon opening.