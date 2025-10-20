"use strict";

function getElement(selector) {
    return document.querySelector(selector);
}  

function getInvoices() {
    let invoices = [];

    invoices.push(["Murach Books", 100.00, new Date("10/5/2024"), true]);
    invoices.push(["Savemart", 200.75, new Date("10/8/2024"), false]);
    invoices.push(["Carls Jr.", 150.25, new Date("10/6/2024"), true]);
    invoices.push(["Taco Bell", 85.00, new Date("10/23/2024"), true]);
    invoices.push(["Target", 45.00, new Date("10/01/2024"), false]);

    return invoices;
}

function createCol(text) {
    const col = document.createElement("td");
    const textNode = document.createTextNode(text);
    col.appendChild(textNode);
    return col;
}

function displayInvoices(invoices) {
    const table = getElement("#invoice_table");

    // clear any existing invoices (but not header row)
    const rows = document.querySelectorAll("#invoice_table tr");
    for (let i = 1; i < rows.length; i++) {
        table.removeChild(rows[i]);
    }

    // add one row for each invoice
    for (let invoice of invoices) {
        const row = document.createElement("tr");
        row.appendChild(createCol(invoice[0]));
        row.appendChild(createCol(invoice[1].toFixed(2)));
        row.appendChild(createCol(invoice[2].toDateString()));
        row.appendChild(createCol(invoice[3]));
        table.appendChild(row);    
    }
}
 
function filterInvoices() {
    const invoices = getInvoices();

    // filter by date
    let filtered = invoices
        .filter(invoice => {
            const invoiceDate = invoice[2];
            const startDate = new Date(getElement("#start_date").value);
            const endDate   = new Date(getElement("#end_date").value);
        
            if (invoiceDate >= startDate & invoiceDate <= endDate) {
                return true;
            } else {
                return false;
            }        
        });

    // filter by paid status
    filtered = filtered.filter(invoice => {
        const invoiceIsPaid = invoice[3];

        if (getElement("#both").checked) {
            return true;
        } else if (getElement("#paid").checked && invoiceIsPaid) {
            return true;
        } else if (getElement("#unpaid").checked && !invoiceIsPaid) {
            return true;
        }        
    });

    // display the filtered data
    displayInvoices(filtered);
}

document.addEventListener("DOMContentLoaded", () => {
    const invoices = getInvoices();
    displayInvoices(invoices);

    getElement("#filter_button").addEventListener("click", filterInvoices);
});