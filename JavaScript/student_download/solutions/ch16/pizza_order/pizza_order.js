"use strict";

const getElement = selector => document.querySelector(selector);

const drawLogo = () => {
    const canvasLogo = getElement("canvas");
    const ctx = canvasLogo.getContext("2d");

    // set size of squares and calculate number of squares
    const len = 40;
    const squaresPerRow = canvasLogo.width / len;
    const squaresPerColumn = canvasLogo.height / len;
    
    // set hex value for  squares
    const red = "#ff0000";   // hex value for red
    const white = "#ffffff"; // hex value for white

    // set fill color for first square to red
    ctx.fillStyle = red;

    // draw squares
    for (let x = 0; x < squaresPerRow; x++) {
        for (let y = 0; y < squaresPerColumn; y ++) {   
            // draw square
            ctx.fillRect(len * x, len * y, len, len);
            // set color for next square
            ctx.fillStyle = (ctx.fillStyle == white) ? red : white;
        }
    }

    // add red outer border
    ctx.strokeStyle = "red";
    ctx.strokeRect(0, 0, canvasLogo.width, canvasLogo.height);

    // add restaurant name - chartreuse with black border
    ctx.font = "bold 60px sans-serif";
    ctx.fillStyle = "chartreuse";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    const x = 85;
    const y = 80;
    ctx.fillText("Pizza Bella", x, y);
    ctx.strokeText("Pizza Bella", x, y);
};

// drag/drop methods
const dragStart = evt => {
    evt.dataTransfer.setData("topping", evt.currentTarget.id);
};

const dragOver = evt => {
    evt.preventDefault();  // default is to not allow drag
};  

const drop = evt => {
    evt.preventDefault();  // default is to not allow drop
    const id = evt.dataTransfer.getData("topping");
    const ul = evt.currentTarget.querySelector("ul");
    const li = document.querySelector("#" + id);
    ul.appendChild(li);
};

document.addEventListener("DOMContentLoaded", () => {
    drawLogo();

    // get <div> elements 
    const toppings = getElement("#toppings");
    const order = getElement("#order");

    // add dragstart event handler for each li 
    // element in toppings div
    const items = toppings.querySelectorAll("li");
    for (let li of items) {
        li.draggable = true;
        li.addEventListener("dragstart", dragStart);
    }

    // make order <div> a drop target
    order.addEventListener("dragover", dragOver);  
    order.addEventListener("drop", drop);

    // make toppings <div> a drop target so can drag items back
    toppings.addEventListener("dragover", dragOver);  
    toppings.addEventListener("drop", drop);

    // save button click event handler
    getElement("#submit_order").addEventListener("click", () => {
        let msg = "Your pizza with ";

        const selectedItems = order.querySelectorAll("li");
        if (selectedItems.length == 0) {
            msg += "cheese only"
        } else {
            for (let li of selectedItems) {
                msg += li.textContent + ", ";
            }
            msg = msg.slice(0, - 2);  // remove last comma and space
        }
        alert(msg + " is on its way!");
    });
});

