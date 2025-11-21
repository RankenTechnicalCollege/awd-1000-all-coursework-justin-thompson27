let email = document.getElementById("email");
let password = document.getElementById("password");
let errorBox = document.getElementById("errorBox");
let successBox = document.getElementById("successBox");
let loginButton = document.getElementById("loginButton");
let correctEmail =  "admin@example.com";
let correctPassword = "password";


loginButton.addEventListener("click", function(){

      errorBox.textContent = "";
      successBox.textContent = "";
      if (password.validity.valueMissing || email.validity.valueMissing ) {
           
            errorBox.textContent = " You seem to have forgotten your username and password";
      }
      else if(email.value === correctEmail && password.value === password)
      {
        successBox.textContent = "Welcome back Admin!";
      

      }
       else if(email.value != correctEmail && password.value != password)
      {
        errorBox.textContent = "That email and password doesn't seem to be right. Try again";
           
      }

    
}
)