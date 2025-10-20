import game from "game";

const getElement = selector => document.querySelector(selector);

function resetPage() {
    // clear any previous data from the page
    getElement("#score1").value = "0";  
    getElement("#score2").value = "0";
    getElement("#message").textContent = "";
    getElement("#total").value = "0";
    getElement("#turn").classList.add("hide");
}

document.addEventListener("DOMContentLoaded", () => {
    const dieCanvas = getElement("#die");
    const dieCtx = dieCanvas.getContext("2d");

    getElement("#new_game").addEventListener("click", () => {
        resetPage();
        
        // reset the game object and then start a new game, passing in the players' names
        game.reset(dieCtx).start(getElement("#player1").value, getElement("#player2").value);
        
        if (game.hasNames) {
            getElement("#turn").classList.remove("hide"); 
            getElement("#current").textContent = game.currentPlayer.name;
            getElement("#roll").focus();
        } else {
            getElement("#message").textContent = "Invalid name(s)";
            getElement("#player1").focus();
        }
    }); 
    
    getElement("#roll").addEventListener("click", async () => {
        await game.takeTurn(dieCtx);
               
        if(game.currentPlayer.isBust) {
            game.changePlayer();        // no param = don't clear die
            getElement("#total").value = 0;
            getElement("#current").textContent = game.currentPlayer.name;
        } else {
            getElement("#total").value = game.currentPlayer.turn;
        }
        
        getElement("#roll").focus();
        
    }); 
    
    getElement("#hold").addEventListener("click", () => {
        game.hold(getElement("#score1"), getElement("#score2")).checkWinner();
        
        if (game.hasWinner) { 
            getElement("#message").textContent = game.currentPlayer.name + " WINS!";
            getElement("#turn").classList.add("hide");
            getElement("#new_game").focus();
        } else {
            game.changePlayer(dieCtx);  // sending context = clear die
            getElement("#total").value = 0;
            getElement("#current").textContent = game.currentPlayer.name;
            getElement("#roll").focus();
        }
    }); 

    // set focus on initial page load
    getElement("#player1").focus();
}); 