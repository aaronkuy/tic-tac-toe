const test = require("node:test");
const assert = require("node:assert/strict");
const { WIN_LINES, getWinner, isDraw } = require("../game.js");

const EMPTY_BOARD = ["", "", "", "", "", "", "", "", ""];

function boardWith(player, indices) {
    const board = [...EMPTY_BOARD];
    for (const index of indices) {
        board[index] = player;
    }
    return board;
}

test("an empty board has no winner and is not a draw", () => {
    assert.equal(getWinner(EMPTY_BOARD), null);
    assert.equal(isDraw(EMPTY_BOARD), false);
});

test("there are eight distinct winning lines", () => {
    const keys = new Set(WIN_LINES.map((line) => [...line].sort().join("")));
    assert.equal(keys.size, 8);
});

// Written out by hand instead of reusing WIN_LINES, so a typo in the table
// under test cannot hide itself.
const EXPECTED_LINES = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
];

test("each winning line wins for X and for O", () => {
    for (const line of EXPECTED_LINES) {
        assert.equal(getWinner(boardWith("X", line)), "X", `X on ${line}`);
        assert.equal(getWinner(boardWith("O", line)), "O", `O on ${line}`);
    }
});

test("two in a line is not a win", () => {
    assert.equal(getWinner(boardWith("X", [0, 1])), null);
    assert.equal(getWinner(boardWith("O", [0, 4])), null);
});

test("a line with mixed marks is not a win", () => {
    const board = ["X", "O", "X", "", "", "", "", "", ""];
    assert.equal(getWinner(board), null);
});

test("a full board without a line is a draw", () => {
    const board = [
        "X", "O", "X",
        "X", "O", "O",
        "O", "X", "X"
    ];
    assert.equal(getWinner(board), null);
    assert.equal(isDraw(board), true);
});

test("a win with the ninth mark is a win, not a draw", () => {
    const board = [
        "X", "O", "X",
        "O", "X", "O",
        "O", "X", "X"
    ];
    assert.equal(getWinner(board), "X");
    assert.equal(isDraw(board), false);
});

test("a board with empty cells and no line is not a draw", () => {
    assert.equal(isDraw(boardWith("X", [4])), false);
});

// Plays every possible game to its end. The totals are the known counts for
// tic-tac-toe with X moving first: 255,168 games in all.
test("all possible games end with the known totals", () => {
    const totals = { X: 0, O: 0, draw: 0 };

    function play(board, player) {
        const winner = getWinner(board);
        if (winner !== null) {
            totals[winner] += 1;
            return;
        }
        if (isDraw(board)) {
            totals.draw += 1;
            return;
        }
        for (let index = 0; index < 9; index += 1) {
            if (board[index] === "") {
                board[index] = player;
                play(board, player === "X" ? "O" : "X");
                board[index] = "";
            }
        }
    }

    play([...EMPTY_BOARD], "X");
    assert.deepEqual(totals, { X: 131184, O: 77904, draw: 46080 });
});
