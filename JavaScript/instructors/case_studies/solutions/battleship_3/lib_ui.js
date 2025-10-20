"use strict";

class UI {
    #ctx = null;
    #squareLen = null;
    #shipElement = null;  // HTML element where sunk ship pegs are displayed

    constructor(canvas) {
        this.#ctx = canvas.getContext("2d");
        this.#squareLen = canvas.width / Game.cols.length;
        
        // get HTML element in <canvas> parent node that's assigned to the "ships" CSS class
        this.#shipElement = canvas.parentNode.querySelector(".ships");
    }

    #getCenter(x, y) {
        // calculate coordinates at center of square for given x and y
        return {
            x: (y * this.#squareLen) + (this.#squareLen / 2),
            y: (x * this.#squareLen) + (this.#squareLen / 2),
        };
    }

    #drawShip(ship) {
        // set fill and stroke colors
        this.#ctx.strokeStyle = "black";
        this.#ctx.fillStyle = "grey";

        // get coordinates for center of first square
        const center = this.#getCenter(ship.startingPosition.x, ship.startingPosition.y);

        // draw
        switch(ship.initial) {
            case "A": // aircraft carrier
                if (ship.isVertical) {
                    this.#ctx.strokeRect(center.x - 20, center.y - 20, 40, (50 * ship.size) - 10);
                    this.#ctx.fillRect(center.x - 20, center.y - 20, 40, (50 * ship.size) - 10);
                } else {
                    this.#ctx.strokeRect(center.x - 20, center.y - 20, (50 * ship.size) - 10, 40);
                    this.#ctx.fillRect(center.x - 20, center.y - 20, (50 * ship.size) - 10, 40);
                }
                break;
            case "B": // battleship
                this.#ctx.beginPath();
                if (ship.isVertical) {
                    this.#ctx.arc(center.x, center.y, 20, Math.PI, Math.PI * 2);
                    this.#ctx.lineTo(center.x + 20, center.y + 170);
                    this.#ctx.lineTo(center.x - 20, center.y + 170);
                    this.#ctx.lineTo(center.x - 20, center.y);
                } else {
                    this.#ctx.arc(center.x, center.y, 20, Math.PI / 2, (Math.PI * 3) / 2);
                    this.#ctx.lineTo(center.x + 170, center.y - 20);
                    this.#ctx.lineTo(center.x + 170, center.y + 20);
                    this.#ctx.lineTo(center.x, center.y + 20);
                }
                this.#ctx.stroke();
                this.#ctx.fill();
                break;
            case "C":  // cruiser
                this.#ctx.beginPath();
                if (ship.isVertical) {
                    this.#ctx.arc(center.x, center.y, 20, Math.PI, Math.PI * 2);
                    this.#ctx.lineTo(center.x + 20, center.y + 120);
                    this.#ctx.lineTo(center.x - 20, center.y + 120)
                    this.#ctx.lineTo(center.x - 20, center.y);
                } else {
                    this.#ctx.arc(center.x, center.y, 20, Math.PI / 2, (Math.PI * 3) / 2);
                    this.#ctx.lineTo(center.x, center.y - 20);
                    this.#ctx.lineTo(center.x + 120, center.y - 20);
                    this.#ctx.lineTo(center.x + 120, center.y + 20);
                    this.#ctx.lineTo(center.x, center.y + 20);
                }
                this.#ctx.stroke();
                this.#ctx.fill();
                break;
            case "S":  // submarine
                this.#ctx.beginPath();
                if (ship.isVertical) {
                    this.#ctx.arc(center.x, center.y, 20, Math.PI, Math.PI * 2);
                    this.#ctx.lineTo(center.x + 20, center.y + 100);
                    this.#ctx.arc(center.x, center.y + 100, 20, 0, Math.PI);
                    this.#ctx.moveTo(center.x - 20, center.y + 100)
                    this.#ctx.lineTo(center.x - 20, center.y);
                } else {
                    this.#ctx.arc(center.x, center.y, 20, Math.PI / 2, (Math.PI * 3) / 2);
                    this.#ctx.lineTo(center.x, center.y - 20);
                    this.#ctx.lineTo(center.x + 100, center.y -20);
                    this.#ctx.arc(center.x + 100, center.y, 20, (Math.PI * 3) / 2, Math.PI / 2);
                    this.#ctx.moveTo(center.x + 100, center.y + 20);
                    this.#ctx.lineTo(center.x, center.y + 20);
                }
                this.#ctx.stroke();
                this.#ctx.fill();
                break;
            case "D":  // destroyer
                this.#ctx.beginPath();
                if (ship.isVertical) {
                    this.#ctx.arc(center.x, center.y, 20, Math.PI, Math.PI * 2);
                    this.#ctx.moveTo(center.x - 20, center.y);
                    this.#ctx.lineTo(center.x - 20, center.y + 70);
                    this.#ctx.lineTo(center.x + 20, center.y + 70);
                    this.#ctx.lineTo(center.x + 20, center.y);
                } else {
                    this.#ctx.arc(center.x, center.y, 20, Math.PI / 2, (Math.PI * 3) / 2);
                    this.#ctx.moveTo(center.x, center.y - 20);
                    this.#ctx.lineTo(center.x + 70, center.y - 20);
                    this.#ctx.lineTo(center.x + 70, center.y + 20);
                    this.#ctx.lineTo(center.x, center.y + 20);
                }
                this.#ctx.stroke();
                this.#ctx.fill();
                break;
        }
    }

    convertToIndex(coordinate) {
        return Math.floor(coordinate / this.#squareLen);
    }

    drawBoard(player) {
        const width = this.#ctx.canvas.width;
        const height = this.#ctx.canvas.height;

        // draw background color 
        this.#ctx.fillStyle = (player instanceof Computer) ? "black" : "blue";
        this.#ctx.fillRect(0, 0, width, height);

        // draw grid lines
        for (let i in Game.rows) {
            // vertical
            this.#ctx.strokeStyle = "white";
            this.#ctx.beginPath();
            this.#ctx.moveTo(i * this.#squareLen, 0);
            this.#ctx.lineTo(i * this.#squareLen, height);
            this.#ctx.stroke();
            // horizontal
            this.#ctx.beginPath();
            this.#ctx.moveTo(0, i * this.#squareLen);
            this.#ctx.lineTo(width, i * this.#squareLen);
            this.#ctx.stroke();
        }
    }

    drawShips(ships) {
        for (let ship of ships) {
            this.#drawShip(ship);
            // mark any hits
            for (let hit of ship.hits) {
                this.markBoard(hit.x, hit.y, "hit");
            }
        }
    }

    markBoard(x, y, status) {
        // get center of clicked square
        const center = this.#getCenter(x, y);

        // set color
        this.#ctx.fillStyle = (status == "hit") ? "red" : "white";

        // draw
        this.#ctx.beginPath();
        this.#ctx.arc(center.x, center.y, 10, 0, Math.PI * 2);
        this.#ctx.fill();
    }

    displayShipCount(ships) {
        this.#shipElement.textContent = "";  // clear previous
        const sunk = ships.filter(s => s.isSunk);
        sunk.forEach(s => {
            const span = document.createElement("span");
            span.classList.add("hit");
            this.#shipElement.appendChild(span);
        });
    }

    clearShipCount() {
        this.#shipElement.textContent = "";
    }
}