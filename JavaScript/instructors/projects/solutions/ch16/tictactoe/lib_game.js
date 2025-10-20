"use strict";

class Game {
    #turnCount = null;
    #ctx = null;
    #gameBoard = null;

    constructor(canvas) {
        this.currentPlayer = "X";
        this.winner = null;

        this.#turnCount = 0;

        // get drawing context
        this.#ctx = canvas.getContext("2d");
        this.#ctx.font = "60px serif"   // set font for game marks

        // logical representation of game board
        this.#gameBoard = [
            ["","",""],
            ["","",""],
            ["","",""],
        ];

        this.#drawBoard(canvas.width, canvas.height);
    }

    #drawBoard(canvasWidth, canvasHeight) {
        // clear canvas, needed if starting a new game after finishing a game
        this.#ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        const len = 100;

        // add squares at each corner and in the middle
        this.#ctx.strokeRect(0, 0, len, len);      // upper left
        this.#ctx.strokeRect(0, 200, len, len);    // lower left
        this.#ctx.strokeRect(200, 0, len, len);    // upper right
        this.#ctx.strokeRect(200, 200, len, len);  // lower right
        this.#ctx.strokeRect(100, 100, len, len);  // middle

        // add outer border
        this.#ctx.strokeRect(0, 0, canvasWidth, canvasHeight);
    }

    #drawMark(x, y, row, col) {
        // only draw if there's no mark on the gameboard
        if (this.#gameBoard[row][col] == "") {
            // draw mark
            this.#ctx.fillText(this.currentPlayer, x, y);   

            // store mark, increment turn count, and switch player
            this.#gameBoard[row][col] = this.currentPlayer;
            this.#turnCount++;
            this.currentPlayer = (this.currentPlayer == "X") ? "O" : "X";             
        }
    }

    #isWinner(marks) {
        if (marks.every(m => m == "X") || marks.every(m => m == "O")) {
            this.winner = marks[0];  // use first mark since they all match
            return true;
        }
    }

    get isDraw() {
        return this.#turnCount == 9;
    }

    takeTurn(x, y) {
        // don't take turn if there's a winner
        if (this.winner) return; 
 
        if (x < 100 && y < 100) { 
            this.#drawMark(30, 70, 0, 0);    // top left
        } else if (x < 200 && y < 100) { 
            this.#drawMark(130, 70, 0, 1);   // top middle
        } else if (x < 300 && y < 100) { 
            this.#drawMark(230, 70, 0, 2);   // top right
        } else if (x < 100 && y < 200) { 
            this.#drawMark(30, 170, 1, 0);   // middle left
        } else if (x < 200 && y < 200) {
            this.#drawMark(130, 170, 1, 1);  // middle middle
        } else if (x < 300 && y < 200) {
            this.#drawMark(230, 170, 1, 2);  // middle right
        } else if (x < 100 && y < 300) {
            this.#drawMark(30, 270, 2, 0);   // bottom left
        } else if (x < 200 && y < 300) {
            this.#drawMark(130, 270, 2, 1);  // bottom middle
        } else if (x < 400 && y < 300) {
            this.#drawMark(230, 270, 2, 2);  // bottom right
        }
    }

    checkWinner() {
        // check rows
        for (let row of this.#gameBoard) {
            if (this.#isWinner(row)) return true;
        }
        
        // check columns
        for (let i in this.#gameBoard) {
            const column = [this.#gameBoard[0][i], this.#gameBoard[1][i], this.#gameBoard[2][i]];
            if (this.#isWinner(column)) return true;
        }

        // check top left to bottom right diagonal
        let diag = [this.#gameBoard[0][0], this.#gameBoard[1][1], this.#gameBoard[2][2]];
        if (this.#isWinner(diag)) return true;

        // check bottom left to top right diagonal
        diag = [this.#gameBoard[2][0], this.#gameBoard[1][1], this.#gameBoard[0][2]];
        if (this.#isWinner(diag)) return true;

        return false; // if we reach here then no one won the game this round
    }

}