"use strict"

const imagePaths = ["images/bison.jpg","images/deer.jpg","images/hero.jpg","images/release.jpg"]

document.addEventListener("DOMContentLoaded", () => {
    const imageElements = document.querySelectorAll("img");
    
    document.querySelector("#left_button").addEventListener("click", evt => {
        // shift the items in the array to the left
        let firstLink = imagePaths.shift();
        imagePaths.push(firstLink);
        
        // display the first three images
        for (let i = 0; i < imageElements.length; i++) {
            imageElements[i].src = imagePaths[i];
        }
    });


    document.querySelector("#right_button").addEventListener("click", evt => {
        // shift the items in the array to the right
        let lastLink = imagePaths.pop();
        imagePaths.unshift(lastLink);

        // display the first three images
        for (let i = 0; i < imageElements.length; i++) {
            imageElements[i].src = imagePaths[i];
        }
    });
})