"use strict";
const getElement = selector => document.querySelector(selector);

const showLoginDiv = () => {
    getElement("#login").classList.remove("hide");
    getElement("#user").focus();
}
const hideLoginDiv = () => {
    getElement("#login").classList.add("hide");
    getElement("#user").value = "";
    getElement("#message").textContent = "";
}

const showLogoutDiv = () => {
    getElement("#logout").classList.remove("hide");
    getElement("#btn_logout").focus();
}
const hideLogoutDiv = () => {
    getElement("#logout").classList.add("hide");
    getElement("#name").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.user) {
        hideLoginDiv();
        showLogoutDiv();
        getElement("#name").textContent = localStorage.user;
    } else {
        showLoginDiv();
        hideLogoutDiv();
    }

    getElement("#btn_logout").addEventListener("click", () => {
        localStorage.removeItem("user");
        showLoginDiv();
        hideLogoutDiv();
    });

    getElement("#btn_login").addEventListener("click", () => {
        const user = getElement("#user").value;
        if (user) {
            localStorage.user = user;
            hideLoginDiv();
            showLogoutDiv();
            getElement("#name").textContent = user;
        } else {
            getElement("#message").textContent = "Please enter a user name.";
            getElement("#user").focus();
        }
    });
});