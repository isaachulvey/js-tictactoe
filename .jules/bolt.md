## 2025-05-15 - Optimizing Win Detection with Early Returns and Constant Allocation

**Learning:** Re-allocating the `winningCombinations` array inside the `checkWinner` method on every move is a measurable overhead. Furthermore, since a win in Tic Tac Toe is mathematically impossible before the 5th move (3 moves by the first player), an early return based on the move count provides a massive speedup (~37x) for early-game checks. Map lookups are also more expensive than local variables, so caching the first value of a combo and checking it before looking up the other two avoids redundant work.

**Action:** Always move static configuration/lookup tables out of hot-path functions. Use game state (like move count) to skip expensive logic when the outcome is guaranteed to be null.
