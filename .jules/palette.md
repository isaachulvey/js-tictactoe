## 2025-05-15 - Improving Game Board Accessibility
**Learning:** Converting interactive elements (like game board cells) from generic containers (like `section`) to semantic `<button>` tags provides immediate accessibility wins for keyboard users but requires surgical CSS overrides (`min-width`, `max-width`, `padding`) to prevent browser-default button styles from breaking responsive grid layouts.
**Action:** Always pair semantic HTML tag conversions with explicit CSS resets for those tags to ensure layout parity while gaining accessibility benefits.
