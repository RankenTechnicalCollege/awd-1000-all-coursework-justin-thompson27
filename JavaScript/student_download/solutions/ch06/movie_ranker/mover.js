"use strict";

const getElement = selector => document.querySelector(selector); 

const getElements = selector => document.querySelectorAll(selector); 

const swapFirstTwo = () => {
    const titleElements = getElements("#movie-title");

    let firstTitle = titleElements[0].textContent;
    let secondTitle = titleElements[1].textContent;

    titleElements[0].textContent = secondTitle;
    titleElements[1].textContent = firstTitle;
}

const swapLastTwo = () => {
    const titleElements = getElements("#movie-title");

    let secondTitle = titleElements[1].textContent;
    let thirdTitle = titleElements[2].textContent;

    titleElements[1].textContent = thirdTitle;
    titleElements[2].textContent = secondTitle;
}

document.addEventListener("DOMContentLoaded", () => {
    getElement("#top_btn").addEventListener("click", swapFirstTwo);
    getElement("#up_btn").addEventListener("click", swapFirstTwo);
    getElement("#down_btn").addEventListener("click", swapLastTwo);
    getElement("#bottom_btn").addEventListener("click", swapLastTwo);     
});