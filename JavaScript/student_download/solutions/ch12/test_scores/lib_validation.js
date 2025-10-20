"use strict";

const validation = {
    isNumeric(value) {
        return !isNaN(value);
    },
    isInRange(value, min, max) {
        return this.isNumeric(value) && value >= min && value <= max;
    }
}