"use strict";
const getElement = selector => document.querySelector(selector);

const getMonthName = currentMonth => {
    const monthNames = ["January", "February", "March", "April", "May", 
        "June", "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[currentMonth];
};

const getLastDayofMonth = currentMonth => {
    const dt = new Date();
    dt.setMonth(currentMonth + 1);
    dt.setDate(0);
    return dt.getDate();
};

const addBlankDates = (start, day, row) => {
    while (start < day) {
        row.appendChild(document.createElement("td"));
        start++;
    } 
};

const addDate = (date, today, row) => {
    const cell = document.createElement("td");
    cell.appendChild(document.createTextNode(date));
    if (date == today.getDate()) {
        cell.classList.add("today");
    }
    row.appendChild(cell);
}

document.addEventListener("DOMContentLoaded", () => {
    const today = new Date();
    
    // display month and year
    getElement("#month_year").textContent = 
        `${getMonthName(today.getMonth())} ${today.getFullYear()}`;
	
    // get calendar <table> element
    const calendar = getElement("#calendar");

    // initialize constant for calendar date and variable for <tr> element
    const dt = new Date();
    let row = null;

    // loop through the number of days in the month
    const lastDayofMonth = getLastDayofMonth(today.getMonth());
    for (var i = 1; i <= lastDayofMonth; i++) {
        // set to current date in the loop of days 
        dt.setDate(i);
        
        // get the current date and day
        const date = dt.getDate();   // the current date; eg, the 1st, the 22nd, etc
        const day = dt.getDay();     // the day of the week; eg, Sat, Sun, etc
        
        // start a new row if it's the first of the month or the day is Sunday
        if (date === 1 || day === 0) { 
            row = document.createElement("tr"); 
        }

        // add blank dates at the beginning of the calendar until
        // you get to the day of the week the month starts on
        if (date === 1 ) { 
            addBlankDates(0, day, row);
        }
        
        // add the date to the calendar
        addDate(date, today, row);
        
        // add blank dates at the end of the calendar until
        // you get to the last day of the week the month ends in
        if (date === lastDayofMonth) { 
            addBlankDates(day, 6, row);
        } 
        
        // start a new row if it's the last of the month or the day is Saturday
        if (date === lastDayofMonth || day === 6) { 
            calendar.appendChild(row);
            row = document.createElement("tr"); 
        }
    }
});