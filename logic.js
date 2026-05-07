export class TicTacToe {
    // Optimization: Move winning combinations to a static property to avoid redundant allocations.
    static winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    constructor() {
        // Optimization: Use a flat array instead of a Map for the board to reduce lookup overhead and memory footprint.
        this.board = Array(9).fill(null);
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

        // Support both 1-based string IDs from UI and 0-based indices, maintaining backward compatibility.
        const index = typeof selection === 'string' ? parseInt(selection, 10) - 1 : selection;

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
            selection: selection.toString(),
            turn: this.turn,
            winner: win ? this.turn : null,
            // Convert back to 1-based string IDs for the UI.
            winningLine: winningLine ? winningLine.map(i => (i + 1).toString()) : null,
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
        // Optimization: A win is impossible before 5 moves have been made.
        if (this.moves < 5) return null;

        for (const combo of TicTacToe.winningCombinations) {
            const [a, b, c] = combo;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                return combo;
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
