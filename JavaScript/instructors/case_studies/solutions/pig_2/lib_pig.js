"use strict";

class Pig {
	#roll = 0;
	#winningTotal = 0;

	constructor(winningTotal) {
		this.name = "";
		this.total = 0;
		this.turn = 0;

		this.#winningTotal = winningTotal;
    }
	get hasName() {
		return this.name != "";
	}
    get isBust() {
        return this.#roll == 1;
    }
	get isWinner() {
		return this.total >= this.#winningTotal;
	}
	equals(playerToCheck) {
		return this.name === playerToCheck.name;
	}
	takeTurn(roll) {
		this.#roll = roll;
		
		// update or reset the turn property based on result of die roll
		this.turn = (this.isBust) ? 0 : this.turn + this.#roll;
	}
	hold() {
		// update the game total
		this.total = this.total + this.turn; 

		// reset other properties for next turn
		this.turn = 0; 
		this.#roll = 0;
	}
	reset() {
		this.total = 0;
		this.turn = 0;
		this.#roll = 0;
	}
	
}