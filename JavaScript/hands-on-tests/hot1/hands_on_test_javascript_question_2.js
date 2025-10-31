/* 
Challenge 2 - Age Verification
❏ Ask the user to enter their age in a textbox and click a button to verify their age. _____ / 5pts
❏ If the user is 21 or older, display a message saying "Welcome to the venue!" _____ / 5pts
❏ If the user is under 21, display a message saying "You're not old enough!" _____ / 5pts
❏ If the user does not enter an integer, display a message saying "Please enter your age!" ___ / 3pts
❏ If the user enters an age below 1 or above 200, display a message saying "Age out of range!"
____ / 2pts
*/




document.getElementById("submit").addEventListener("click",verifyAge);

function verifyAge() {
  let answer = document.getElementById("age").value;
 console.log(parseInt(answer));
 console.log(answer);
  if (parseInt(answer) != answer || parseInt(answer) % 1 !=0  ) {
  window.alert("Please enter your age!");
  }
  else if(parseInt(answer) >= 21 && parseInt(answer) < 200){
    window.alert("Welcome to the venue!");
  }
  else if(parseInt(answer) < 21 && parseInt(answer) > 1){
    window.alert("You're not old enough!");
  } 
  else if(parseInt(answer) < 1 || parseInt(answer) > 200){
    window.alert("Age out of range!");
  }
}

