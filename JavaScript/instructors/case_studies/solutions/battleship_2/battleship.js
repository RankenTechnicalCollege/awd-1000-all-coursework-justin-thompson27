"use strict";
const getElement = selector => document.querySelector(selector);

function addOptions(select, values) {
    for (let i in values) {
        const option = document.createElement("option");
        option.value = i;

        const text = document.createTextNode(values[i]);
        option.appendChild(text);

        select.appendChild(option);
    }
}

function isValidSelection(rowSelect, colSelect) {
    // clear previous messages
    rowSelect.nextElementSibling.textContent = "";
    colSelect.nextElementSibling.textContent = "";

    let isValid = true;
    if (rowSelect.value == "-1") {
        rowSelect.nextElementSibling.textContent = "Please select a row.";
        isValid = false;
    }
    if (colSelect.value == "-1") {
        colSelect.nextElementSibling.textContent = "Please select a column.";
        isValid = false;
    }
    return isValid;
}

function switchUser(message, isStart = false) {
    getElement("#message").textContent = message;

    if (isStart)
        getElement("#controls").classList.remove("hide");
    else
        getElement("#controls").classList.toggle("hide");

    getElement("#row_target").focus();
}

document.addEventListener("DOMContentLoaded", () => {
    // get column and row <select> elements
    const rowSelect = getElement("#row_target");
    const colSelect = getElement("#column_target");

    // populate <select> elements
    addOptions(rowSelect, Game.rows);
    addOptions(colSelect, Game.cols);

    // create Game object 
    const game = new Game(getElement("#user_board"), getElement("#computer_board"));

    // add event handler for Fire button
    getElement("#fire").addEventListener("click", () => {
        if (isValidSelection(colSelect, rowSelect)) {
            // user's turn
            game.takeUserTurn(rowSelect.value, colSelect.value);
            if (game.userWins) {
                getElement("#message").textContent = "You WIN!";
            } else {
                // computer's turn - delay 1 second before firing
                switchUser("Computer's turn");
                setTimeout(() => {
                    game.takeComputerTurn();
                    if (game.computerWins) {
                        getElement("#message").textContent = "Computer wins";
                    } else {
                        switchUser("Your turn");
                    }                   
                }, 1000);
            }
        }
        rowSelect.focus();
    });

    // add event handler for New Game button 
    getElement("#new_game").addEventListener("click", () => {
        game.reset();
        switchUser("Your turn", true);
        rowSelect.value = -1;
        colSelect.value = -1;
        rowSelect.focus();
    });

    // set focus on first <select> element on load
    rowSelect.focus();
});