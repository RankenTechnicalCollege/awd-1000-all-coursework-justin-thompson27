"use strict";
const getElement = selector => document.querySelector(selector);

const domain = "https://api.nasa.gov/mars-photos/api/v1/rovers";
// for better results, sign up for an API key and replace DEMO_KEY with your key
const request = "?api_key=DEMO_KEY&page=1";

let roverData = [];

const getJson = async (url) => {
    // asynchronous code for API request goes here
	const response = await fetch(url);
    const json = await response.json();
    return json;
};

const getSelectedDate = () => {
    const year = getElement("#year").value;
    const month = getElement("#month").value;
    const date = getElement("#date").value;
    return `${year}-${month}-${date}`;
};

const clearPrevious = () => {
    getElement("#display").textContent = ""; 
    getElement("#camera").textContent = "";
    getElement("#year").textContent = "";
    getElement("#month").textContent = "";
    getElement("#date").textContent = "";
};

const displayRoverData = rover => {
    getElement("#status").textContent = rover.status;
    getElement("#photos").textContent = rover.total_photos;
    getElement("#landing").textContent = rover.landing_date;
    getElement("#max").textContent = rover.max_date;
};

const createOption = (text, value = null) => {
    const option = document.createElement("option");
    option.appendChild(document.createTextNode(text));
    if (value) option.value = value;
    return option;
}

const loadNumericOptions = (select, min, max, selected) => {
    for (let i = min; i <= max; i++) {
        const option = createOption(i);
        if (i == selected) option.selected = true;
        select.appendChild(option);
    }
};

const loadRoverOptions = (select, rovers, blankText = "") => {
    // add blank option
    select.appendChild(createOption(blankText));

    // add rover options 
    for (let rover of rovers) {
        select.appendChild(createOption(rover.name));
    }
};

const loadCameraOptions = (select, cameras) => {
    // add 'all cameras' option
    select.appendChild(createOption("All cameras"));

    // add camera options
    for (let camera of cameras) {
        select.appendChild(createOption(camera.full_name, camera.name));
    }
};

const displayPhotos = (div, photos) => {
    div.textContent = ""; // clear previous display
    
    for (let photo of photos) {
        const img = document.createElement("img");
        img.src = photo.img_src;
        img.title = photo.camera.full_name;
        img.alt = photo.camera.full_name;
        div.appendChild(img);
    }
};

document.addEventListener("DOMContentLoaded", async () => {
    // get rover data
    const url = domain + request;
    const json = await getJson(url); // asynchronous call to getJson()

    // store rover data
    roverData = json.rovers;
    
    // create rover options
    loadRoverOptions(getElement("#rover"), roverData);

    // change event handler for Rover drop-down
    getElement("#rover").addEventListener("change", async (evt) => {
        clearPrevious();

        // get data for currently selected rover
        const name = evt.currentTarget.value;
        const data = roverData.find(rover => rover.name == name);

        if (data) { // display options if user has selected a rover
            getElement("#options").classList.remove("hide");
            displayRoverData(data);

            // get options for camera select
            loadCameraOptions(getElement("#camera"), data.cameras);

            // get options for year, month, and date based on date range for rover 
            const landingDateParts = data.landing_date.split("-");
            const maxDateParts = data.max_date.split("-");

            loadNumericOptions(getElement("#year"), landingDateParts[0], maxDateParts[0], maxDateParts[0]);
            loadNumericOptions(getElement("#month"), 1, 12, maxDateParts[1]);
            loadNumericOptions(getElement("#date"), 1, 31, maxDateParts[2]);

        } else {    
            getElement("#options").classList.add("hide");
        }
    });

    // click event handler for View button
    getElement("#view").addEventListener("click", async () => {
        getElement("#display").textContent = "Loading...";

        // get rover, date, and camera info 
        const rover = getElement("#rover").value;
        const date = getSelectedDate();
        const camera = getElement("#camera").value;

        // build API URL
        const isAllCameras = camera.toLowerCase() == "all cameras";
        let url = `${domain}/${rover}/photos/${request}&earth_date=${date}`;
        if (!isAllCameras) {
            url += `&camera=${camera}`;
        }

        // make API call and display photo data
        const json = await getJson(url);                     // asynchronous call to getJson()
        if (!json.photos || json.photos == 0) {
            if (isAllCameras) {
                getElement("#display").textContent = `No photos for ${rover} on ${date}`;
            } else {
                getElement("#display").textContent = `No photos for ${rover} ${camera} camera on ${date}`;
            }
        } else {
            displayPhotos(getElement("#display"), json.photos);
        }
    });
});