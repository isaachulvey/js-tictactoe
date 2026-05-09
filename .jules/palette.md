# Palette's Journal - Tic Tac Toe UX

## 2025-05-15 - Improving Board Accessibility
**Learning:** Using semantic `<button>` elements for game board cells instead of generic `<section>` or `<div>` elements significantly improves keyboard navigation and screen reader support out of the box.
**Action:** Always prefer interactive HTML elements (like `<button>`) for grid-based game cells and use `aria-label` to provide state information.
