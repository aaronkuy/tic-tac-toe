# Tic Tac Toe

The classic two-player game in the browser, with win and draw detection.

![Screenshot of Tic Tac Toe](docs/screenshot.png)

## Features

- Two players take turns as X and O
- Detects all eight winning lines and draws
- Status line for whose turn it is, and a restart button

## Tech

- HTML, CSS, vanilla JavaScript

## How to run

Open the live version: **[aaronkuy.github.io/tic-tac-toe](https://aaronkuy.github.io/tic-tac-toe/)**

Or run it locally. There is no build step and no dependency:

```bash
git clone https://github.com/aaronkuy/tic-tac-toe.git
cd tic-tac-toe
open index.html        # macOS; on Linux use xdg-open, on Windows start
```

## What I'd do next

- A computer opponent (minimax)
- Score across rounds
- Keyboard and screen-reader support for the board

## Credits

This project started from Bro Code's tutorial
[A game of TicTacToe written in JavaScript](https://www.youtube.com/watch?v=AnmwHjpEhtA):
the game rules, the page structure and the first stylesheet come from there.
The visual redesign from October 2026 was added in this repository.

## License

MIT, see [LICENSE](LICENSE). The license covers what was added in this repository;
the tutorial code it builds on remains Bro Code's.
