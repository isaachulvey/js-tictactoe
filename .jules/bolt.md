## 2025-05-14 - [Optimize TicTacToe Logic]
**Learning:** Using a `Map` for a small, fixed-size board (3x3) introduces unnecessary overhead compared to a flat `Array`. Additionally, recreating the winning combinations array on every `checkWinner` call and checking for wins before it's mathematically possible (less than 5 moves) waste CPU cycles.
**Action:** Replace `Map` with `Array(9)`, use a static winning combinations array, and add an early return for `moves < 5`.
