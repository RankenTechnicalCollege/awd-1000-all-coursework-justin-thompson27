"use strict";

class UI {
    #table = null;
    #name = null;
    #cells = null;

    constructor(table) {
        this.#table = table;
        // store first part of <table> element id
        const index = table.id.indexOf("_");
        this.#name = table.id.substring(0, index);
    }

    drawBoard() {
        this.#table.textContent = ""; // clear any previous game board
        this.#cells = [];             // initialize array to store <td> elements for later use

        // make copies of cols and rows arrays, add null element at beginning for header row and header column
        const boardRows = [null, ...Game.rows];
        const boardCols = [null, ...Game.cols];

        // create HTML for game board
        for (let row of boardRows) {
            const tr = document.createElement("tr");
            for (let col of boardCols) {
                const td = document.createElement("td");
                if (row == null) {              // header row
                    if (col != null) {          // not first col of header row 
                        const text = document.createTextNode(col);
                        td.appendChild(text);
                    }
                } else {                        // remaining rows
                    if (col == null) {          // header col
                        const text = document.createTextNode(row);
                        td.appendChild(text);
                    } else {                    // blank table cells - add id attribute
                        td.id = `${this.#name}-${row}${col}`; 
                        this.#cells.push(td);   // save for later
                    }
                }
                tr.appendChild(td);
            }
            this.#table.appendChild(tr);
        }
    }

    drawShip(id, ship) {
        const cell = this.#cells.find(td => td.id == `${this.#name}-${id}`);
        if (cell.textContent != "X") cell.textContent = ship.initial; 
    }

    markBoard(id, status) {
        let isNewHit = true;
        const cell = this.#cells.find(td => td.id == `${this.#name}-${id}`);

        if(status == "miss") {
            cell.textContent = "O";
            cell.classList.add("miss");
        } else {
            // determine if duplicate hit on a cell
            if (cell.textContent == "X") {
                isNewHit = false;
            } else {
                cell.textContent = "X";
                cell.classList.add("hit");
            }
        }
        return isNewHit;
    }
}