import game from 'game';
import Card from 'card';

// helper functions
const getElement = selector => document.querySelector(selector);

const displayPlayer = (percent = -1) => {
    const name = settings.playerName;
    const highScore = game.highScore;

    getElement("#player").textContent = (name == "") ? "" : `Player: ${name}`;
    getElement("#high_score").textContent = (highScore > -1) ? `High score: ${highScore}%` : "";
    getElement("#correct").textContent = (percent > -1) ? `Correct: ${percent}%` : "";
};

// DOM content loaded event handler
document.addEventListener("DOMContentLoaded", () => {
    // display cards and player info
    getElement("#cards").appendChild(game.cardsHtml);
    displayPlayer();
	
	// load settings data
    getElement("#player_name").value = settings.playerName;
    getElement("#num_cards").value = settings.numberOfCards;
 
	// add click event handler for each card link
    const cardLinks = Array.from(document.querySelectorAll("#cards a"));
    cardLinks.forEach(a => a.addEventListener("click", evt => {
        // cancel <a> default behavior and create new Card object
        evt.preventDefault();
        let card = new Card(a);

        // only do anything if the card is face down and the turn isn't over yet
        if (game.isOkToClick(card)) {
            game.showCard(card);
            if (game.allCardsMatched) {
                game.calculatePercentCorrect();

                // update player info after 1.5 seconds 
                setTimeout(() => { 
                    displayPlayer(game.percentCorrect);
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
        settings.playerName = getElement("#player_name").value;
        settings.numberOfCards = parseInt(getElement("#num_cards").value );
        location.reload();    // reload page 
	}); 
    
}); // end DOMContentLoaded event handler