//Fetch HTML elements
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
//All possibilities to win tic tac toe
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];
//Player with 'X' begins, running by default is false, 
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame() {
    //Here we allocate the cells clicked by the user to 'cells'
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    //Await true statement from the user by clicking restart button
    restartBtn.addEventListener("click", restartGame);
    //'currentPlayer' can take the value 'X' or 'O', displays the current state
    //which player has the next turn
    statusText.textContent = `${currentPlayer}'s turn`;
    //If the game has started, running has set the value true
    running = true;
}

function cellClicked() {
    //'this' automatically allocates the right 
    const cellIndex = this.getAttribute("cellIndex");
//Skip the code beneath when the game ends or didn't start
    //and no field is left out
    if (options[cellIndex] != "" || !running) {
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    //Set the 'X'/'O' value inside the array
    options[index] = currentPlayer;
    //Display it in HTML 
    cell.textContent = currentPlayer;
}

function changePlayer() {
    //Ternary method, if current player is 'X' make it 'O', if false
    //then applies the false value which is 'X'
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    //Display the info within the DOM
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    //By default roundWon is false
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];
//If XOR even one cell is empty means ficuratively, that the game hasn't finished yet.
        //make the next iteration. 
        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        //only if all the fields has the value, e.g. cellA-C has the value 'X'
        //set roundWon to true and stop there 
        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }
    }
//If roundWon is true, adjust the winner text
    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        //set to default, await the the next game
        running = false;
        //If roundWon is false, and we have to more options left
        //this implicates a draw
    } else if (!options.includes("")) {
        //display 'Draw' within the DOM
        statusText.textContent = `Draw!`;
        //running false signals that the iteration is finished
        running = false;
    } else {
        changePlayer();
    }
}
//If the user presses the restart button, set all values in the DOM and log to default
function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}

