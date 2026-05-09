export class TicTacToe {
    static WINNING_COMBINATIONS = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    constructor() {
        this._board = new Array(9);
        // Proxy for backward compatibility with Map interface
        // This allows code using .get(), .set() and .entries() to continue working
        this.board = new Proxy(this._board, {
            get: (target, prop) => {
                if (prop === 'get') {
                    return (key) => target[parseInt(key) - 1];
                }
                if (prop === 'set') {
                    return (key, value) => {
                        target[parseInt(key) - 1] = value;
                        return this.board;
                    };
                }
                if (prop === 'entries') {
                    return function* () {
                        for (let i = 0; i < 9; i++) {
                            yield [(i + 1).toString(), target[i]];
                        }
                    };
                }
                return Reflect.get(target, prop);
            }
        });
        this.reset();
    }

    reset() {
        const initialValues = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
        for (let i = 0; i < 9; i++) {
            this._board[i] = initialValues[i];
        }
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

    /**
     * Optimized checkWinner using static winning combinations and early returns.
     * Performance: O(1) with small constant factor.
     */
    checkWinner() {
        // Minimum moves to win in Tic Tac Toe is 5 (3 for first player, 2 for second)
        if (this.moves < 5) return null;

        for (const combo of TicTacToe.WINNING_COMBINATIONS) {
            const [a, b, c] = combo;
            const valA = this._board[a];
            if (valA === this._board[b] && valA === this._board[c]) {
                // Return keys '1'-'9' for backward compatibility
                return [(a + 1).toString(), (b + 1).toString(), (c + 1).toString()];
            }
        }
        return null;
    }

    /**
     * Optimized getAvailableMoves using internal array.
     */
    getAvailableMoves() {
        const available = [];
        for (let i = 0; i < 9; i++) {
            const value = this._board[i];
            if (value !== 'X' && value !== 'O') {
                available.push((i + 1).toString());
            }
        }
        return available;
    }
}
