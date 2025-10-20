import Trip from 'trip';
import trips from 'trips';
import * as validate from 'val';

const getElement = selector => document.querySelector(selector);

document.addEventListener("DOMContentLoaded", () => {
    getElement("#add_trip").addEventListener("click", () => {
        const msgElement = getElement("#msg");
        msgElement.textContent = "";  // clear any previous message

        const destination = getElement("#destination").value;
        const miles = getElement("#miles").value;
        const gallons = getElement("#gallons").value;
        const trip = new Trip(destination, miles, gallons);

        if (validate.isAnyEmpty(destination, miles, gallons)) {
            msgElement.textContent = "All fields are required.";
            getElement("#destination").focus();
        } else if (validate.isLessThanZero(trip.miles)) {
            msgElement.textContent = 
                "Miles must be a valid number greater than zero.";
            getElement("#miles").select();
        } else if (validate.isLessThanZero(trip.gallons)) {
            msgElement.textContent = 
                "Gallons must be a valid number greater than zero.";
            getElement("#gallons").select();
        } else {
            trips.push(trip); 
            getElement("#trip_list").value = trips;
    
            getElement("#destination").value = "";
            getElement("#miles").value = "";
            getElement("#gallons").value = ""; 
            getElement("#destination").focus();   
        }
    });
    
    getElement("#destination").focus();  // initial load
});