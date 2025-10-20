"use strict";

const getElement = selector => document.querySelector(selector);

document.addEventListener("DOMContentLoaded", () => {
    const scores = new TestScores();

    getElement("#add_score").addEventListener("click", () => {
        // clear any previous error message
        getElement("#add_score").nextElementSibling.textContent = "";  
        
        // get score entered by user and validate
        const score = parseFloat(getElement("#score").value);
        if (!validation.isInRange(score, 0, 100)) {
            const msg = "Score must from 0 to 100."; 
            getElement("#add_score").nextElementSibling.textContent = msg; 
        }
        else { // score is valid
            // add score 
            scores.add(score);

            // display all scores
            getElement("#all").textContent = scores.toString();

            // display letter grades for scores
            getElement("#grades").textContent = scores.toLetterString();
            
            // display average score
            getElement("#avg").textContent = scores.avg.toFixed(2);

            // display the scores sorted in descending order
            getElement("#sort").textContent = scores.toSortedString();
        }
        
        // get text box ready for next entry
        getElement("#score").value = "";
        getElement("#score").focus(); 
    });

    // set focus on initial load
    getElement("#score").focus();
});