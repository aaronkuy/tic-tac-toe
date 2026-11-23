// Page logic: reads clicks and keys, keeps the board array and the DOM in step.
// The rules (getWinner, isDraw) come from game.js, which is loaded first.

const boardElement = document.querySelector("#cellContainer");
const cells = Array.from(boardElement.querySelectorAll(".cell"));
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

// Row and column change for each arrow key.
const ARROW_STEPS = {
    ArrowUp: [-1, 0],
    ArrowDown: [1, 0],
    ArrowLeft: [0, -1],
    ArrowRight: [0, 1]
};

let board;
let currentPlayer;
let running;

// One listener on the board instead of nine on the cells. Enter and Space
// need no handler of their own: on a <button> the browser turns them into a click.
boardElement.addEventListener("click", handleBoardClick);
boardElement.addEventListener("keydown", handleBoardKeydown);
restartBtn.addEventListener("click", startGame);

startGame();

// Used for the first round and for every restart; X always starts.
function startGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    running = true;
    cells.forEach((cell, index) => renderCell(index));
    statusText.textContent = `${currentPlayer}'s turn`;
}

function handleBoardClick(event) {
    const cell = event.target.closest(".cell");
    if (cell === null) {
        return;
    }
    const index = Number(cell.dataset.index);

    // Occupied cells and the cells of a finished game are only marked with
    // aria-disabled, so they still receive clicks. Reject the move here.
    if (!running || board[index] !== "") {
        return;
    }

    board[index] = currentPlayer;
    renderCell(index);

    const winner = getWinner(board);
    if (winner !== null) {
        endGame(`${winner} wins!`);
    } else if (isDraw(board)) {
        endGame("Draw!");
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `${currentPlayer}'s turn`;
    }
}

function endGame(message) {
    running = false;
    statusText.textContent = message;
    // The cells that are still empty become aria-disabled as well.
    cells.forEach((cell, index) => renderCell(index));
}

// Arrow keys move the focus inside the grid and stop at its edges.
function handleBoardKeydown(event) {
    const step = ARROW_STEPS[event.key];
    const cell = event.target.closest(".cell");
    if (step === undefined || cell === null) {
        return;
    }
    // Arrow keys with a modifier belong to the browser (Alt/Cmd + Left is "back").
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
        return;
    }
    const index = Number(cell.dataset.index);
    const row = Math.floor(index / 3) + step[0];
    const column = (index % 3) + step[1];
    if (row < 0 || row > 2 || column < 0 || column > 2) {
        return;
    }
    // Otherwise the arrow key would also scroll the page.
    event.preventDefault();
    cells[row * 3 + column].focus();
}

function renderCell(index) {
    const cell = cells[index];
    const mark = board[index];
    const row = Math.floor(index / 3) + 1;
    const column = (index % 3) + 1;

    cell.textContent = mark;
    // aria-label replaces the text content for screen readers, so the label
    // has to name the mark as well, or a played cell would still read "empty".
    cell.setAttribute("aria-label", `Row ${row}, column ${column}, ${mark === "" ? "empty" : mark}`);
    // aria-disabled instead of disabled: a disabled button drops out of the
    // tab order, and the board could no longer be read with the keyboard.
    cell.setAttribute("aria-disabled", String(mark !== "" || !running));
}
