## 2025-05-15 - [Board Accessibility Enhancement]
**Learning:** Tic Tac Toe boards implemented with non-interactive elements (like `div` or `section`) are completely inaccessible to keyboard users and screen readers. Using `button` elements provides native focus management and ARIA roles.
**Action:** Always use semantic `<button>` elements for game board cells and manage `aria-label` dynamically to communicate game state changes.

## 2025-05-15 - [Global Styles & Micro-UX]
**Learning:** Global button styles (like `min-width` or `text-transform`) can interfere with specialized buttons like game board cells.
**Action:** When converting elements to buttons, explicitly override interfering global styles to maintain visual consistency and responsive behavior.
