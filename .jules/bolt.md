## 2025-05-15 - [Tic Tac Toe Logic Optimization]
**Learning:** Re-allocating arrays and performing redundant checks in hot paths like `checkWinner` (called after every move) can be optimized by using static constants and early returns.
**Action:** Move static data out of methods and identify mathematical impossibilities (like winning before 5 moves) to skip processing entirely.
