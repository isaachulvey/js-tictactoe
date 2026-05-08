export class TicTacToe {
    static WINNING_COMBINATIONS = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    constructor() {
        // Internal board representation as a flat array for performance
        this._board = Array(9).fill(null);

        // Proxy to maintain backward compatibility with Map-based access
        this.board = {
            get: (key) => this._board[parseInt(key) - 1] || (['1','2','3','4','5','6','7','8','9'].includes(key) ? String.fromCharCode(96 + parseInt(key)) : undefined),
            set: (key, value) => { this._board[parseInt(key) - 1] = value; },
            entries: () => {
                return ['1','2','3','4','5','6','7','8','9'].map(key => {
                    const index = parseInt(key) - 1;
                    const val = this._board[index] || String.fromCharCode(96 + parseInt(key));
                    return [key, val];
                })[Symbol.iterator]();
            }
        };

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

        const index = parseInt(selection) - 1;
        const currentVal = this._board[index];
        if (currentVal === 'X' || currentVal === 'O') {
            return { success: false, message: 'Invalid move!' };
        }

        this._board[index] = this.turn;
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
        // Optimization: Cannot win with less than 5 moves
        if (this.moves < 5) return null;

        for (const combo of TicTacToe.WINNING_COMBINATIONS) {
            const [a, b, c] = combo;
            if (this._board[a] &&
                this._board[a] === this._board[b] &&
                this._board[a] === this._board[c]) {
                // Return original string IDs for UI compatibility
                return combo.map(i => (i + 1).toString());
            }
        }
        return null;
    }

    getAvailableMoves() {
        const available = [];
        for (let i = 0; i < this._board.length; i++) {
            if (this._board[i] !== 'X' && this._board[i] !== 'O') {
                available.push((i + 1).toString());
            }
        }
        return available;
    }
}
