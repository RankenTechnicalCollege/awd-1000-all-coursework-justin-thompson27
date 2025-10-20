"use strict";

const settings = {
    get playerName() {
        return storage.getString("playerName");
    },
    set playerName(name) {
        storage.setItem("playerName", name);
    },
    get numberOfImages() {
        return storage.getInt("numberOfImages", 24);
    },
    get numberOfCards() {
        return this.numberOfImages * 2;              // cards contain 2 of each image
    },
    set numberOfCards(num) {
        storage.setItem("numberOfImages", num / 2);
    }
};