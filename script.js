const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset-button');

let currentPlayer = 'X';
let isGameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];

// Event listeners for cell clicks
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Event listener for reset button
resetButton.addEventListener('click', resetGame);

// Function to handle cell clicks
function handleCellClick() {
    const cellIndex = parseInt(this.getAttribute('data-index'));
    if (board[cellIndex] === '' && isGameActive) {
        board[cellIndex] = currentPlayer;
        this.textContent = currentPlayer;
        checkWin();
        checkDraw();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Function to check for a win
function checkWin() {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            message.textContent = `${board[a]} wins!`;
            isGameActive = false;
            return;
        }
    }
}

// Function to check for a draw
function checkDraw() {
    if (!board.includes('')) {
        message.textContent = "It's a draw!";
        isGameActive = false;
    }
}

// Function to reset the game
function resetGame() {
    currentPlayer = 'X';
    isGameActive = true;
    board = ['', '', '', '', '', '', '', '', ''];
    message.textContent = '';
    cells.forEach(cell => {
        cell.textContent = '';
    });
}
