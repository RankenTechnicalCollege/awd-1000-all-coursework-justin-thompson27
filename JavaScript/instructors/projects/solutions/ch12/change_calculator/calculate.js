"use strict";

const coins = {
    pennies: 0,
    nickels: 0,
    dimes: 0,
    quarters: 0,
    isInvalidCents(cents) {
        return isNaN(cents) || cents < 0 || cents > 99;
    },
    makeChange(cents) {
        if (this.isInvalidCents(cents)) {
            throw Error("Cents must be a number between 0 and 99.");
        }
        
        this.quarters = Math.floor(cents / 25);
        cents = cents % 25;  // remainder

        this.dimes = Math.floor(cents / 10);
        cents = cents % 10;  // remainder

        this.nickels = Math.floor(cents / 5);
        this.pennies = cents % 5;  // remainder
    }
};

const clearForm = () => {
    document.querySelector("#cents").value = "";
    document.querySelector("#quarters").value = "";
    document.querySelector("#dimes").value = "";
    document.querySelector("#nickels").value = "";
    document.querySelector("#pennies").value = "";
    document.querySelector("#cents").focus();
};

const calculateChange = () => {
    // get the number of cents from the user
    const cents = Math.floor(parseInt(document.querySelector("#cents").value));


    if (coins.isInvalidCents(cents)) {
        alert("Please enter a valid number between 0 and 99");
        document.querySelector("#cents").select();
    } else {
        coins.makeChange(cents);

        // display coins
        document.querySelector("#quarters").value = coins.quarters;
        document.querySelector("#dimes").value = coins.dimes;
        document.querySelector("#nickels").value = coins.nickels;
        document.querySelector("#pennies").value = coins.pennies;
    }
};

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#calculate").addEventListener("click", calculateChange);  
    document.querySelector("#clear").addEventListener("click", clearForm);  
    document.querySelector("#cents").focus();        
});