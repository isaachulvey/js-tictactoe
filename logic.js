export class TicTacToe {
    // Optimization: Use a static property for winning combinations to avoid re-creating the array in every checkWinner call
    static winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    constructor() {
        // Optimization: Use a flat array instead of a Map for better performance in access and iteration
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

        // Convert selection (1-9) to 0-8 index
        const index = parseInt(selection) - 1;
        const currentVal = this.board[index];
        if (currentVal === 'X' || currentVal === 'O') {
            return { success: false, message: 'Invalid move!' };
        }

        this.board[index] = this.turn;
        this.moves++;

        const winningLineIndices = this.checkWinner();
        const win = !!winningLineIndices;
        const stalemate = !win && this.moves === 9;

        // Map indices back to '1'-'9' for UI compatibility
        const winningLine = winningLineIndices ? winningLineIndices.map(idx => (idx + 1).toString()) : null;

        const result = {
            success: true,
            selection,
            turn: this.turn,
            winner: win ? this.turn : null,
            winningLine: winningLine,
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
        const board = this.board;
        const combinations = TicTacToe.winningCombinations;
        // Optimization: Use a loop and direct array access for maximum speed
        for (let i = 0; i < combinations.length; i++) {
            const combo = combinations[i];
            if (board[combo[0]] === board[combo[1]] &&
                board[combo[0]] === board[combo[2]]) {
                return combo;
            }
        }
        return null;
    }

    getAvailableMoves() {
        const available = [];
        for (let i = 0; i < 9; i++) {
            const value = this.board[i];
            if (value !== 'X' && value !== 'O') {
                // Map back to '1'-'9' strings for UI compatibility
                available.push((i + 1).toString());
            }
        }
        return available;
    }
}
