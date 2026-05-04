## 2025-05-15 - [Optimization: Board Representation & Soft Reset]
**Learning:** Switching from a `Map` to a flat `Array(9)` for the board state and implementing a "soft reset" (manually clearing the DOM and state instead of `location.reload()`) significantly improves responsiveness. Caching DOM elements in a lookup object avoids repeated `document.getElementById` calls during AI moves and win highlighting.
**Action:** Always prefer flat arrays for small, fixed-size grids. Implement soft resets to avoid full page reloads and resource re-parsing. Cache frequently accessed DOM elements.
