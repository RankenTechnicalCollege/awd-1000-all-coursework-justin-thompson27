import Trip from 'trip';

const trips = [];  // private 

export default {
    push(trip) {
        if (trip instanceof Trip) {  // only add valid Trip objects
            trips.push(trip);
        } else {
            throw new Error("Must be a Trip object.");
        }
    },
    get avgMpg() {              // a read-only property
        let totalMiles = 0;        
        let totalGallons = 0;        
        for (let trip of trips) {
            totalMiles += trip.miles;
            totalGallons += trip.gallons;
        }
        return totalMiles / totalGallons;
    },
    toString() {                 // override existing method
        let str = "";
        for (let trip of trips) {
            str += trip + "\n";
        }
        str += "\nAverage MPG: " + this.avgMpg.toFixed(1);
        return str;
    }
}