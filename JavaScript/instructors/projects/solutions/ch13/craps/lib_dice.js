export class Die {
    #value = 0;

    get value() {
        return this.#value;
    }

    roll() {
        this.#value = Math.floor(Math.random() * 6) + 1;
    }
}

export class Dice {
    #dice = null;

    constructor(numberOfDice) {
        this.#dice = [];
        for (let i = 0; i < numberOfDice; i++) {
            this.#dice.push(new Die());
        }
    }

    get total() {
        return this.#dice.reduce((total, die) => total + die.value, 0);
    }

    rollAll() {
        this.#dice.forEach(die => die.roll());
    }
}