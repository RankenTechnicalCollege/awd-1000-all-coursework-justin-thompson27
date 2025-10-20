"use strict";

const storage = {
    getString(key, defaultValue = "") {
        return localStorage.getItem(key) ?? defaultValue;
    },
    getInt(key, defaultValue = 0) {
        return parseInt(this.getString(key, defaultValue));
    },
    setItem(key, value) {
        localStorage.setItem(key, value);
    }
};
