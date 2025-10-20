"use strict";

class Die {
    constructor() {}
	
	roll() {
		let random = Math.random();
		random = Math.floor(random * 6);
		return random + 1;
	}
}