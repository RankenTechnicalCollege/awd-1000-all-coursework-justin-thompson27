/*
    Student Name: Justin Thompson
    File Name: script.js
    Date: 10/13/2025
*/

/* Global Variables */
var figElement = document.getElementById("placeholder");
var imgSource = document.getElementById("image");
var figCap = document.querySelector("figcaption");



//Function to display the first picture
function pic1() {
    imgSource.src = "images/trunk-bay.jpg";
    imgSource.alt = "Elevated view of Trunk Bay beach on St. John";
    figElement.style.display = "block";
    figCap.textContent = "Trunk Bay in St. John";
}

function pic2() {
    imgSource.src = "images/sanjuan.jpg"
    imgSource.alt = "Elevated view of San Juan coast"
    figElement.style.display="block";
    figCap.textContent = "Coast of San Juan"
    
}

function pic3() {
    imgSource.src = "images/curacao.jpg"
    imgSource.alt = "The blue waters of Curacao"
    figElement.style.display="block";
    figCap.textContent = "Curacao"
    
}
