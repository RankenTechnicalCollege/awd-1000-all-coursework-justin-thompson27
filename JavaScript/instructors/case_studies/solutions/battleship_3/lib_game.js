"use strict";

class Game {
    // static accessors
    static get cols() {
        return ["1","2","3","4","5","6","7","8","9","10"];
    }
    static get rows() {
        return ["A","B","C","D","E","F","G","H","I","J"];
    }

    // private properties 
    #user = null;
    #computer = null;
    #hasWinner = false;

    constructor(userBoard, computerBoard) {
        this.#user = new Player(new UI(userBoard));
        this.#computer = new Computer(new UI(computerBoard));
        this.#start();
        this.message = "";
    }

    // private methods
    #start() {
        this.#computer.displayGameBoard();
        this.#user.displayGameBoard();
        this.#user.showShips();              // show user's ships when game starts
    }

    #checkResult(player) {
        const ship = player.lastHit;
        if (ship) {
            const result = ship.isSunk ? "sunk" : "hit";
            this.message = (player instanceof Computer) ?
                `You ${result} computer's ${ship.shipType}` : 
                `Computer ${result} your ${ship.shipType}`;

            if (player.shipsRemaining == 0) {
                this.#hasWinner = true;
                this.#computer.showShips();   // show computer's ships when game is over
            }
        } else {
            this.message = (player instanceof Computer) ? "You missed" : "Computer missed";
        }
    }

    // public accessor (read-only)
    get hasWinner() {
        return this.#hasWinner;
    }

    // public methods
    reset() {
        this.#user.reset();
        this.#computer.reset();
        this.#start();        
    }

    takeUserTurn(row, col) {
        this.#computer.incoming = this.#user.fireCannon(row, col);
        this.#checkResult(this.#computer);
    }

    takeComputerTurn() {
        this.#user.incoming = this.#computer.fireCannon();
        this.#checkResult(this.#user);
    }
}