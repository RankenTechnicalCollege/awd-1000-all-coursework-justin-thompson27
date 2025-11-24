"use strict";
/*    JavaScript 7th Edition
      Chapter 6
      Project 06-03

      Script to complete a form containing billing and shipping address information
      Author: Justin Thompson
      Date:   11/20/25

      Filename: project06-03.js
*/

let useShip = document.getElementById("useShip");

let firstNameBill = document.getElementById("firstnameBill");
let lastNameBill = document.getElementById("lastnameBill");
let address1Bill = document.getElementById("address1Bill");
let address2Bill = document.getElementById("address2Bill");
let cityBill = document.getElementById("cityBill");
let countryBill = document.getElementById("countryBill");
let codeBill = document.getElementById("codeBill");
let stateBill = document.getElementById("stateBill");
let firstNameShip = document.getElementById("firstnameShip");
let lastNameShip = document.getElementById("lastnameShip");
let address1Ship = document.getElementById("address1Ship");
let address2Ship = document.getElementById("address2Ship");
let cityShip = document.getElementById("cityShip");
let countryShip = document.getElementById("countryShip");
let codeShip= document.getElementById("codeShip");
let stateShip = document.getElementById("stateShip");


useShip.addEventListener("click", copyShippingToBilling);


function copyShippingToBilling(){
      if (useShip.checked) {
          firstNameBill.value = firstNameShip.value;
          lastNameBill.value = lastNameShip.value;
          address1Bill.value = address1Ship.value;
          address2Bill.value = address2Ship.value;
          cityBill.value = cityShip.value;
          countryBill.value = countryShip.value;
          codeBill.value = codeShip.value;
          stateBill.selectedIndex = stateShip.selectedIndex;
      }
}

let formElements = document.querySelectorAll("input[type='text'");
let fieldCount = formElements.length;
let errorBox = document.getElementById("errorBox");

for (let i = 0; i < formElements.length; i++) {
      formElements[i].addEventListener("invalid", showValidationError)
      
}

function showValidationError(evt){
      evt.preventDefault();
      errorBox.textContent = "Complete all highlighted fields";
}