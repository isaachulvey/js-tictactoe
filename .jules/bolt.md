# Bolt's Journal - Performance Learnings

## 2025-05-14 - Win Detection Bottleneck
**Learning:** The `checkWinner` function was re-creating the `winningCombinations` array on every call and performing unnecessary iterations and Map lookups before a win was even possible (fewer than 5 moves).
**Action:** Move static data to module level, add early returns for impossible win states, and cache Map lookups in loops.
