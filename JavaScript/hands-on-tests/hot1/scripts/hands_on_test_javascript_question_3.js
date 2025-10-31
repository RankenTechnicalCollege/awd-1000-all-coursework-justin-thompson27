/* 
Ask the user to enter a number 1-3 and click a button _____ / 5pts
❏ Display one of the following messages, depending on what they entered:
_____ / 5pts
❏ 1 - "One is the loneliest number that you'll ever do."
❏ 2 - "Two can be as bad as one. It's the loneliest number since the number one."
❏ 3 - "There is no three."
❏ If the user types a string value the program should display “Please enter a number, not a word.” _____ / 5pts
❏ For all other numeric entries display "You didn't enter a valid number." _____ / 5pts
*/


document.getElementById("submit").addEventListener("click", displayMessage);
function displayMessage(){
  
let answer = document.getElementById("numbers").value;
console.log(isNaN(answer));
switch (answer) {
  case "1":
    window.alert("One is the loneliest number that you'll ever do");
    break;

  case "2":
    window.alert("Two can be as bad as one. It's the loneliest number since the number one.");
    break;
  case "3":
    window.alert("There is no three.");
    break;
  default:
    if (isNaN(answer)) {
      window.alert("Please enter a number, not a word.");
    } else {
       window.alert("You didn't enter a valid number.");
    break;
    }
   
}
}
