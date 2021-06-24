const state = {};
state.move = 1;
state.playerMoveRef = document.querySelector(".game__player-move--js");
const winningConditions = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6],
];
let gameState = ["", "", "", "", "", "", "", "", ""];

export const startGame = (event) => {
   if (event.target.classList.contains("table") || event.target.classList.contains("table__cell--cross") || event.target.classList.contains("table__cell--zero")) return;
   if (state.move % 2 === 1) {
      state.move++;
      state.playerMoveRef.textContent = 2;
      event.target.classList.add("table__cell--cross");
      gameState[event.target.dataset.index] = "1";
   } else {
      state.playerMoveRef.textContent = 1;
      state.move++;
      event.target.classList.add("table__cell--zero");
      gameState[event.target.dataset.index] = "2";
   }
   handleResultValidation();
};
state.tableRef = document.querySelector(".table");

export const drawTable = () => {
   state.tableRef.innerHTML = "";
   state.move = 1;
   state.playerMoveRef.textContent = 1;

   gameState = ["", "", "", "", "", "", "", "", ""];
   for (let i = 0; i < 9; i += 1) {
      state.string = `<li data-index="${i}" class="table__cell"></li>`;
      state.tableRef.insertAdjacentHTML("beforeend", state.string);
   }
   state.tableRef.addEventListener("click", startGame);
};

const handleResultValidation = () => {
   for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      let a = gameState[winCondition[0]];
      let b = gameState[winCondition[1]];
      let c = gameState[winCondition[2]];
      if (a === "" || b === "" || c === "") {
         continue;
      }
      if (a === b && b === c) {
         drawLine(winningConditions[i]);
         return setTimeout(endGame, 200, "win", a);
      }
      if (state.move === 10) {
         return setTimeout(endGame, 300, "draw", 0);
      }
      // else {
      //    if (state.move === 9) setTimeout(() => endGame("draw", 0), 500);
      // }
   }
};
const endGame = (result, winner) => {
   document.querySelector(".audio__game-play").pause();

   if (result === "win") {
      setTimeout(() => {
         document.querySelector(".audio__won").play();
         document.querySelector(".win--js").classList.remove("hidden-modal");
         document.querySelector(".win__headline").textContent = `Player-${winner} win`;
      }, 400);
   } else {
      setTimeout(() => {
         document.querySelector(".audio__lose").play();

         document.querySelector(".draw").classList.remove("hidden-modal");
      }, 200);
   }
};

state.roundRef = 0;

export const getOverRounds = () => {
   if (state.roundRef) {
      state.roundRef = prompt("sorry write another number");
   } else {
      state.roundRef = prompt("Write amount of rounds 1-9");
   }
   localStorage.setItem("round", +state.roundRef);
   if (+state.roundRef >= 9 || +state.roundRef <= 0) {
      return getOverRounds();
   }
   drawTable();
};
function drawLine(winCondition) {
   if (winCondition[0] === 0 && winCondition[1] === 1 && winCondition[2] === 2) {
      document.querySelector('[data-index="0"]').style.backgroundColor = "var(--main-grey)";
      document.querySelector('[data-index="1"]').style.backgroundColor = "var(--main-grey)";
      document.querySelector('[data-index="2"]').style.backgroundColor = "var(--main-grey)";
   }
   if (winCondition[0] === 3 && winCondition[1] === 4 && winCondition[2] === 5) {
      document.querySelector('[data-index="3"]').style.backgroundColor = "var(--main-grey)";
      document.querySelector('[data-index="4"]').style.backgroundColor = "var(--main-grey)";
      document.querySelector('[data-index="5"]').style.backgroundColor = "var(--main-grey)";
   }
   if (winCondition[0] === 6 && winCondition[1] === 7 && winCondition[2] === 8) {
      document.querySelector('[data-index="6"]').style.backgroundColor = "var(--main-grey)";
      document.querySelector('[data-index="7"]').style.backgroundColor = "var(--main-grey)";
      document.querySelector('[data-index="8"]').style.backgroundColor = "var(--main-grey)";
   }
   if (winCondition[0] === 0 && winCondition[1] === 3 && winCondition[2] === 6) {
      document.querySelector('[data-index="0"]').style.backgroundColor = "var(--main-grey)";
      document.querySelector('[data-index="3"]').style.backgroundColor = "var(--main-grey)";
      document.querySelector('[data-index="6"]').style.backgroundColor = "var(--main-grey)";
   }
   if (winCondition[0] === 1 && winCondition[1] === 4 && winCondition[2] === 7) {
      document.querySelector('[data-index="1"]').style.backgroundColor = "var(--main-grey)";
      document.querySelector('[data-index="4"]').style.backgroundColor = "var(--main-grey)";
      document.querySelector('[data-index="7"]').style.backgroundColor = "var(--main-grey)";
   }
   if (winCondition[0] === 2 && winCondition[1] === 5 && winCondition[2] === 8) {
      document.querySelector('[data-index="2"]').style.backgroundColor = "var(--main-grey)";
      document.querySelector('[data-index="5"]').style.backgroundColor = "var(--main-grey)";
      document.querySelector('[data-index="8"]').style.backgroundColor = "var(--main-grey)";
   }
   if (winCondition[0] === 0 && winCondition[1] === 4 && winCondition[2] === 8) {
      document.querySelector('[data-index="0"]').style.backgroundColor = "var(--main-grey)";
      document.querySelector('[data-index="4"]').style.backgroundColor = "var(--main-grey)";
      document.querySelector('[data-index="8"]').style.backgroundColor = "var(--main-grey)";
   }
   if (winCondition[0] === 2 && winCondition[1] === 4 && winCondition[2] === 6) {
      document.querySelector('[data-index="2"]').style.backgroundColor = "var(--main-grey)";
      document.querySelector('[data-index="4"]').style.backgroundColor = "var(--main-grey)";
      document.querySelector('[data-index="6"]').style.backgroundColor = "var(--main-grey)";
   }
}
// function handleResultValidation() {
//    let roundWon = false;
//    for (let i = 0; i <= 7; i++) {
//       let winCondition = winningConditions[i];
//       let a = gameState[winCondition[0]];
//       let b = gameState[winCondition[1]];
//       let c = gameState[winCondition[2]];
//       if (a === "" || b === "" || c === "") {
//          continue;
//       }
//       if (a === b && b === c) {
//          roundWon = true;
//          drawLine(winningConditions[i]);
//          break;
//       }
//    }

//    if (roundWon) {
//       statusDisplay.innerHTML = winningMessage();
//       gameActive = false;
//       return;
//    }

//    let roundDraw = !gameState.includes("");
//    console.log(!gameState.includes(""));
//    if (roundDraw) {
//       statusDisplay.innerHTML = drawMessage();
//       gameActive = false;
//       return;
//    }
//    handlePlayerChange();
// }
