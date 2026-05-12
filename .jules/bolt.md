## 2025-05-14 - Optimize checkWinner in TicTacToe logic
**Learning:** Moving static data (like winning combinations) outside of hot-path functions avoids redundant allocations. Adding early returns based on game rules (e.g., minimum moves to win) significantly improves performance in the early game.
**Action:** Always check if a function can return early based on state, and ensure static constants are defined outside of the function scope.

### Performance Impact (10M iterations)
- **Early Game (Moves < 5):** ~2300ms -> ~40ms (58x faster due to early return)
- **Win Detected Early:** ~900ms -> ~320ms (2.8x faster due to constant array and optimized check)
- **No Win Detected (Moves >= 5):** ~2300ms -> ~1440ms (1.6x faster due to constant array)
