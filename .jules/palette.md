## 2025-05-14 - [A11y and Soft Reset]
**Learning:** Converting non-interactive elements like `section` to `button` significantly improves keyboard accessibility, but requires CSS overrides to maintain layout integrity. Implementing a soft reset instead of `location.reload()` provides a much smoother UX but necessitates careful manual state cleanup (ARIA labels, disabled states, classes) to avoid functional regressions.
**Action:** Always verify state cleanup thoroughly when implementing soft resets, and ensure all interactive elements use semantic HTML tags with appropriate ARIA descriptors.
