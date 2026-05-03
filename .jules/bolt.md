## 2025-05-15 - [Array vs Map for small fixed-size collections]
**Learning:** For extremely small, fixed-size data sets (like a 3x3 Tic-Tac-Toe board), the overhead of a `Map` is significant compared to a simple `Array`. Accessing array indices is ~1.5x faster, but the real win comes from avoiding the allocation of temporary objects/arrays during iterative checks.
**Action:** Prefer flat arrays and unrolled logic for small, high-frequency game state computations.

## 2025-05-15 - [Loop Unrolling Performance]
**Learning:** Unrolling the `checkWinner` loop in JavaScript resulted in a ~10x performance boost in micro-benchmarks. This is because it eliminates the overhead of iterating over a nested array of combinations and allows the JIT compiler to optimize the constant-index lookups more effectively.
**Action:** Use unrolled logic for mission-critical paths where the number of iterations is small and constant.
