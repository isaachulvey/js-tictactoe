## 2025-05-14 - [Semantic and Accessible Game Board]
**Learning:** Converting interactive elements (like game cells) from generic containers (like `section`) to semantic tags (like `button`) significantly improves keyboard and screen reader accessibility, but requires careful management of the component's state lifecycle (especially reset functionality) and CSS overrides (to prevent global button styles from breaking the layout).
**Action:** Always verify that state changes (like `disabled`) are properly reverted in reset/init functions when converting elements to buttons.
