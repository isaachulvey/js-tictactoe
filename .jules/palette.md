## 2025-05-15 - Improving board accessibility with semantic buttons
**Learning:** Converting interactive grid elements to `<button>` tags significantly improves keyboard and screen reader accessibility, but requires explicit reset logic for stateful attributes like `disabled` and `aria-label` to maintain functional correctness after a game reset.
**Action:** When converting non-semantic elements to interactive buttons, always ensure that all dynamic states (disabled status, ARIA labels, focus states) are correctly cleared or reset in the application's state management logic.
