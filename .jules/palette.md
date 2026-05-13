## 2026-05-13 - [Accessible Board Interaction]
**Learning:** Converting static grid elements to semantic <button> tags instantly improves keyboard accessibility but requires careful CSS overrides (min-width, text-transform) to maintain layout integrity.
**Action:** When converting interactive elements to buttons in a CSS-heavy environment, always explicitly reset display/sizing properties to prevent global button styles from breaking the grid.

## 2026-05-13 - [In-place Reset vs Reload]
**Learning:** While location.reload() is a safe catch-all for state reset, an in-place reset provides a much smoother UX. However, it requires manual reconciliation of all dynamic attributes (ARIA, disabled state, content).
**Action:** Prioritize in-place resets for simple games to maintain immersion, ensuring all accessibility attributes are reverted to their initial state.
