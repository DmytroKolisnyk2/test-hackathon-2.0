const state = {};
state.move = 1;
state.playerMoveRef = document.querySelector(".game__player-move--js");
export const startGame = (event) => {
   if (event.target.classList.contains("table") || event.target.classList.contains("table__cell--cross") || event.target.classList.contains("table__cell--zero")) return;
   if (+state.move === 9) setTimeout(() => alert("draw"), 500);
   if (state.move % 2 === 1) {
      state.move++;
      state.playerMoveRef.textContent = 1;
      event.target.classList.add("table__cell--cross");
   } else {
      state.playerMoveRef.textContent = 2;
      state.move++;
      event.target.classList.add("table__cell--zero");
   }
};
state.string = '<li class="table__cell"></li>';
state.tableRef = document.querySelector(".table");

export const drawTable = () => {
   state.tableRef.innerHTML = "";
   for (let i = 0; i < 9; i += 1) {
      state.tableRef.insertAdjacentHTML("beforeend", state.string);
   }
   state.tableRef.addEventListener("click", startGame);
};
