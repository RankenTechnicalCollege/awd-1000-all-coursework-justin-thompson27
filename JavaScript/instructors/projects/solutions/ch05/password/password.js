"use strict";

const getRandomNumber = max => {
	let random = null;
	if (!isNaN(max)) {
		random = Math.random();             // value >= 0.0 and < 1.0
		random = Math.floor(random * max);  // value is an integer between 0 and max - 1
		random = random + 1;                // value is an integer between 1 and max
	}
	return random;
};

const getRandomCharacter = () => {
    // get an array of possible characters
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_-+!@".split("");

    // get a random index for a character in the array
    const index = getRandomNumber(chars.length - 1);

    return chars[index];
};

document.addEventListener("DOMContentLoaded", () => { 
    document.querySelector("#generate").addEventListener("click", () => {
        // clear previous entry
        document.querySelector("#password").value = ""; 
    
        // get password length entered by user
        const num = parseInt(document.querySelector("#num").value);

        // validate number, build password if valid
        if (isNaN(num) || num <= 0) {
            alert("Please enter a valid number greater than zero.");
        } else {
            let password = "";

            // loop password length entered by user
            for (let i = 0; i < num; i++) {
                password += getRandomCharacter();
            }

            // display the password string when the loop is done
            document.querySelector("#password").value = password;
        }
    }); 
    
    document.querySelector("#clear").addEventListener("click", () => {
        document.querySelector("#num").value = "";
        document.querySelector("#password").value ="";
    }); 
}); 