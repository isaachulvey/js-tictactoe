## 2025-05-15 - Enhanced accessibility and smooth reset experience
**Learning:** Converting interactive elements (like game cells) from generic containers to semantic `<button>` elements significantly improves keyboard accessibility and screen reader support out of the box. Implementing a "soft reset" that manually clears state instead of a full page reload provides a much more fluid and modern user experience.
**Action:** Always prioritize semantic HTML elements for interaction and favor local state management for resets to avoid disruptive page flashes.
