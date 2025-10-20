"use strict";

const game = {
    die: new Die(),
    player1: new Pig(30),  
    player2: new Pig(30), 
    currentPlayer: null, 
    hasWinner: false,
    get hasNames() {
        return this.player1.hasName && this.player2.hasName;
    },
    start(name1, name2) {
        this.player1.name = name1;
        this.player2.name = name2;
        this.currentPlayer = this.player1;
        return this;
    },
    reset() {
        this.player1.reset();
        this.player2.reset();
        return this;
    },
    takeTurn() {
        const roll = this.die.roll();
        this.currentPlayer.takeTurn(roll);
        return roll;
    },
    changePlayer() {
        // determine whether player1 or player2 is the current player, then
        // update the currentPlayer property to hold the other player.
        if (this.currentPlayer.equals(this.player1)) { 
            this.currentPlayer = this.player2;
        } else { 
            this.currentPlayer = this.player1;
        }  
        return this;
    },
    hold( score1, score2 ) {
        // call the hold() method of the current player
        this.currentPlayer.hold();
        
        // determine whether player1 or player2 is the current player, then
        // update that player's score with the current total
        if (this.currentPlayer.equals(this.player1)) {
            score1.value = this.currentPlayer.total;
        } else {
            score2.value = this.currentPlayer.total;
        }
        return this;
    },
    checkWinner() {
        // determine whether player1 or player2 is at or above the winning total.  
        this.hasWinner = this.player1.isWinner || this.player2.isWinner;
    }
};