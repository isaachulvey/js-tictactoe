# Bolt's Performance Journal

## 2025-05-15 - Win Detection Optimization
**Learning:** In a 3x3 Tic Tac Toe game, a win is mathematically impossible before the 5th move (3 moves for the first player, 2 for the second). Checking for a winner before `moves === 5` is a wasted computation. Also, allocating the `winningCombinations` array inside the function causes unnecessary GC pressure.
**Action:** Always look for mathematical invariants to skip computations (early returns) and move static data structures outside of hot paths to avoid re-allocation.
