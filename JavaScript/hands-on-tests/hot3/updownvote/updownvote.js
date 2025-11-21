let thumbsUpButton = document.getElementById("thumbsup");
let thumbsDownButton = document.getElementById("thumbsdown");
let thumbsUp = document.getElementById("upvotes");
let thumbsDown = document.getElementById("downvotes");
let totalNumber = document.getElementById("totalscores");
let numberOfThumbsUp = 0;
let numberOfThumbsDown = 0;
let totalNumberToDisplay = 0;


document.addEventListener("load", displayValues);
thumbsUpButton.addEventListener("click", upVotes);
thumbsDownButton.addEventListener("click", downVotes);
function displayValues(){
  thumbsUp.textContent = "";
  thumbsDown.textContent = "";
  totalNumber.textContent = "";
  thumbsUp.textContent = numberOfThumbsUp;
  thumbsDown.textContent = numberOfThumbsDown;
  totalNumber.textContent = totalNumberToDisplay;

}

function upVotes(){
  numberOfThumbsUp++;
  updateTotal();
  displayValues();
  console.log(numberOfThumbsUp);

}

function downVotes(){
  numberOfThumbsDown++;
  updateTotal();
  displayValues();
  console.log(numberOfThumbsDown);

}

function updateTotal(){
  totalNumberToDisplay = numberOfThumbsUp - numberOfThumbsDown;
}