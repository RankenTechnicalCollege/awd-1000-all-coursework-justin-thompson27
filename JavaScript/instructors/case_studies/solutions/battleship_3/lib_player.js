"use strict";

// superclass
class Player {
    // private properties
    #ships = null;
    #gameBoard = null;
    #ui = null;
    #lastHit = null;

    constructor(ui) {
        this.#ui = ui;

        // initialize ships
        this.#createShips();
        
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
            let x = null;
            let y = null;

            while (!placed) {
                // generate random x and y coordinates - adjust by ship size as needed 
                // to make sure ship doesn't run off the board
                const xMultiple = (ship.isVertical) ? 10 - ship.size : 10;
                const yMultiple = (ship.isVertical) ? 10 : 10 - ship.size;
                x = Math.floor(Math.random() * xMultiple);
                y = Math.floor(Math.random() * yMultiple);

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
            // save ship starting position 
            ship.startingPosition = {x, y};  // save as object literal
        }
    }

    // public accessors
    get shipsRemaining() {            // read-only
        return this.#ships.filter(s => !s.isSunk).length;
    }

    get lastHit() {                   // read-only
        return this.#lastHit;
    }

    set incoming(shot) {              // write-only
        const x = shot.col;
        const y = shot.row;
        const shipIndex = this.#gameBoard[x][y];

        if(shipIndex == -1) {
            this.#ui.markBoard(x, y, "miss");
            this.#lastHit = null;
        } else {
            this.#ui.markBoard(x, y, "hit");
            const ship = this.#ships[shipIndex];
            ship.saveHit(x, y);
            this.#lastHit = ship;
        }
        this.#ui.displayShipCount(this.#ships);
    }

    // public methods
    displayGameBoard() {
        this.#ui.drawBoard(this);
    }

    fireCannon(row, col) {
        // convert coordinates to indexes before firing
        return new Shot(this.#ui.convertToIndex(row), this.#ui.convertToIndex(col));
    }

    showShips() {
        this.#ui.drawShips(this.#ships);
    }

    reset() {
        this.#createShips();
        this.#createEmptyGameBoard();
        this.#placeShips();
        this.#ui.clearShipCount();
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