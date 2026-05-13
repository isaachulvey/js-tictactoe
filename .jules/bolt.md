# Bolt's Performance Journal

## 2025-05-15 - [Win Detection Bottleneck]
**Learning:** In a Tic Tac Toe game, checking for a winner on every move is technically O(1) given the fixed board size, but re-allocating the winning combinations array and iterating through it before it's even possible to win (less than 5 moves) is an avoidable overhead. Moving the combinations to a module-level constant and adding an early return for moves < 5 yields a significant performance boost in the early game (~50x faster for early moves).
**Action:** Always check if a minimum state requirement (like move count) is met before executing relatively expensive logic.
