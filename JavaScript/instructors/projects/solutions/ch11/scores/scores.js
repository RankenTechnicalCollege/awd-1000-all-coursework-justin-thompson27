"use strict";

const getElement = selector => document.querySelector(selector);

const displayScores = scores => {   
    // filter scores
    const filterScore = parseInt(getElement("#filter").value);
    const displayScores = scores.filter(arr => arr[2] >= filterScore);

    // sort filtered scores
    const sortCriteria = getElement("#sort").value;
    if (sortCriteria == "fname") {
        displayScores.sort((a, b) => a[0].localeCompare(b[0]));
    } else if (sortCriteria == "lname") {
        displayScores.sort((a, b) => a[1].localeCompare(b[1]));
    } else if (sortCriteria == "score") {
        displayScores.sort((a, b) => a[2] - b[2]);
    }

    // get total of filtered scores and build display string
    let totalScore = 0;
    let displayString = "";

    displayScores.forEach(arr => {
        const [fname, lname, score] = arr;  // destructure nested array
        totalScore += score;
        displayString += `${lname}, ${fname}: ${score}\n`;
    });

    // calculate the average 
    const avg = totalScore / displayScores.length;    

    // display 
    getElement("#score_list").value = displayString;
    getElement("#avg").textContent = avg.toFixed(1);
};

document.addEventListener("DOMContentLoaded", () => {
    const scores = [];

    getElement("#add_score").addEventListener("click", () => {   
        // get the data from the form
        const fname = getElement("#first_name").value;
        const lname = getElement("#last_name").value;
        const score = parseInt(getElement("#score").value);

        if (fname && lname && score) {
            // store the data in an array of arrays
            scores.push([fname, lname, score]);

            // display the scores 
            displayScores(scores);

            // get the add form ready for next entry
            getElement("#first_name").value = "";
            getElement("#last_name").value = "";
            getElement("#score").value = "";
            getElement("#first_name").focus();
        } else {
            alert ("You must enter a first name, last name, and numeric score.")
        }
    });
    
    getElement("#clear_scores").addEventListener("click", () => {
        scores.length = 0;
        getElement("#score_list").value = "";
        getElement("#avg").textContent = "";

        getElement("#first_name").focus();
    });

    getElement("#sort").addEventListener("change", () => {
        displayScores(scores);
    });
    
    getElement("#filter").addEventListener("change", () => {
        displayScores(scores);
    });

    // set focus on first text box on load
    getElement("#first_name").focus();
});