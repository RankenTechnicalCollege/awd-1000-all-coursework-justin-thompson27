"use strict";

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
    let cents = Math.floor(parseInt(document.querySelector("#cents").value));

    if (isNaN(cents) || cents < 0 || cents > 99) {
        alert("Please enter a valid number between 0 and 99");
        document.querySelector("#cents").select();
    } else {
        // calculate the number of quarters
        const quarters = Math.floor(cents / 25);        // get number of quarters
        cents = cents % 25;         // assign the remainder to the cents variable

        // calculate the number of dimes
        const dimes = Math.floor(cents / 10);           // get number of dimes
        cents = cents % 10;         // assign the remainder to the cents variable

        // calculate the number of nickels
        const nickels = Math.floor(cents / 5);

        // calculate the number of nickels and pennies
        const pennies = cents % 5;

        // display the results of the calculations
        document.querySelector("#quarters").value = quarters;
        document.querySelector("#dimes").value = dimes;
        document.querySelector("#nickels").value = nickels;
        document.querySelector("#pennies").value = pennies;
    }
};

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#calculate").addEventListener("click", calculateChange);  
    document.querySelector("#clear").addEventListener("click", clearForm);     
    document.querySelector("#cents").focus();     
});