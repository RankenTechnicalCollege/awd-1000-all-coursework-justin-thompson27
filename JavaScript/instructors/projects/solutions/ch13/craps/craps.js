import game from 'craps';

const getElement = selector => document.querySelector(selector);

document.addEventListener("DOMContentLoaded", () => {
    
    getElement("#roll").addEventListener("click", () => {
        const isGameOver = game.roll();
        if (isGameOver) {
            getElement("#message").textContent = game.displayMessage;
            getElement("#roll").disabled = true;
            getElement("#new_game").disabled = false;
        }
        getElement("#point").textContent = game.point;
        getElement("#current_roll").textContent = game.diceValue;
    });

    getElement("#new_game").addEventListener("click", () => {
        game.reset();
        getElement("#roll").disabled = false;
        getElement("#new_game").disabled = true;
        getElement("#point").textContent = "0";
        getElement("#current_roll").textContent = "0";
        getElement("#message").textContent = "";
    });

}); 