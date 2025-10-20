"use strict";

class TestScores {
    #scores = null;

    constructor() {
        this.#scores = [];
    }
    add(score) {
        this.#scores.push(score);
    }
    get avg() {
        const sum = this.#scores.reduce((total, elem) => total + elem, 0);
        return sum / this.#scores.length;
    }
    toString() {
        return this.#scores.join(", ");
    }
    toSortedString() {
        const sortedScores = this.#scores.slice();  // make a copy
        return sortedScores.sort((a, b) => b - a).join(", ");
    }
    toLetterString() {
        return this.#scores.map(elem => {
            if (elem >= 90) return "A";
            else if (elem >= 80) return "B";
            else if (elem >= 70) return "C";
            else if (elem >= 60) return "D";
            else return "F";
        }).join(", ");
    }
}
