## 2025-05-14 - Keyboard Accessibility in Grid-based Games
**Learning:** Using semantic `<button>` elements for game board cells instead of generic `<div>` or `<section>` tags provides immediate keyboard focusability and activation support, which is critical for accessible gaming. Dynamic `aria-label` updates are necessary to communicate state changes (e.g., 'empty' to 'marked with X') to screen reader users.
**Action:** Always prefer `<button>` for interactive grid cells and ensure they have descriptive `aria-label` attributes that reflect both their position and current state.
