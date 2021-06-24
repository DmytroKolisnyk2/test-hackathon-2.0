const statusDisplay = document.querySelector('.game__player-move');

let gameActive = true;

let currentPlayer = "X";

let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();
  function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}
export function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = `${currentPlayerTurn()}`;
}
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
function drawLine(winCondition) {
  if (winCondition[0] === 0 && winCondition[1] === 1 && winCondition[2] === 2 ) {
    document.querySelector('[data-cell-index="0"]').style.backgroundColor = "var(--main-grey)";
    document.querySelector('[data-cell-index="1"]').style.backgroundColor = "var(--main-grey)";
    document.querySelector('[data-cell-index="2"]').style.backgroundColor = "var(--main-grey)";
  }
  if (winCondition[0] === 3 && winCondition[1] === 4 && winCondition[2] === 5) {
    document.querySelector('[data-cell-index="3"]').style.backgroundColor = "var(--main-grey)";
    document.querySelector('[data-cell-index="4"]').style.backgroundColor = "var(--main-grey)";
    document.querySelector('[data-cell-index="5"]').style.backgroundColor = "var(--main-grey)";
  }
  if (winCondition[0] === 6 && winCondition[1] === 7 && winCondition[2] === 8) {
    document.querySelector('[data-cell-index="6"]').style.backgroundColor = "var(--main-grey)";
    document.querySelector('[data-cell-index="7"]').style.backgroundColor = "var(--main-grey)";
    document.querySelector('[data-cell-index="8"]').style.backgroundColor = "var(--main-grey)";
  }
  if (winCondition[0] === 0 && winCondition[1] === 3 && winCondition[2] === 6) {
    document.querySelector('[data-cell-index="0"]').style.backgroundColor = "var(--main-grey)";
    document.querySelector('[data-cell-index="3"]').style.backgroundColor = "var(--main-grey)";
    document.querySelector('[data-cell-index="6"]').style.backgroundColor = "var(--main-grey)";
  }
  if (winCondition[0] === 1 && winCondition[1] === 4 && winCondition[2] === 7) {
    document.querySelector('[data-cell-index="1"]').style.backgroundColor = "var(--main-grey)";
    document.querySelector('[data-cell-index="4"]').style.backgroundColor = "var(--main-grey)";
    document.querySelector('[data-cell-index="7"]').style.backgroundColor = "var(--main-grey)";
  }
  if (winCondition[0] === 2 && winCondition[1] === 5 && winCondition[2] === 8) {
    document.querySelector('[data-cell-index="2"]').style.backgroundColor = "var(--main-grey)";
    document.querySelector('[data-cell-index="5"]').style.backgroundColor = "var(--main-grey)";
    document.querySelector('[data-cell-index="8"]').style.backgroundColor = "var(--main-grey)";
  }
  if (winCondition[0] === 0 && winCondition[1] === 4 && winCondition[2] === 8) {
    document.querySelector('[data-cell-index="0"]').style.backgroundColor = "var(--main-grey)";
    document.querySelector('[data-cell-index="4"]').style.backgroundColor = "var(--main-grey)";
    document.querySelector('[data-cell-index="8"]').style.backgroundColor = "var(--main-grey)";
  }
  if (winCondition[0] === 2 && winCondition[1] === 4 && winCondition[2] === 6) {
    document.querySelector('[data-cell-index="2"]').style.backgroundColor = "var(--main-grey)";
    document.querySelector('[data-cell-index="4"]').style.backgroundColor = "var(--main-grey)";
    document.querySelector('[data-cell-index="6"]').style.backgroundColor = "var(--main-grey)";
  }

}
function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    let winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === '' || b === '' || c === '') {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      drawLine(winningConditions[i]);
      break;
      }
  }

  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
  }

  let roundDraw = !gameState.includes("");
  if (roundDraw) {
      statusDisplay.innerHTML = drawMessage();
      gameActive = false;
      return;
  }
  handlePlayerChange();
}
export function handleCellClick(clickedCellEvent) {  
  const clickedCell = clickedCellEvent.target;

  const clickedCellIndex = parseInt(
    clickedCell.getAttribute('data-cell-index')
  );

  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

document.querySelectorAll('.table__cell').forEach(cell => cell.addEventListener('click', handleCellClick));