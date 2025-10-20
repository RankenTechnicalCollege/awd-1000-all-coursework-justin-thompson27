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
    const board = getElement("#game_board");

    // make copies of rows and cols arrays
    const boardRows = rows.slice();
    const boardCols = cols.slice();
    
    // add null element at beginning for header row and header column
    boardRows.unshift(null);
    boardCols.unshift(null);

    // create HTML for game board
    for (let row of boardRows) {
        const tr = document.createElement("tr");
        for (let col of boardCols) {
            const td = document.createElement("td");
            if (row == null) {       // header row
                if (col != null) {   // not first col of header row 
                    const text = document.createTextNode(col);
                    td.appendChild(text);
                }
            } else {                 // remaining rows
                if (col == null) {   // header col
                    const text = document.createTextNode(row);
                    td.appendChild(text);
                } else {             // blank table cells - add id attribute
                    td.id = "board-" + row + col;
                }
            }
            tr.appendChild(td);
        }
        board.appendChild(tr);
    }
}

function fireCannon() {
    // get row and column <select> elements
    const rowSelect = getElement("#row_target");
    const colSelect = getElement("#column_target");

    // clear any previous error messages
    rowSelect.nextElementSibling.textContent = "";
    colSelect.nextElementSibling.textContent = "";

    // check if user selected row and column, notify if not
    let isValid = true;
    if (rowSelect.value == "-1") {
        rowSelect.nextElementSibling.textContent = "Please select a row.";
        isValid = false;
    }
    if (colSelect.value == "-1") {
        colSelect.nextElementSibling.textContent = "Please select a column.";
        isValid = false;
    }

    if (isValid) {
        const selectedRow = rowSelect.value;
        const selectedCol = colSelect.value;
        const id = "board-" + selectedRow + selectedCol;
        const colIndex = cols.indexOf(selectedCol);
        
        const cell = getElement(`#${id}`);
        switch (selectedRow) {
            case "A":
                cell.textContent = rowA[colIndex];
                break;
            case "B":
                cell.textContent = rowB[colIndex];
                break;
            case "C":
                cell.textContent = rowC[colIndex];
                break;
            case "D":
                cell.textContent = rowD[colIndex];
                break;
            case "E":
                cell.textContent = rowE[colIndex];
                break;
            case "F":
                cell.textContent = rowF[colIndex];
                break;
            case "G":
                cell.textContent = rowG[colIndex];
                break;
            case "H":
                cell.textContent = rowH[colIndex];
                break;
            case "I":
                cell.textContent = rowI[colIndex];
                break;
            case "J":
                cell.textContent = rowJ[colIndex];
                break;
        }
        
        if (cell.textContent == "X") 
            cell.classList.add("hit");
        else 
            cell.classList.add("miss");
    }
    rowSelect.focus();
}

function addOptions(select, values) {
    for (let value of values) {
        const option = document.createElement("option");
        const text = document.createTextNode(value);
        option.appendChild(text);
        select.appendChild(option);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    createGameBoard();

    // populate row and column <select> elements
    addOptions(getElement("#row_target"), rows);
    addOptions(getElement("#column_target"), cols);

    getElement("#fire").addEventListener("click", fireCannon);

    getElement("#row_target").focus();
});