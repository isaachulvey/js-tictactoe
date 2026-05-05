export class TicTacToe {
    constructor() {
        // Optimized board representation: flat array is faster than Map for small fixed-size grids.
        // Indices 0-8 correspond to IDs '1'-'9'.
        this.board = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
        this.turn = this.getRandomTurn();
        this.winner = false;
        this.moves = 0;
        this.isGameOver = false;
        this.isAiMode = false;
        this.humanPlayer = null;
    }

    getRandomTurn() {
        return Math.floor(Math.random() * 2) === 0 ? "X" : "O";
    }

    setAiMode(enabled) {
        this.isAiMode = enabled;
        if (enabled) {
            this.humanPlayer = this.getRandomTurn();
        } else {
            this.humanPlayer = null;
        }
    }

    makeMove(selection) {
        if (this.isGameOver) return { success: false, message: 'Game is over' };

        // Map 1-based string ID to 0-based array index
        const index = parseInt(selection) - 1;
        const currentVal = this.board[index];
        if (currentVal === 'X' || currentVal === 'O') {
            return { success: false, message: 'Invalid move!' };
        }

        this.board[index] = this.turn;
        this.moves++;

        const winningLine = this.checkWinner();
        const win = !!winningLine;
        const stalemate = !win && this.moves === 9;

        const result = {
            success: true,
            selection,
            turn: this.turn,
            winner: win ? this.turn : null,
            winningLine: winningLine || null,
            stalemate: stalemate
        };

        if (win || stalemate) {
            this.isGameOver = true;
            this.winner = win ? this.turn : false;
        } else {
            this.updateTurn();
        }

        return result;
    }

    updateTurn() {
        this.turn = this.turn === "X" ? "O" : "X";
    }

    checkWinner() {
        const b = this.board;
        // Static win patterns defined by array indices (0-8)
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (let i = 0; i < winPatterns.length; i++) {
            const [a, bIndex, c] = winPatterns[i];
            if (b[a] === b[bIndex] && b[a] === b[c]) {
                // Return 1-based string IDs for UI compatibility
                return [(a + 1).toString(), (bIndex + 1).toString(), (c + 1).toString()];
            }
        }
        return null;
    }

    getAvailableMoves() {
        const available = [];
        for (let i = 0; i < this.board.length; i++) {
            const value = this.board[i];
            if (value !== 'X' && value !== 'O') {
                // Map back to 1-based string ID
                available.push((i + 1).toString());
            }
        }
        return available;
    }
}
