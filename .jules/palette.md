## 2025-05-08 - Overriding Global Button Styles for Layout Elements

**Learning:** When converting interactive elements (like Tic Tac Toe cells) to `<button>` tags for accessibility, global CSS rules targeting the `button` selector can unexpectedly break the layout (e.g., adding padding, forcing minimum widths, or changing text casing). These "layout buttons" must explicitly reset or override those properties to remain responsive and visually consistent with the original design.

**Action:** Always include a CSS reset block for `<button>` elements used as functional layout components (like grid cells) that explicitly sets `min-width: 0`, `max-width: none`, `padding: 0`, and `text-transform: none` if a global button style exists.
