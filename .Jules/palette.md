# Palette's UX Journal

## 2025-05-06 - Board Accessibility and Smoother Reset
**Learning:** Converting non-semantic elements to `button` elements significantly improves keyboard accessibility. When doing so, it's critical to update both visual state and accessibility attributes (like `aria-label` and `disabled`) during game transitions and resets. A client-side reset provides a much smoother UX than a full page reload, but requires careful synchronization between game logic and the DOM.
**Action:** Always ensure that any stateful UI change (like disabling a button) is explicitly reversed in the reset logic, and maintain `aria-label` accuracy throughout the component's lifecycle.
