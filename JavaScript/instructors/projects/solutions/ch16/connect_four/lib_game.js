"use strict";

class Game {
    #ctx = null;
    #gameBoard = null;

    constructor(canvas, gamePiece) {
        this.gamePiece = gamePiece;
        this.winner = null;

        this.#ctx = canvas.getContext("2d");

        // logical representation of game board 
        this.#gameBoard = [
            ["","","","","","",""],
            ["","","","","","",""],
            ["","","","","","",""],
            ["","","","","","",""],
            ["","","","","","",""],
            ["","","","","","",""]
        ];

        this.#drawBoard(canvas.width, canvas.height);
    }

    #drawBoard(canvasWidth, canvasHeight) {
        this.#ctx.beginPath(); 

        // draw blue board
        this.#ctx.fillStyle = "blue";
        this.#ctx.strokeRect(0, 30, canvasWidth, canvasHeight);
        this.#ctx.fillRect(0, 30, canvasWidth, canvasHeight);

        // draw empty circles
        for (let y in this.#gameBoard) {         // outer array represents y axis 
            for (let x in this.#gameBoard[y]) {  // inner arrays represent x axis 
                this.#ctx.moveTo((x*100)+50, (y*100)+90); 
                this.#ctx.arc((x*100)+50, (y*100)+90, 40, 0, Math.PI*2)
                this.#ctx.fillStyle = "white";
                this.#ctx.stroke();
                this.#ctx.fill();
            }
        }

        // draw tabs at top of board
        for (let x = 0; x <= this.#gameBoard[0].length; x++) {  // use first inner array to represent columns.
            this.#ctx.beginPath();                              // use <= comparison so loop executes one more
            this.#ctx.fillStyle = "blue";                       // time than length of array to draw final tab

            this.#ctx.moveTo((x*100)-10, 20); 
            this.#ctx.fillRect((x*100)-10, 20, 20, 10);
        }
    }

    #addToColumn(col) {
        // get index of lowest row that has an empty circle
        let row = -1;
        for (let i = this.#gameBoard.length - 1; i >= 0 ; i--) {  // start loop at end of array and decrement
            if (this.#gameBoard[i][col] == "") {
                row = i;
                break;
            }
        }
   
        // don't add if column is full
        if (row == -1) return;

        // store color 
        this.#gameBoard[row][col] = this.gamePiece.color;

        // draw color on gameboard and redraw game piece
        this.#ctx.fillStyle = this.gamePiece.color;
        this.#ctx.beginPath();
        this.#ctx.moveTo((col*100)+50, (row*100)+90); 
        this.#ctx.arc((col*100)+50, (row*100)+90, 40, 0, Math.PI*2)
        this.#ctx.stroke();
        this.#ctx.fill();

        this.gamePiece.redraw();
    }

    #isWinner(state, row, col) {
        if (state.color == this.#gameBoard[row][col] && state.color != "") {
            state.count++;
            if (state.count == 4) {
                this.winner = state.color;
                return true;
            }
        } else {  // no match - store current color and reset count
            state.color = this.#gameBoard[row][col];
            state.count = (state.color == "") ? 0 : 1;
            return false;
        }
    }
    #isLeftToRightWinner(state, row, col, firstRow) {
        // both row and column indexes increase by one
        while (row < this.#gameBoard.length && col < firstRow.length) {
            if (this.#isWinner(state, row, col)) return true;
            col++;
            row++;
        }
        return false; // no winner in diagonal
    }
    #isRightToLeftWinner(state, row, col) {
        // row index increases, column index decreases
        while (row < this.#gameBoard.length && col >= 0) {
            if (this.#isWinner(state, row, col)) return true;
            col--;
            row++;
        }
        return false; // no winner in diagonal
    }

    takeTurn(x) {
        // don't take turn if there's a winner or it's a draw
        if (this.winner || this.isDraw) return;

        if (x < 100) {
            this.#addToColumn(0);
        } else if (x < 200) {
            this.#addToColumn(1);
        } else if (x < 300) {
            this.#addToColumn(2);
        } else if (x < 400) {
            this.#addToColumn(3);
        } else if (x < 500) {
            this.#addToColumn(4);
        } else if (x < 600) {
            this.#addToColumn(5);
        } else if (x < 700) {
            this.#addToColumn(6);
        } 
    }

    get isDraw() {
        // tally unfilled circles 
        const unfilled = this.#gameBoard.reduce((total, curr) => 
            total + curr.filter(c => c == "").length
        , 0);

        return unfilled == 0; // returns true if no unfilled circles, false otherwise
    }

    checkWinner() {
        let state = null; 

        // check rows
        for (let row in this.#gameBoard) {                        // loop rows
            state = {count: 0, color: ""};  
            for (let col in this.#gameBoard[row]) {               // loop columns
                if (this.#isWinner(state, row, col)) return true;
            }
        }
   
        // check columns
        for (let col in this.#gameBoard[0]) {                    // loop columns
            state = {count: 0, color: ""};  
            for (let row in this.#gameBoard) {                   // loop rows
                if (this.#isWinner(state, row, col)) return true;
            }
        }

        // values for diagonal checks
        const firstRow = this.#gameBoard[0];
        const firstColumn = this.#gameBoard.map(r => r[0]);       // get first element of each row
        const lastColumn = this.#gameBoard.map(r => r.at(-1));    // get last element of each row
        let rowIndex = 0;
        let colIndex = 0;

        // check left to right diagonals - loop first row and first column
        for (let i in firstRow) {
            state = {count: 0, color: ""};  
            rowIndex = 0;                       
            colIndex = parseInt(i); 
            if (this.#isLeftToRightWinner(state, rowIndex, colIndex, firstRow)) return true;            
        }
        for (let i in firstColumn) { 
            if (i == 0) continue;  // skip first element - it's in firstRow, so diagonal has been checked 
            state = {count: 0, color: ""};
            rowIndex = parseInt(i);             
            colIndex = 0;      
            if (this.#isLeftToRightWinner(state, rowIndex, colIndex, firstRow)) return true;
        }
        
        // check right to left diagonals - loop first row (from end) and last column
        for (let i = firstRow.length - 1; i >= 0; i--) {
            state = {count: 0, color: ""};  
            rowIndex = 0;
            colIndex = i;
            if (this.#isRightToLeftWinner(state, rowIndex, colIndex)) return true;
        }
        for (let i in lastColumn) {  
            if (i == 0) continue;  // skip first element - it's in firstRow, so diagonal has been checked 
            state = {count: 0, color: ""};  
            rowIndex = parseInt(i);
            colIndex = firstRow.length - 1;
            if (this.#isRightToLeftWinner(state, rowIndex, colIndex)) return true;
        }

        // no winner
        return false;
    }
}