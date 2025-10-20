"use strict";

const getElement = selector => document.querySelector(selector); 

const displayInvoice = () => {
    const companyName = getElement("#company").value;
    const amountDue = parseFloat(getElement("#amount_due").value);
    const invoiceDate = new Date(getElement("#invoice_date").value);

    // display user entries
    let output = "Invoice Information\n";
    output += "Company name: " + companyName + "\n";
    output += "Amount due: $" + amountDue.toFixed(2) + "\n";
    output += "Invoice Date: " + invoiceDate.toDateString() + "\n";

    // calculate due date and display    
    const dueDate = new Date(invoiceDate);        // make a copy of invoice date    
    dueDate.setDate(invoiceDate.getDate() + 90);  // set the due date to 90 days in the future
    output += "Due Date: " + dueDate.toDateString() + "\n";

    // calculate days until due and display
    const today = new Date();
    output += "Today: " + today.toDateString() + "\n";

    const msUntilDue = dueDate.getTime() - today.getTime();
    const msPerDay = 24 * 60 * 60 * 1000;
    const daysToDue = Math.ceil(msUntilDue / msPerDay);    
    if (daysToDue == 0) {
        output += "Due TODAY\n";        
    } else if (daysToDue < 0) {
        output += Math.abs(daysToDue) + " days OVERDUE\n";
    } else {
        output += "Due in " + daysToDue + " days\n";
    }

    alert(output);
}

document.addEventListener("DOMContentLoaded", () => {
    getElement("#display_invoice").addEventListener("click", displayInvoice);
    getElement("#company").focus();
});