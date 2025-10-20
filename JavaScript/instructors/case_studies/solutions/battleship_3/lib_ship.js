"use strict";

class Ship {
    constructor(shipType, size) {
        this.shipType = shipType;
        this.size = size;
        this.orientation = (Math.random() < 0.5) ? "vertical" : "horizontal";
        this.startingPosition = {};
        this.hits = [];
    }
    get initial() {
        return this.shipType.substring(0, 1).toUpperCase();
    }
    get isVertical() {
        return this.orientation == "vertical";
    }
    get isSunk() {
        return this.size == this.hits.length;
    }
    saveHit(x,y) {
        // don't add hit if it's already there
        const index = this.hits.findIndex(h => h.x == x && h.y == y);
        if (index == -1) this.hits.push({x,y});  // store as object literal
    }
}

class Shot {
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }
}