## 2025-05-15 - [TicTacToe Win Detection Optimization]
**Learning:** In a vanilla JS TicTacToe, `checkWinner` is called after every move. Hoisting constant winning combinations and adding move-count early returns (moves < 5) provides significant speedup (~49x in this Map-based implementation). Caching the first cell lookup in the loop further avoids redundant Map access.
**Action:** Always check if a win is even possible (min moves) before running full combinatorial checks. Cache repetitive property/map lookups within tight loops.
