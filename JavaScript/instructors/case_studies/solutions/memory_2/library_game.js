import * as cards from "cards";

// private state
let turns = 0;
let matches = 0;
let percent = 0;
let firstCard = null;
let isOkToClick = true;

// export
const game = {
    get cardsHtml() {
        return cards.createHtml();
    },
    get allCardsMatched() {
        return (matches === settings.numberOfImages);
    },
    get highScore() {
        return storage.getInt(settings.playerName, -1);
    },
    get percentCorrect() {
        return percent;
    },
    isOkToClick(card) {
        return card.isFaceDown && isOkToClick;
    },
    showCard(card) {
        card.fadeFlip();
        if (firstCard == null) {   // first card
            firstCard = card;
        } else {                   // second card
            // don't allow flip of another card until this turn is over
            isOkToClick = false;

            // increment turns counter
            turns++;
                
            // set image for card flip based on whether cards match,
            // also increment match counter if cards match  
            let imgSrc = cards.getBackSrc();         
            if (firstCard.equals(card)) { 
                imgSrc = cards.getBlankSrc();
                matches++;
            } 

            // flip both cards to card back or blank image after 1 second,
            // reset game for next turn
            setTimeout( () => { 
                card.fadeFlip(imgSrc);
                firstCard.fadeFlip(imgSrc);
                firstCard = null;
                isOkToClick = true;
            }, 1000);
        }
    },
    calculatePercentCorrect() {
        percent = Math.floor((matches / turns) * 100);
        const name = settings.playerName;
        if (name != "" && percent > this.highScore) {
			storage.setItem(name, percent);
		}
    },
};
export default game;