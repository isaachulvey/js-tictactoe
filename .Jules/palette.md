## 2025-05-19 - Semantic HTML for Interactive Grids
**Learning:** Using generic elements like `section` or `div` for game board cells makes them invisible to keyboard users and screen readers. Converting them to `button` elements provides native focusability and accessibility.
**Action:** Always use `button` or `a` for interactive elements. If using `button` in a custom layout, remember to reset default styles (padding, min-width, background) to avoid layout breakage.
