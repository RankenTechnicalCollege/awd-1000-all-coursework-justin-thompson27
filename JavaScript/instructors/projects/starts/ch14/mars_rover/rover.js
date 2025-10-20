"use strict";
const getElement = selector => document.querySelector(selector);

const domain = "https://api.nasa.gov/mars-photos/api/v1/rovers";
// for better results, sign up for an API key and replace DEMO_KEY with your key
const request = "?api_key=DEMO_KEY&page=1";


document.addEventListener("DOMContentLoaded", async () => {
    // get rover data
    

    // change event handler for Rover drop-down
    getElement("#rover").addEventListener("change", async (evt) => {
        
    });

    // click event handler for View button
    getElement("#view").addEventListener("click", async () => {
        
    });
});