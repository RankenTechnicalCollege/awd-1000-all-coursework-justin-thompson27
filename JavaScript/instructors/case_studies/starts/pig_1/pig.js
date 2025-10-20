"use strict";

const getElement = selector => document.querySelector(selector);

function rollDie() {
    // return random number between 1 and 6
}

document.addEventListener("DOMContentLoaded", () => {
    // add click event handler for New Game button
    getElement("#new_game").addEventListener("click", () => {
        
    }); 
    
    // add click event handler for Roll button
    getElement("#roll").addEventListener("click", () => {
        
    }); 
    
    // add click event handler for Hold button
    getElement("#hold").addEventListener("click", () => {
        
    }); 

    // set focus on initial page load
    getElement("#player1").focus();
});