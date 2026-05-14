import { TicTacToe } from './logic.js';

let game = new TicTacToe();

// Sets up event listeners for each cell
const cells = document.querySelectorAll('.cell');
Array.from(cells).forEach(element => element.addEventListener('click', move));

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

    console.log(`Valid move. ${result.selection}, ${result.turn}`);
    target.innerHTML = result.turn;
    target.setAttribute('aria-label', `Cell ${selection}, marked with ${result.turn}`);
    target.disabled = true;

    if (result.winner) {
        msg.classList.add('winner');
        msg.innerHTML = `${result.winner} wins!`;
        speak(`${result.winner} wins!`);
        if (result.winningLine) {
            result.winningLine.forEach(id => {
                document.getElementById(id).classList.add('win-highlight');
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
            const target = document.getElementById(selection);
            executeMove(selection, target);
        }
    }, 500);
}

function speak(announceWinner) {
    const utterance = new SpeechSynthesisUtterance(announceWinner);
    window.speechSynthesis.speak(utterance);
}

window.reset = function() {
    game = new TicTacToe();

    // Reset UI message
    msg.classList.remove('winner', 'stalemate');
    updateMessage();

    // Reset cells
    Array.from(cells).forEach(cell => {
        cell.innerHTML = '';
        cell.disabled = false;
        cell.classList.remove('win-highlight');
        cell.setAttribute('aria-label', `Cell ${cell.id}, empty`);
    });

    // Reset AI toggle
    aiToggle.disabled = false;
    aiToggle.style.opacity = 1;
    aiToggle.style.cursor = 'pointer';
    aiToggle.innerHTML = "Play against AI";
};
