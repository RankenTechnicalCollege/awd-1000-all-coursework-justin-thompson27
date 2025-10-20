"use strict";

class Ship {
    constructor(shipType, size) {
        this.shipType = shipType;
        this.size = size;
        this.orientation = (Math.random() < 0.5) ? "vertical" : "horizontal";
    }
    get initial() {
        return this.shipType.substring(0, 1).toUpperCase();
    }
    get isVertical() {
        return this.orientation == "vertical";
    }
}

class Shot {
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }
}