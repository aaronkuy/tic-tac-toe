// Game rules without any DOM access, so they can be tested with `node --test`.
// A board is an array of nine strings: "X", "O" or "" for an empty cell,
// indexed row by row from the top left.

// The eight winning lines: three rows, three columns, two diagonals.
const WIN_LINES = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// Returns "X" or "O" if that player owns a full line, otherwise null.
function getWinner(board) {
    for (const [a, b, c] of WIN_LINES) {
        // Three empty cells are equal to each other too, so check for a mark first.
        if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}

// A full board is only a draw if the last move did not complete a line.
function isDraw(board) {
    return getWinner(board) === null && !board.includes("");
}

// The page loads this file as a classic script, so index.html keeps working
// when opened straight from disk (ES modules are blocked on file://).
// Node needs an explicit export for the tests.
if (typeof module !== "undefined") {
    module.exports = { WIN_LINES, getWinner, isDraw };
}
