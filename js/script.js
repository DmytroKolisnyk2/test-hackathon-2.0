import * as functions from "./functions.js";
localStorage.setItem('test', 1);
functions.drawTable();
document.querySelector(".content__reset").addEventListener("click", () => {
   functions.drawTable();
   localStorage.clear();
});
