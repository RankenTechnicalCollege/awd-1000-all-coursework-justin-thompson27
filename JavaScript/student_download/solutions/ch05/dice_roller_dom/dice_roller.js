"use strict";

const rollDie = (sides) => {
    let rollValue = Math.random() * sides;
    rollValue = Math.ceil(rollValue);
    return rollValue;
}

const rollDice = (numDice, sides = 6) => {
    const dice = [];
    for (let i = 0; i < numDice; i++) {
        const rollValue = rollDie(sides);
        dice.push(rollValue);
    }
    return dice;
}

const rollButtonClick = () => {
    let sides = parseInt(document.querySelector("#sides").value);
    const numDice = parseInt(document.querySelector("#num_dice").value);

    if (isNaN(sides)) {
        sides = 6;
        document.querySelector("#sides").value = 6;
    }

    let dice = rollDice(numDice, sides);

    document.querySelector("#message").textContent = 
        "Dice: " + dice.join(" ");
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#roll_button").addEventListener(
        "click", rollButtonClick);
})