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

    constructor(userBoard, computerBoard) {
        this.#user = new Player(new UI(userBoard));
        this.#computer = new Computer(new UI(computerBoard));
        this.#start();
    }

    // private methods
    #start() {
        this.#computer.displayGameBoard();
        this.#user.displayGameBoard();
        this.#user.showShips();          // show user's ships when game starts
    }

    #isAllSunk(player) {
        if(player.isAllSunk) {
            this.#computer.showShips();  // show computer's ships when game is over
            return true;
        } else {
            return false;
        }
    }

    // public accessors (read-only)
    get userWins() {
        return this.#isAllSunk(this.#computer);
    }

    get computerWins() {
        return this.#isAllSunk(this.#user);
    }

    // public methods
    reset() {
        this.#user.reset();
        this.#computer.reset();
        this.#start();        
    }

    takeUserTurn(row, col) {
        this.#computer.incoming = this.#user.fireCannon(row, col);
    }

    takeComputerTurn() {
        this.#user.incoming = this.#computer.fireCannon();
    }
}