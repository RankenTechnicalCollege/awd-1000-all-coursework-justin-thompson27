"use strict";

// the event handler for the click event of each <h2> element
const toggleVisibility = evt => {
	// get all <h2> elements
    const h2s = evt.currentTarget.parentNode.querySelectorAll("h2");

	// toggle clicked <h2> and sibling <div>, remove class attributes from all other <h2> and sibling <div>
    for (let h2 of h2s) {
		if (h2 == evt.currentTarget) {
			h2.classList.toggle("minus");
			h2.nextElementSibling.classList.toggle("open");
		} else {
            h2.classList.remove("minus");
            h2.nextElementSibling.classList.remove("open");
        }
    }
	
	evt.preventDefault();           // cancel default action of h2's child <a>
};

document.addEventListener("DOMContentLoaded", () => {
	// get the <h2> elements
	const h2s = document.querySelectorAll("#faqs h2");
	
	// attach event handler for each <h2> element
	for (let h2 of h2s) {
		h2.addEventListener("click", toggleVisibility);
	}
	
	// set focus on first <a> element
	h2s[0].firstChild.focus();
});