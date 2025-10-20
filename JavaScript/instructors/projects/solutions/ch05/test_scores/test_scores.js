"use strict";

function getScoresFromUser() {
    const input = prompt("Enter test scores separated by commas.");

    // if user enters no scores or clicks Cancel, return an empty array
    if (input == "" || input == null) {
        return [];
    } else {
        return input.split(",");
    }
}

function getHighScore(scores) {
    return Math.max(...scores);
}

function getLowScore(scores) {
    return Math.min(...scores);
}

function getAverageScore(scores) {
    let total = 0;
    for (let score of scores) {
        total += parseFloat(score);
    }
    const average = total/scores.length;
    return average;
}

function displayScores(scores) {
    if (scores.length == 0) {
        alert("No scores entered.")
    } else {
        const result = "Scores: " + scores.join(",") + "\n" +
            "Low score = " + getLowScore(scores) + "\n" +
            "High score = " + getHighScore(scores) + "\n" +
            "Average score = " + getAverageScore(scores).toFixed(1);
        alert(result);
    }
}

const scores = getScoresFromUser();
displayScores(scores);