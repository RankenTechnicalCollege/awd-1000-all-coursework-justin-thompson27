"use strict";

let startMS = 0;
let elapsedMS = 0;
let timer = null;

const getElement = selector => document.querySelector(selector);

const padNum = (value, digits = 2) => value.toString().padStart(digits, "0");

const updateDisplay = () => {
    const nowMS = new Date().getTime();
    const elapsedDate = new Date(nowMS - startMS);
    const minutes = padNum(elapsedDate.getMinutes());
    const seconds = padNum(elapsedDate.getSeconds());
    const milliseconds = padNum(elapsedDate.getMilliseconds(), 3);

    getElement("#time").textContent = `${minutes}:${seconds}:${milliseconds}`;
};

const startClick = () => {
    startMS = new Date().getTime() - elapsedMS;
    timer = setInterval(updateDisplay, 10);
}

const stopClick = () => {    
    clearInterval(timer); // stop the interval
    elapsedMS = new Date().getTime() - startMS;    // calculate elapsed time
}

const resetClick = () => {
    stopClick();
    elapsedMS = 0;
    getElement("#time").textContent = "00:00:00";
}

document.addEventListener("DOMContentLoaded", () => {
    getElement("#start").addEventListener("click", startClick);
    getElement("#stop").addEventListener("click", stopClick);
    getElement("#reset").addEventListener("click", resetClick);
});