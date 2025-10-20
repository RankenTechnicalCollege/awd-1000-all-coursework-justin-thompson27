"use strict";

// superclass
class Player {
    // private properties
    #ships = null;
    #hitsLeft = null;
    #gameBoard = null;
    #ui = null;

    constructor(ui) {
        this.#ui = ui;

        // initialize ships
        this.#createShips();
        this.#hitsLeft = this.#ships.reduce((total, curr) => total + curr.size, 0);

        // initialize game board
        this.#createEmptyGameBoard();
        this.#placeShips();
    }

    // private methods
    #createShips() {
        this.#ships = [];
        this.#ships.push(new Ship("Aircraft carrier", 5));
        this.#ships.push(new Ship("Battleship", 4));
        this.#ships.push(new Ship("Cruiser", 3));
        this.#ships.push(new Ship("Submarine", 3));
        this.#ships.push(new Ship("Destroyer", 2));
    }

    #createEmptyGameBoard() {
        this.#gameBoard = [];
        for (let r in Game.rows) {
            const row = Game.cols.map(elem => -1);  // return -1 for each element in cols array
            this.#gameBoard.push(row);
        }
    }
    
    #placeShips() {
        // randomly place ships based on vertical or horizontal orientation
        for (let shipIndex in this.#ships) {
            const ship = this.#ships[shipIndex];
            let placed = false;

            while (!placed) {
                // generate random x and y coordinates - adjust by ship size as needed 
                // to make sure ship doesn't run off the board
                const xMultiple = (ship.isVertical) ? 10 - ship.size : 10;
                const yMultiple = (ship.isVertical) ? 10 : 10 - ship.size;
                const x = Math.floor(Math.random() * xMultiple);
                const y = Math.floor(Math.random() * yMultiple);

                // make sure that there isn't already a ship where we want to place
                let isOpen = true;
                for (let i = 0; i < ship.size; i++) {
                    const r = (ship.isVertical) ? x + i : x;    
                    const c = (ship.isVertical) ? y : y + i;    
                    if (this.#gameBoard[r][c] != -1) {
                        isOpen = false;
                        break;    // don't need to finish the loop - we know there's a ship here
                    }
                }

                // place the ship by adding the ship index to the grid locations that it occupies
                if (isOpen) {
                    for (let i = 0; i < ship.size; i++) {
                        const r = (ship.isVertical) ? x + i : x;
                        const c = (ship.isVertical) ? y : y + i;
                        this.#gameBoard[r][c] = shipIndex;
                    }
                    placed = true;
                }
            }
        }
    }

    // public accessors
    get isAllSunk() {                 // read-only
        return this.#hitsLeft == 0;
    }

    set incoming(shot) {              // write-only
        const id = Game.rows[shot.row] + Game.cols[shot.col];

        if(this.#gameBoard[shot.row][shot.col] == -1) {
            this.#ui.markBoard(id, "miss");
        } else {
            // checks if duplicate hit - don't update hit count if so
            if (this.#ui.markBoard(id, "hit")) {
                this.#hitsLeft--;
            }
        }
    }

    // public methods
    displayGameBoard() {
        this.#ui.drawBoard();
    }

    fireCannon(row, col) {
        return new Shot(row, col);
    }

    showShips() {
        // for each cell of the gameboard...
        for(let r in Game.rows) {
            for(let c in Game.cols) {

                const shipIndex = this.#gameBoard[r][c];
                const ship = this.#ships[shipIndex];

                if (ship) {  
                    const id = Game.rows[r] + Game.cols[c];
                    this.#ui.drawShip(id, ship);
                }
            }
        }
    }

    reset() {
        this.#createEmptyGameBoard();
        this.#placeShips();
    }
}

// subclass
class Computer extends Player {
    // private property
    #shots;

    constructor(type, board) {
        super(type, board);  // call superclass constructor
        this.#populateShots();
    }

    // private method
    #populateShots() {
        this.#shots = [];

        // add a shot for each cell of the gameboard
        for (let r in Game.rows) {
            for (let c in Game.cols) {
                this.#shots.push(new Shot(r, c));
            }
        }

        // randomly shuffle the shots array several times
        this.#shots.sort(() => Math.random() - 0.5 );
        this.#shots.sort(() => Math.random() - 0.5 );
        this.#shots.sort(() => Math.random() - 0.5 );
        this.#shots.sort(() => Math.random() - 0.5 );
    }
   
    // public method - overwrites superclass method
    fireCannon() {
        return this.#shots.pop();
    }
}