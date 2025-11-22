 "use strict";
/*    JavaScript 7th Edition
      Chapter 6
      Project 06-02

      Project to turn a selection list into a selection of hypertext links
      Author: Justin Thompson
      Date:   11/22/25

      Filename: project06-02.js
*/


window.addEventListener("load", function(){
console.log("hi");
let allSelect = document.querySelectorAll("form#govLinks select");


for (let i = 0; i < allSelect.length; i++) {
      allSelect[i].addEventListener("change", function(evt){
            let linkURL = evt.target.value;
            let newWin = window.open(linkURL);
            newWin;
      }
)
}

})