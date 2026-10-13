// ========================================
// TIC TAC TOE - GAME LOGIC
// ========================================

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const restartBtn = document.getElementById("restartBtn");
const resetScoreBtn = document.getElementById("resetScoreBtn");

const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const scoreDraw = document.getElementById("scoreDraw");

const gameMessage = document.getElementById("gameMessage");
const messageTitle = document.getElementById("messageTitle");
const messageText = document.getElementById("messageText");


// ========================================
// GAME VARIABLES
// ========================================

let board = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "X";

let gameActive = true;

let scores = {
    X: 0,
    O: 0,
    draw: 0
};


// ========================================
// WINNING COMBINATIONS
// ========================================

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];


// ========================================
// CELL CLICK
// ========================================

function handleCellClick(event) {

    const cell = event.currentTarget;

    const index = parseInt(cell.dataset.index);

    console.log("Clicked cell:", index);

    // Game already finished
    if (!gameActive) {
        return;
    }

    // Cell already occupied
    if (board[index] !== "") {
        return;
    }

    // Store the move
    board[index] = currentPlayer;

    // Put X or O inside the cell
    cell.textContent = currentPlayer;

    // Add styling
    cell.classList.add("filled");
    cell.classList.add(currentPlayer.toLowerCase());

    // Animation
    cell.classList.remove("pop");

    // Force browser to restart animation
    void cell.offsetWidth;

    cell.classList.add("pop");

    // Check result
    checkResult();
}


// ========================================
// CHECK WIN / DRAW
// ========================================

function checkResult() {

    for (let pattern of winningPatterns) {

        const a = pattern[0];
        const b = pattern[1];
        const c = pattern[2];

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {

            // We have a winner
            gameActive = false;

            // Highlight winning cells
            cells[a].classList.add("winner");
            cells[b].classList.add("winner");
            cells[c].classList.add("winner");

            // Update score
            scores[currentPlayer]++;

            updateScores();

            showMessage(
                "Player " + currentPlayer + " Wins!",
                "Congratulations!"
            );

            return;
        }
    }

    // Check draw
    if (!board.includes("")) {

        gameActive = false;

        scores.draw++;

        updateScores();

        showMessage(
            "It's a Draw!",
            "Nobody wins this round."
        );

        return;
    }

    // Change player
    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }

    updateTurn();
}


// ========================================
// UPDATE TURN
// ========================================

function updateTurn() {

    statusText.textContent =
        "Player " + currentPlayer + "'s turn";

    if (currentPlayer === "X") {
        statusText.style.color = "#00e5ff";
    } else {
        statusText.style.color = "#ff3cac";
    }
}


// ========================================
// UPDATE SCORES
// ========================================

function updateScores() {

    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
    scoreDraw.textContent = scores.draw;
}


// ========================================
// SHOW WIN / DRAW MESSAGE
// ========================================

function showMessage(title, text) {

    messageTitle.textContent = title;

    messageText.textContent = text;

    gameMessage.classList.add("show");
}


// ========================================
// HIDE MESSAGE
// ========================================

function hideMessage() {

    gameMessage.classList.remove("show");
}


// ========================================
// RESTART GAME
// ========================================

function restartGame() {

    console.log("Restarting game...");

    // Clear board
    board = ["", "", "", "", "", "", "", ""];

    // X starts every new round
    currentPlayer = "X";

    // Allow clicking again
    gameActive = true;

    // Clear every cell
    cells.forEach(function(cell) {

        cell.textContent = "";

        cell.classList.remove(
            "filled",
            "x",
            "o",
            "winner",
            "pop"
        );
    });

    hideMessage();

    updateTurn();
}


// ========================================
// RESET SCORE
// ========================================

function resetScores() {

    scores.X = 0;
    scores.O = 0;
    scores.draw = 0;

    updateScores();

    restartGame();
}


// ========================================
// EVENT LISTENERS
// ========================================

cells.forEach(function(cell) {

    cell.addEventListener(
        "click",
        handleCellClick
    );

});


restartBtn.addEventListener(
    "click",
    restartGame
);


resetScoreBtn.addEventListener(
    "click",
    resetScores
);


// ========================================
// START GAME
// ========================================

updateTurn();

updateScores();

console.log("Tic Tac Toe loaded successfully!");