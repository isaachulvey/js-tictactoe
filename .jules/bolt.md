## 2025-05-22 - [Array vs Map for small grids]
**Learning:** For a small, fixed-size grid like a 3x3 Tic-Tac-Toe board, a flat array is significantly faster than a `Map` in JavaScript. Benchmarks showed a 10x improvement in `checkWinner` execution time when combined with pattern-based indexing instead of string-key lookups.
**Action:** Default to flat arrays for small game boards or fixed-size data structures where performance is critical.

## 2025-05-22 - [Win pattern optimization]
**Learning:** While unrolling win-detection into separate `if` statements provides the absolute best performance, it can be flagged as a maintainability concern in reviews. A middle ground using a loop over a pre-defined array of index-based patterns (e.g., `[[0,1,2], ...]`) maintains 90% of the performance gains while keeping the code readable and easy to modify.
**Action:** Balance micro-optimizations with readability by using structured patterns instead of fully unrolled logic unless the performance requirement is extreme.
