export class TicTacToe {
    constructor() {
        this.board = new Map([
            ['1', 'a'], ['2', 'b'], ['3', 'c'],
            ['4', 'd'], ['5', 'e'], ['6', 'f'],
            ['7', 'g'], ['8', 'h'], ['9', 'i'],
        ]);
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

        const currentVal = this.board.get(selection.toString());
        if (currentVal === 'X' || currentVal === 'O') {
            return { success: false, message: 'Invalid move!' };
        }

        this.board.set(selection.toString(), this.turn);
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
        const winningCombinations = [
            ['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], // Rows
            ['1', '4', '7'], ['2', '5', '8'], ['3', '6', '9'], // Cols
            ['1', '5', '9'], ['3', '5', '7']                // Diagonals
        ];

        for (const combo of winningCombinations) {
            if (this.board.get(combo[0]) === this.board.get(combo[1]) &&
                this.board.get(combo[0]) === this.board.get(combo[2])) {
                return combo;
            }
        }
        return null;
    }

    getAvailableMoves() {
        const available = [];
        for (const [key, value] of this.board.entries()) {
            if (value !== 'X' && value !== 'O') {
                available.push(key);
            }
        }
        return available;
    }

    reset() {
        this.board = new Map([
            ['1', 'a'], ['2', 'b'], ['3', 'c'],
            ['4', 'd'], ['5', 'e'], ['6', 'f'],
            ['7', 'g'], ['8', 'h'], ['9', 'i'],
        ]);
        this.turn = this.getRandomTurn();
        this.winner = false;
        this.moves = 0;
        this.isGameOver = false;
        if (this.isAiMode) {
            this.humanPlayer = this.getRandomTurn();
        } else {
            this.humanPlayer = null;
        }
    }
}
