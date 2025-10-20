"use strict";

const getElement = selector => document.querySelector(selector);

const cols = ["1","2","3","4","5","6","7","8","9","10"];
const rows = ["A","B","C","D","E","F","G","H","I","J"];

// logical representation of game board.
// X's represent placement of ships.
const rowA = ["X","X","X","X","X","O","O","O","O","O"];
const rowB = ["O","O","O","O","O","O","O","O","O","O"];
const rowC = ["O","O","O","O","O","O","O","X","O","O"];
const rowD = ["O","O","O","O","O","O","O","X","O","O"];
const rowE = ["X","X","X","X","O","O","O","O","O","O"];
const rowF = ["O","O","O","O","O","O","O","O","O","O"];
const rowG = ["O","O","O","O","O","O","X","O","O","O"];
const rowH = ["O","O","O","O","O","O","X","O","O","O"];
const rowI = ["O","X","X","X","O","O","X","O","O","O"];
const rowJ = ["O","O","O","O","O","O","X","O","O","O"];

function createGameBoard() {
}

function fireCannon() {
}

document.addEventListener("DOMContentLoaded", () => {
});