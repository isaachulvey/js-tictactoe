import { describe, it, expect, beforeEach } from 'vitest';
import { TicTacToe } from './logic.js';

describe('TicTacToe Logic', () => {
    let game;

    beforeEach(() => {
        game = new TicTacToe();
    });

    it('should initialize with a random turn and empty-ish board', () => {
        expect(['X', 'O']).toContain(game.turn);
        expect(game.moves).toBe(0);
        expect(game.isGameOver).toBe(false);
    });

    it('should allow a valid move', () => {
        const turn = game.turn;
        const result = game.makeMove('1');
        expect(result.success).toBe(true);
        expect(result.turn).toBe(turn);
        expect(game.board.get('1')).toBe(turn);
        expect(game.moves).toBe(1);
    });

    it('should not allow moving on an already occupied cell', () => {
        game.makeMove('1');
        const result = game.makeMove('1');
        expect(result.success).toBe(false);
        expect(result.message).toBe('Invalid move!');
    });

    it('should switch turns after a valid move', () => {
        const firstTurn = game.turn;
        game.makeMove('1');
        expect(game.turn).not.toBe(firstTurn);
    });

    it('should detect a horizontal win', () => {
        // Force turn to X for predictable test
        game.turn = 'X';
        game.makeMove('1'); // X
        game.makeMove('4'); // O
        game.makeMove('2'); // X
        game.makeMove('5'); // O
        const result = game.makeMove('3'); // X wins

        expect(result.winner).toBe('X');
        expect(game.isGameOver).toBe(true);
    });

    it('should detect a vertical win', () => {
        game.turn = 'O';
        game.makeMove('1'); // O
        game.makeMove('2'); // X
        game.makeMove('4'); // O
        game.makeMove('5'); // X
        const result = game.makeMove('7'); // O wins

        expect(result.winner).toBe('O');
        expect(game.isGameOver).toBe(true);
    });

    it('should detect a diagonal win', () => {
        game.turn = 'X';
        game.makeMove('1'); // X
        game.makeMove('2'); // O
        game.makeMove('5'); // X
        game.makeMove('3'); // O
        const result = game.makeMove('9'); // X wins

        expect(result.winner).toBe('X');
        expect(game.isGameOver).toBe(true);
    });

    it('should detect a stalemate', () => {
        game.turn = 'X';
        // X O X
        // X O O
        // O X X
        game.makeMove('1'); // X
        game.makeMove('2'); // O
        game.makeMove('3'); // X
        game.makeMove('5'); // O
        game.makeMove('4'); // X
        game.makeMove('7'); // O
        game.makeMove('8'); // X
        game.makeMove('9'); // O
        const result = game.makeMove('6'); // X

        expect(result.stalemate).toBe(true);
        expect(result.winner).toBe(null);
        expect(game.isGameOver).toBe(true);
    });

    it('should not allow moves after the game is over', () => {
        game.turn = 'X';
        game.makeMove('1'); // X
        game.makeMove('4'); // O
        game.makeMove('2'); // X
        game.makeMove('5'); // O
        game.makeMove('3'); // X wins

        const result = game.makeMove('6');
        expect(result.success).toBe(false);
        expect(result.message).toBe('Game is over');
    });
});
