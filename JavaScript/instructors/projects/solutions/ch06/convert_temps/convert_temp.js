"use strict";

// helper functions 
const getElement = selector => document.querySelector(selector);
const calculateCelsius = temp => (temp-32) * 5/9;
const calculateFahrenheit = temp => temp * 9/5 + 32;

const toggleDisplay = (label1Text, label2Text) => {
    // update labels and clear disabled textbox
    getElement("#degree_label_1").textContent = label1Text;
    getElement("#degree_label_2").textContent = label2Text;
    getElement("#degrees_computed").value = "";

    // select text in degrees textbox
	getElement("#degrees_entered").select();
}

// event handler function
const convertTemp = () => {  
    // clear any previous error message
    getElement("#message").textContent = "";  

    // get user entry
    const temp = parseFloat(getElement("#degrees_entered").value);

    if (isNaN(temp)) { 
        // notify user of error, clear previously computed value, and select text in degrees textbox
        getElement("#message").textContent = "You must enter a valid number for degrees."; 
        getElement("degrees_computed").value = "";
        getElement("#degrees_entered").select();                 
    }
    else {
        // compute and display temp based on which radio button is checked
        if (getElement("#to_celsius").checked) {  
            getElement("#degrees_computed").value = calculateCelsius(temp).toFixed(0);
        } else {
            getElement("#degrees_computed").value = calculateFahrenheit(temp).toFixed(0);
        }  
        
        // select text in degrees textbox
	    getElement("#degrees_entered").select();
    }
};

document.addEventListener("DOMContentLoaded", () => {
	// add event handlers
	getElement("#convert").addEventListener("click", convertTemp);

    getElement("#to_celsius").addEventListener("click", 
        () => toggleDisplay("Enter F degrees:", "Degrees Celsius:"));

    getElement("#to_fahrenheit").addEventListener("click", 
        () => toggleDisplay("Enter C degrees:", "Degrees Fahrenheit:"));
	
	// set focus
	getElement("#degrees_entered").focus();
});