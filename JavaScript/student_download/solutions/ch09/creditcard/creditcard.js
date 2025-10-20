"use strict";

const getElement = selector => document.querySelector(selector);

document.addEventListener("DOMContentLoaded", () => {
    const form = getElement("form");

    // turn off default HTML validation messages
    form.noValidate = true;

    // attach invalid event handler for form controls
    for (let element of form.elements) {
        element.addEventListener("invalid", evt => {
            const elem = evt.target;
            const msg = elem.title ? elem.title : elem.validationMessage;
            
            const span = elem.nextElementSibling;
            if (span) span.textContent = msg;
        });
    }

    form.addEventListener("submit", evt => {
        // clear messages
        for (let element of form.elements) {
            const span = element.nextElementSibling;
            if (span) span.textContent = "";
        }

        // do custom expiration date validation
        const expDateElement = getElement("#expdate");
        if (expDateElement.value) {
            const dateParts = expDateElement.value.split("/");
            const month = parseInt(dateParts[0])-1;
            const year = parseInt("20" + dateParts[1]);
            const expDate = new Date(year, month, 1);
      
            const currentDate = new Date();                       

            const msg = (expDate < currentDate) ? expDateElement.title : "";
            expDateElement.setCustomValidity(msg);    
        }

        // validate form 
        if (!form.checkValidity()) {
            evt.preventDefault();
        }
    });

});