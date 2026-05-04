import { TicTacToe } from './logic.js';

const game = new TicTacToe();

// Optimization: Cache DOM elements to avoid repeated lookups
const cellElements = {};
const cells = document.querySelectorAll('.cell');
cells.forEach(element => {
    cellElements[element.id] = element;
    element.addEventListener('click', move);
});

const msg = document.querySelector('#msg');
const aiToggle = document.querySelector('#aiToggle');
const themeToggle = document.querySelector('#themeToggle');

aiToggle.addEventListener('click', toggleAi);
themeToggle.addEventListener('click', toggleTheme);

// Initialize theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.innerHTML = "Light Mode";
}

updateMessage();

function updateMessage() {
    if (game.isAiMode) {
        msg.innerHTML = `${game.turn} goes first! You are ${game.humanPlayer}.`;
    } else {
        msg.innerHTML = `${game.turn} goes first!`;
    }
}

function toggleAi() {
    if (game.moves > 0) return; // Prevent toggling during game

    game.setAiMode(!game.isAiMode);
    aiToggle.innerHTML = game.isAiMode ? "Play against Human" : "Play against AI";
    updateMessage();

    // If AI goes first
    if (game.isAiMode && game.turn !== game.humanPlayer) {
        triggerAiMove();
    }
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.innerHTML = isDark ? "Light Mode" : "Dark Mode";
}

// Gets the ID of the cell that is clicked on
function move(event) {
    if (game.isAiMode && game.turn !== game.humanPlayer) return; // Prevent clicking during AI turn

    const target = event.target;
    const selection = target.id;

    executeMove(selection, target);
}

function executeMove(selection, target) {
    const result = game.makeMove(selection);

    if (!result.success) {
        console.log(result.message);
        return;
    }

    // Lock AI toggle once game starts
    if (game.moves === 1) {
        aiToggle.disabled = true;
        aiToggle.style.opacity = 0.5;
        aiToggle.style.cursor = 'not-allowed';
    }

    target.innerHTML = result.turn;

    if (result.winner) {
        msg.classList.add('winner');
        msg.innerHTML = `${result.winner} wins!`;
        speak(`${result.winner} wins!`);
        if (result.winningLine) {
            result.winningLine.forEach(id => {
                cellElements[id].classList.add('win-highlight');
            });
        }
    } else if (result.stalemate) {
        msg.classList.add('stalemate');
        msg.innerHTML = 'Stalemate!';
        speak('Stalemate!');
    } else {
        // If it's AI mode and now it's AI's turn
        if (game.isAiMode && game.turn !== game.humanPlayer) {
            triggerAiMove();
        }
    }
}

function triggerAiMove() {
    setTimeout(() => {
        const available = game.getAvailableMoves();
        if (available.length > 0) {
            const randomIndex = Math.floor(Math.random() * available.length);
            const selection = available[randomIndex];
            const target = cellElements[selection];
            executeMove(selection, target);
        }
    }, 500);
}

function speak(announceWinner) {
    // Check if SpeechSynthesis is supported
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(announceWinner);
        window.speechSynthesis.speak(utterance);
    }
}

/**
 * Performance Optimization: Soft Reset.
 * Instead of window.location.reload(), we manually clear the state.
 * This avoids re-downloading assets and re-parsing scripts.
 */
window.reset = function() {
    // Reset game logic
    game.reset();

    // Reset UI
    Object.values(cellElements).forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove('win-highlight');
    });

    msg.innerHTML = '';
    msg.classList.remove('winner', 'stalemate');
    updateMessage();

    // Re-enable AI toggle and reset its text
    aiToggle.disabled = false;
    aiToggle.style.opacity = 1;
    aiToggle.style.cursor = 'pointer';
    aiToggle.innerHTML = "Play against AI";
};
