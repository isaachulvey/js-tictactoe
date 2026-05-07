## 2025-05-15 - [Optimize TicTacToe Logic]
**Learning:** Using a flat Array instead of a Map for a small fixed-size grid (3x3) significantly reduces overhead. Additionally, moving static data like winning combinations outside the instance methods prevents redundant allocations.
**Action:** Always prefer flat arrays for grid-based logic and use static properties for constant reference data.
