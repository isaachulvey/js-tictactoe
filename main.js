import { TicTacToe } from './logic.js';

const game = new TicTacToe();

// Sets up event listeners for each cell
const cells = document.querySelectorAll('.cell');
Array.from(cells).forEach(element => element.addEventListener('click', move));

// Notify players who goes first.
const msg = document.querySelector('#msg');
msg.innerHTML = `${game.turn} goes first!`;

// Gets the ID of the cell that is clicked on
function move(event) {
    const target = event.target;
    const selection = target.id;

    const result = game.makeMove(selection);

    if (!result.success) {
        console.log(result.message);
        return;
    }

    console.log(`Valid move. ${result.selection}, ${result.turn}`);
    target.innerHTML = result.turn;

    if (result.winner) {
        msg.classList.add('winner');
        msg.innerHTML = `${result.winner} wins!`;
        speak(`${result.winner} wins!`);
    } else if (result.stalemate) {
        msg.classList.add('stalemate');
        msg.innerHTML = 'Stalemate!';
        speak('Stalemate!');
    }
}

function speak(announceWinner) {
    const utterance = new SpeechSynthesisUtterance(announceWinner);
    window.speechSynthesis.speak(utterance);
}

window.reset = function() {
    window.location.reload();
};
