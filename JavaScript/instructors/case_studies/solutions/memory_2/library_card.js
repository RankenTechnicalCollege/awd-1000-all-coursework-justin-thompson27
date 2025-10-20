import {getBackSrc} from "cards";

export default class Card {
    #img = null;
    #id = null;
    constructor(a) {
        this.#img = a.firstChild
        this.#id = a.id;
    }
    get isFaceDown() {
        return this.#img.src.includes(getBackSrc());
    }
    equals(imageToCompare) {
        return this.#id === imageToCompare.#id;
    }
    fadeFlip(newSrc = this.#id) {  // default to src in <a> id attribute
        let opacity = 1;
        const increment = 0.25;
        const milliseconds = 50;

        // start fade out of current image
        let fadeOutTimer = setInterval(() => {
            opacity -= increment;
            this.#img.style.opacity = opacity;
            if (opacity < 0.1) {
                // stop fade out of old image
                clearInterval(fadeOutTimer);

                // start fade in of new image
                this.#img.src = newSrc;
                let fadeInTimer = setInterval(() => {
                    opacity += increment;
                    this.#img.style.opacity = opacity;

                    if(opacity >= 1) {
                        // stop fade in of new image
                        clearInterval(fadeInTimer); 
                    }
                }, milliseconds);
            }
        }, milliseconds);
    }
}