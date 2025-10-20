"use strict";

const getElement = selector => document.querySelector(selector);

let player1Name  = "";
let player1Total = 0;
let player2Name  = "";
let player2Total = 0;
let currentPlayer = "";
let currentScore = 0;
let turnNumber = 0;

function resetGame() {
    player1Total = 0;
    player2Total = 0;
    turnNumber = 0;
    // clear any previous data from the page
    getElement("#score1").value = "0";  
    getElement("#score2").value = "0";
    getElement("#message").textContent = "";
    getElement("#die").value = "0";
    getElement("#total").value = "0";
    getElement("#turn").classList.add("hide");
}

function switchPlayers() {
    let isWinner = false;

    if (currentPlayer == player1Name) {
        player1Total += currentScore;
        getElement("#score1").value = player1Total;
        if (player1Total >= 30) {
            isWinner = true;
        } else {
            currentPlayer = player2Name;
        }
    } else {
        player2Total += currentScore;
        getElement("#score2").value = player2Total;
        if (player2Total >= 30) {
            isWinner = true;
        } else {
            currentPlayer = player1Name;
        }
    }

    if (isWinner) {
        getElement("#message").textContent = currentPlayer + " WINS!";
        getElement("#turn").classList.add("hide");
        getElement("#new_game").focus();
    } else {
        currentScore = 0;
        getElement("#total").value = currentScore;
        getElement("#current").textContent = currentPlayer;
    }
}

function rollDie() {
    let random = Math.random();
    random = Math.floor(random * 6);
	return random + 1;
}

document.addEventListener("DOMContentLoaded", () => {
    getElement("#new_game").addEventListener("click", () => {
        resetGame();

        player1Name = getElement("#player1").value;
        player2Name = getElement("#player2").value;

        if (player1Name === "" || player2Name === "") {
            getElement("#message").textContent = "Invalid name(s)";
            getElement("#player1").focus();
        } else {
            getElement("#turn").classList.remove("hide");  
            currentPlayer = player1Name;
            getElement("#current").textContent = currentPlayer;
            getElement("#roll").focus();
        }
    }); 
    
    getElement("#roll").addEventListener("click", () => {
        let die = rollDie();
        getElement("#die").value = die;

        if (die == 1) {
            currentScore = 0;
            switchPlayers();
        } else {
            currentScore += die;
            getElement("#total").value = currentScore;
        }
        
        getElement("#roll").focus(); 
    }); 
    
    getElement("#hold").addEventListener("click", () => {
        getElement("#die").value = 0;
        switchPlayers();
        getElement("#roll").focus(); 
    }); 

    // set focus on initial page load
    getElement("#player1").focus();
});