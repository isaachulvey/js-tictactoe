/**
 * Optimized TicTacToe logic.
 * Uses a flat array for board representation and unrolled-style win detection.
 */

const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

export class TicTacToe {
    constructor() {
        this.reset();
    }

    reset() {
        // Optimization: Use a flat array instead of a Map for faster access and less memory overhead.
        this.board = Array(9).fill(null);
        this.turn = this.getRandomTurn();
        this.winner = false;
        this.moves = 0;
        this.isGameOver = false;
        this.isAiMode = false;
        this.humanPlayer = null;
    }

    getRandomTurn() {
        return Math.random() < 0.5 ? "X" : "O";
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

        // Convert string ID (1-9) to 0-indexed array index
        const index = parseInt(selection) - 1;

        if (this.board[index] !== null) {
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

    /**
     * Performance Optimization:
     * 1. Skip check if moves < 5 (impossible to win yet).
     * 2. Use a pre-defined constant for combinations.
     * 3. Direct array access.
     */
    checkWinner() {
        if (this.moves < 5) return null;

        for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
            const [a, b, c] = WINNING_COMBINATIONS[i];
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                // Return IDs (1-9) to keep compatibility with UI
                return [ (a + 1).toString(), (b + 1).toString(), (c + 1).toString() ];
            }
        }
        return null;
    }

    getAvailableMoves() {
        const available = [];
        for (let i = 0; i < 9; i++) {
            if (this.board[i] === null) {
                available.push((i + 1).toString());
            }
        }
        return available;
    }
}
