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
    // on load, show correct <div> element based on user value in local storage


    getElement("#btn_logout").addEventListener("click", () => {
        
    });

    getElement("#btn_login").addEventListener("click", () => {
        
    });
});