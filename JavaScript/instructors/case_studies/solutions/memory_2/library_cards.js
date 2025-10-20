// private state
const images = [];
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
    const numberOfImages = settings.numberOfImages;
    
    // preload images and store in array
    for (let i = 1; i <= numberOfImages; i++) { 
        const img = new Image();
        img.src = `${cardImgSrcStart}${i}.png`;
        images.push(img);
    }
};

// exports
export const getBackSrc = () => backImgSrc;

export const getBlankSrc = () => blankImgSrc;

export const createHtml = () => {
    // set initial counter value and max cards per row
    let counter = 1;
    let max = 8;

    // initialize card variables 
    let index = 0;
    let src = "";
    
    // create array of image srcs
    preloadAndStoreImages();
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