"use strict";

// declare arrays and variables for tracking scores
const names = [];
const scores = [];
let scoreTotal = 0;
let lowScoreIndex = -1;       
let highScoreIndex = -1;

// helper functions
const getElement = selector => document.querySelector(selector);

const setLowHighScore = () => {
	let lowScore = 101;       // initialize higher than highest possible score
	let highScore = -1;       // initialize lower than lowest possible score
	
	for (let i in scores){
		if (scores[i] < lowScore) {    // set low score
			lowScore = scores[i];
			lowScoreIndex = i;
		}

		if (scores[i] > highScore) {   // set high score
			highScore = scores[i];
			highScoreIndex = i;
		}
    }
};

const addScore = () => {
	// get user entry text boxes
	const nameNode = getElement("#name");
	const scoreNode  = getElement("#score");

	// clear any previous error messages
	nameNode.nextElementSibling.textContent = "";
	scoreNode.nextElementSibling.textContent = "";
	
	// get user entries
	const name = nameNode.value;
    const score  = parseInt(scoreNode.value);
    
	// check entries for validity
	let isValid = true;
    if (name == "") {
		nameNode.nextElementSibling.textContent = "Please enter a name.";
		isValid = false;
	}
	if (isNaN(score) || score < 0 || score > 100) {
    	scoreNode.nextElementSibling.textContent = "Score must be between 0 and 100.";
		isValid = false;
	}

	// if valid, update arrays and variables, clear text boxes
	if (isValid) {
		names.push(name);
		scores.push(score);

		scoreTotal += score;  
		setLowHighScore();

	    nameNode.value = "";
	    scoreNode.value = "";
	}

	// set focus either way
    nameNode.focus();
};

const createElementWithText = (tagName, text) => {
	const element = document.createElement(tagName);
	const textNode = document.createTextNode(text);
	element.appendChild(textNode);
	return element;
};

const displayScores = () => {
	// clear previous scores
	const div = getElement("#scores");
	div.textContent = "";

	// display heading and scores
	div.appendChild(createElementWithText("h2", "Scores"));
	for (let i in scores) {
		div.appendChild(createElementWithText("label", names[i]));
		div.appendChild(createElementWithText("label", scores[i]));
		div.appendChild(document.createElement("br"));
	}
};

const displayResults = () => {
	// get low, high, and average scores
	const lowScore = scores[lowScoreIndex];
	const lowScoreName = names[lowScoreIndex];
	const highScore = scores[highScoreIndex];
	const highScoreName = names[highScoreIndex];
	const averageScore = (scoreTotal / scores.length).toFixed(0);

	// clear previous results 
	const div = getElement("#results");
	div.textContent = "";  

	// display heading and results
	div.appendChild(createElementWithText("h2", "Results"));
	div.appendChild(createElementWithText("p", 
		`Low score = ${lowScoreName} with a score of ${lowScore}`));
	div.appendChild(createElementWithText("p", 
		`High score = ${highScoreName} with a score of ${highScore}`));
	div.appendChild(createElementWithText("p", `Average score = ${averageScore}`))
};

// event handlers
document.addEventListener("DOMContentLoaded", () => {
	getElement("#add").addEventListener("click", () => {
		addScore();
		displayScores();
		displayResults();
	});

	getElement("#clear").addEventListener("click", () => {
		names.length = 0;
		scores.length = 0;
		scoreTotal = 0;
		getElement("#results").textContent = "";
		getElement("#scores").textContent = "";
		getElement("#name").nextElementSibling.textContent = "";
		getElement("#score").nextElementSibling.textContent = "";
	});
	
	// set focus on first text box
	getElement("#name").focus();
});
