import {Dice} from 'dice';

// private
const dice = new Dice(2);

let point = 0;
let displayMessage = "";
let isComeOutRoll = true;
let isGameOver = false;

// public
export default {
    get point() {
        return point;
    },
    get diceValue() {
        return dice.total;
    },
    get displayMessage() {
        return displayMessage;
    },
    reset() {
        point = 0;
        displayMessage = "";
        isComeOutRoll = true;
        isGameOver = false;
    },
    roll() {
        dice.rollAll();
        const value = dice.total;

        if (isComeOutRoll) {
            if (value < 4 || value == 7 || value > 10) {
                isGameOver = true;
                displayMessage = `You rolled ${value} on the come out roll - `;
                if (value == 7 || value == 11) {
                    displayMessage +=  "you win!";
                }
                else if (value == 2 || value == 3 || value == 12) {
                    displayMessage += "you lose.";
                }
            } else {
                // set point and come out roll flag for next roll
                point = value;  
                isComeOutRoll = false;
            }
        } 
        else {  // not come out roll
            if (value == point || value == 7) {
                isGameOver = true;
                if (value == point) {
                    displayMessage = "You rolled the point - you win!";
                }
                else if (value == 7) {
                    displayMessage = "You rolled 7 - you lose.";
                }
            }
        }
        // return value of game over flag to calling code
        return isGameOver;
    }
};