"use strict";

const getElement = selector => document.querySelector(selector);

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// set starting colors
let squareColor = "red";
let borderWidth = 3;
let textColor = "black";

// set size of squares and calculate number of squares
const len = 40;
const squaresPerRow = canvas.width / len;
const squaresPerColumn = canvas.height / len;

// set radio buttons to starting values
const setDefaults = elems => {
    for (let elem of elems) {
        if (elem.name == "square_color" && elem.value == squareColor) {
            elem.checked = true;
        } else if (elem.name == "border_width" && elem.value == borderWidth) {
            elem.checked = true;
        } else if (elem.name == "text_color" && elem.value == textColor) {
            elem.checked = true;
        }
    }
};

// draw logo
const drawLogo = () => {

    // set hex value for white squares
    const white = "#ffffff"; // hex value for white

    // set fill color for first square to selected color
    ctx.fillStyle = squareColor;

    // draw squares
    for (let x = 0; x < squaresPerRow; x++) {
        for (let y = 0; y < squaresPerColumn; y++) {  
            // draw square 
            ctx.fillRect(len * x, len * y, len, len);
            // set color for next square
            ctx.fillStyle = (ctx.fillStyle == white) ? squareColor : white;
        }
    }

    // set border width and draw border
    ctx.lineWidth = borderWidth;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // set text fill color, line width, and font
    ctx.fillStyle = textColor;
    ctx.lineWidth = 1;
    ctx.font = "bold 60px sans-serif";

    // draw restaurant name
    ctx.fillText("Pizza Bella", 164, 79);
    ctx.strokeText("Pizza Bella", 164, 79);    
};

document.addEventListener("DOMContentLoaded", () => {

    // event handlers for click event of radio buttons
    const elems = document.querySelectorAll('input[type="radio"]');
    for (let elem of elems) {
        elem.addEventListener("click", evt => {
            // change selected color and re-draw logo on click
            const current = evt.currentTarget;
            if (current.name == "square_color") {
                squareColor = current.value;
            } else if (current.name == "border_width") {
                borderWidth = current.value;
            } else if (current.name == "text_color") {
                textColor = current.value;
            }
            // draw logo
            drawLogo();
        });
    }

    // set defaults and draw logo on load
    setDefaults(elems);
    drawLogo();
});