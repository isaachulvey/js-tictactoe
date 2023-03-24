// We prepopulate the Map becuase the checkWinner logic would otherwise
// see undefined === undefined and proclaim winners at the start of the game.
let board = new Map([
    ['1', 'a'],
    ['2', 'b'],
    ['3', 'c'],
    ['4', 'd'],
    ['5', 'e'],
    ['6', 'f'],
    ['7', 'g'],
    ['8', 'h'],
    ['9', 'i'],
]);
let turn;
turn = setTurn();
const synth = window.speechSynthesis;
let winner = false;
let moves = 0;

// Sets up event listeners for each cell
const cells = document.querySelectorAll('.cell')
Array.from(cells).forEach(element => element.addEventListener('click', move))

// Notify players who goes first.
const msg = document.querySelector('#msg');
msg.innerHTML = `${turn} goes first!`;

// Randomly selects X or O to go first
function setTurn() {
    let randInt = Math.floor(Math.random() * 2);
    if (randInt === 0) {
        turn = "X"
    } else {
        turn = "O"
    }
    return turn;
}

// Gets the ID of the cell that is clicked on
function move(elementId) {
    elementId = window.event;
    target = elementId.target;
    let selection = target.id
    if (board.get(selection.toString()) === 'X') {
        console.log('Invalid move!');
        console.log(board.get(selection.toString()))
    }
    else if (board.get(selection.toString()) === 'O') {
        console.log('Invalid move!');
        console.log(board.get(selection.toString()))
    }
    else {
        board.set(selection, turn);
        console.log(`Valid move. ${selection}, ${turn}`);
        target.innerHTML = `${turn}`;
        moves++
        checkWinner();
        checkStalemate(winner, moves);
        updateTurn();
    }
}

// Updates the turn when a player makes a move.
function updateTurn() {
    if (turn === "X") {
        turn = "O"
    } else {
        turn = "X"
    }
    return turn;
}

function speak(announceWinner) {
    const utterance = new SpeechSynthesisUtterance(announceWinner);
    window.speechSynthesis.speak(utterance);
  }

function checkWinner() {
    // Determine a winner by checking for the following cases:
    // same VALUE in KEYS: 1, 2, 3 OR 4, 5, 6 OR 7, 8, 9
    if (board.get('1') === board.get('2') && board.get('1') === board.get('3')) {
        msg.classList.add('winner');
        msg.innerHTML = `${turn} wins!`;
        winner = true;
        speak(`${turn} wins!`);
    }
    else if (board.get('4') === board.get('5') && board.get('4') === board.get('6')) {
        msg.classList.add('winner');
        msg.innerHTML = `${turn} wins!`;
        winner = true;
        speak(`${turn} wins!`);
    }
    else if (board.get('7') === board.get('8') && board.get('7') === board.get('9')) {
        msg.classList.add('winner');
        msg.innerHTML = `${turn} wins!`;
        winner = true;
        speak(`${turn} wins!`);
    }
    // same VALUE in KEYS: 1, 4, 7 OR 2, 5, 8 OR 3, 6, 9
    if (board.get('1') === board.get('4') && board.get('1') === board.get('7')) {
        msg.classList.add('winner');
        msg.innerHTML = `${turn} wins!`;
        winner = true;
        speak(`${turn} wins!`);
    }
    else if (board.get('2') === board.get('5') && board.get('2') === board.get('8')) {
        msg.classList.add('winner');
        msg.innerHTML = `${turn} wins!`;
        winner = true;
        speak(`${turn} wins!`);
    }
    else if (board.get('3') === board.get('6') && board.get('3') === board.get('9')) {
        msg.classList.add('winner');
        msg.innerHTML = `${turn} wins!`;
        winner = true;
        speak(`${turn} wins!`);
    }
    // same VALUE in KEYS: 1, 5, 9 OR 3, 5, 7
    if (board.get('1') === board.get('5') && board.get('1') === board.get('9')) {
        msg.classList.add('winner');
        msg.innerHTML = `${turn} wins!`;
        winner = true;
        speak(`${turn} wins!`);
    }
    else if (board.get('3') === board.get('5') && board.get('3') === board.get('7')) {
        msg.classList.add('winner');
        msg.innerHTML = `${turn} wins!`;
        winner = true;
        speak(`${turn} wins!`);
    }
}

// Since a maximum of 9 moves are possible, if 9 moves have been played and neither player
// has won, we announce the game is a stalemate.
function checkStalemate(winner, moves) {
    if (winner === false && moves === 9) {
        msg.classList.add('stalemate');
        msg.innerHTML = 'Stalemate!';
        speak('Stalemate!');
    }
}

function reset(){
    window.location.reload();
} 