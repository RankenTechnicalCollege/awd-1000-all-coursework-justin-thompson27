"use strict";
const getElement = selector => document.querySelector(selector);

// local storage functions
const getString = (key, defaultValue = "") => localStorage.getItem(key) ?? defaultValue;
const getInt = (key, defaultValue = 0) => parseInt(getString(key, defaultValue));
const setItem = (key, value) => localStorage.setItem(key, value);

// settings functions
const getPlayerName = () => getString("playerName", "");
const setPlayerName = name => setItem("playerName", name);

const getNumberOfImages = () => getInt("numberOfImages", 24);
const getNumberOfCards = () => getNumberOfImages() * 2;      // cards contain 2 of each image
const setNumberOfCards = num => setItem("numberOfImages", num / 2);

// scores functions
const getHighScore = () => getInt(getPlayerName(), -1);

const calculatePercentCorrect = (matches, turns) => 
    Math.floor((matches / turns) * 100);

const updateHighScore = (percent) => {
    const name = getPlayerName();
    const highScore = getHighScore();
    if (name != "" && percent > highScore) {
        setItem(name, percent);
    }
};

// image constants and function
const backImgSrc = "images/back.png";
const blankImgSrc = "images/blank.png";
const cardImgSrcStart = "images/card_";

const preloadAndStoreImages = () => {
	// preload blank image and back of card image - don't need to store these
	const back = new Image();
	back.src = backImgSrc;    
	const blank = new Image();
	blank.src = blankImgSrc;

	// get number of images to store
	const numberOfImages = getNumberOfImages(); 
	
	// preload images and store in array
    const images = [];
    for (let i = 1; i <= numberOfImages; i++) { 
		const img = new Image();
		img.src = `${cardImgSrcStart}${i}.png`;
		images.push(img);
	}

    return images;
};

// card functions
const createCardsHtml = () => {
	// set initial counter value and max cards per row
    let counter = 1;
    const max = 8;

	// initialize card variables 
    let index = 0;
    let src = "";

    // create array of image srcs
    const images = preloadAndStoreImages();
    const srcs = images.map(img => img.src);
    srcs.push(...srcs); // double srcs - need two cards per image

    // create cards HTML
    const div = document.createElement("div");
    while (srcs.length > 0) {
        // randomly select card from array
        index = Math.floor(Math.random() * srcs.length);
        src = srcs[index];
        srcs.splice(index, 1); // remove src from array
    
        // create HTML for link and image
        const a = document.createElement("a");
        a.id = src;
        a.href = "#";

        const img = document.createElement("img");
        img.src = backImgSrc;
        img.alt = "";
        a.appendChild(img);
        div.appendChild(a);
        
        // if end of row, clear float and reset counter
        if (counter === max) {
            const clear = document.createElement("div");
            clear.classList.add("clear");
            div.appendChild(clear);
            counter = 1;
        } else { // otherwise, increment counter
            counter++;
        }
    }
    return div;
};

const fadeFlipCard = (img, newSrc) => {
    let opacity = 1;
    const increment = 0.25;
    const milliseconds = 50;

    // start fade out of current image
    let fadeOutTimer = setInterval(() => {
        opacity -= increment;
        img.style.opacity = opacity;
        if (opacity < 0.1) {
            // stop fade out of old image
            clearInterval(fadeOutTimer);

            // start fade in of new image
            img.src = newSrc;
            let fadeInTimer = setInterval(() => {
                opacity += increment;
                img.style.opacity = opacity;

                if(opacity >= 1) {
                    // stop fade in of new image
                    clearInterval(fadeInTimer); 
                }
            }, milliseconds);
        }
    }, milliseconds);
};

// display function
const displayPlayer = (percent = -1) => {
    const name = getPlayerName();
    const highScore = getHighScore();

    getElement("#player").textContent = (name == "") ? "" : `Player: ${name}`;
    getElement("#high_score").textContent = (highScore > -1) ? `High score: ${highScore}%` : "";
    getElement("#correct").textContent = (percent > -1) ? `Correct: ${percent}%` : "";
};

document.addEventListener("DOMContentLoaded", () => {
    // declare variables 
    let turns = 0;
    let matches = 0;
    let isOkToClick = true;
    let firstA = null;
	
    // display cards and player info
    getElement("#cards").appendChild(createCardsHtml());
    displayPlayer();

    // load settings data
    getElement("#player_name").value = getPlayerName();
    getElement("#num_cards").value = getNumberOfCards();
 
	// add click event handler for each card link
    const cardLinks = Array.from(document.querySelectorAll("#cards a"));
    cardLinks.forEach(a => a.addEventListener("click", evt => {
        // cancel <a> default behavior and get nested <img>
        evt.preventDefault();
        let img = a.firstChild;

        // only do anything if card is face down and the turn isn't over yet
        if (img.src.includes(backImgSrc) && isOkToClick) {
            // show card
            fadeFlipCard(img, a.id);

            // if nothing is stored yet, that means the clicked card is 
            // the first card of the turn. Store clicked <a> element
            if (!firstA) { 
                firstA = a; 
            } else { // clicked card is second card of turn    
                // set ok to click flag to false and increment turns counter
                isOkToClick = false;
                turns++;
                
                // set image for card flip based on whether cards match,
                // also increment match counter if cards match  
                let imgSrc = "images/back.png";          
                if (firstA.id === a.id) { 
                    imgSrc = "images/blank.png";
                    matches++;
                } 

                // flip both cards to card back or blank image after 1 second,
                // reset firstA variable and ok to click flag for next turn
                setTimeout( () => { 
                    fadeFlipCard(img, imgSrc);
                    fadeFlipCard(firstA.firstChild, imgSrc);
                    isOkToClick = true;
                    firstA = null;
                }, 1000);
            } 

            // when turn is done, if all images have been correctly matched, 
            // calculate % and update stored high score if necessary
            if (matches == getNumberOfImages()) {
                const percent = calculatePercentCorrect(matches, turns);
                updateHighScore(percent);

                // update player info after 1.5 seconds 
                setTimeout(() => { 
                    displayPlayer(percent);
                }, 1500);     
            }  
        }
    }));

    // add click event handler for each tab link button
    let links = Array.from(document.querySelectorAll(".tablinks"));
    links.forEach(link => link.addEventListener("click", evt => {
        // hide all tab content
        const tabcontent = Array.from(document.querySelectorAll(".tabcontent"));
        tabcontent.forEach(div => div.classList.add("hide"));

        // remove the active class from all tab links
        const tablinks = Array.from(document.querySelectorAll(".tablinks"));
        tablinks.forEach(link => link.classList.remove("active"));

        // add active class to clicked tab link 
        evt.currentTarget.classList.add("active");

        // show associated tab content
        const id = evt.currentTarget.id.replace("_link", "");
        getElement("#"+id).classList.remove("hide");
    }));

    // add click event handler for Save Settings button
    getElement("#save_settings").addEventListener("click", () => {
        setPlayerName(getElement("#player_name").value);
        setNumberOfCards(parseInt(getElement("#num_cards").value));
        location.reload();    // reload page 
	}); 
    
}); // end DOMContentLoaded event handler