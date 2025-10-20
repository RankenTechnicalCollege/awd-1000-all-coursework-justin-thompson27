"use strict";
const getElement = selector => document.querySelector(selector);

document.addEventListener("DOMContentLoaded", () => {
    // create Game object 
    const game = new Game(getElement("#user_board"), getElement("#computer_board"));

    // add event handler for computer board click event
    getElement("#computer_board").addEventListener("click", evt => {
        // user's turn
        game.takeUserTurn(evt.offsetX, evt.offsetY);
        getElement("#result_message").textContent = game.message;
        if (game.hasWinner) {
            getElement("#turn_message").textContent = "You WIN!";
        } else {
            // computer's turn - delay 1 second before firing
            getElement("#turn_message").textContent = "Computer's turn";
            setTimeout(() => {
                game.takeComputerTurn();
                getElement("#result_message").textContent = game.message;
                if (game.hasWinner) {
                    getElement("#turn_message").textContent = "Computer wins";
                } else {
                    // get ready for user's next turn
                    getElement("#turn_message").textContent = "Your turn";
                }                   
            }, 1000);
        }
    });

    // add event handler for New Game button 
    getElement("#new_game").addEventListener("click", () => {
        game.reset();
        getElement("#turn_message").textContent = "Your turn";
        getElement("#result_message").textContent = "Select a target";
    });
});