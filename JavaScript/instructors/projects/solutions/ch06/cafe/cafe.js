"use strict";
const getElement = selector => document.querySelector(selector);

const getSelectedProduct = src => {
    if (src.endsWith("biscotti.jpg")) {
        return ["biscotti", 1.95, "Biscotti"];
    } else if (src.endsWith("cappuccino.jpg")) {
        return ["cappuccino", 3.45, "Cappuccino"];
    } else if (src.endsWith("coffee.jpg")) {
        return ["drip", 1.75, "Drip coffee"];
    } else if (src.endsWith("espresso.jpg")) {
        return ["espresso", 1.95, "Espresso"];
    } else if (src.endsWith("latte.jpg")) {
        return ["latte", 2.95, "Latte"];
    } else if (src.endsWith("scone.jpg")) {
        return ["scone", 2.95, "Scone"];
    } else {
        return [];
    }
};

document.addEventListener("DOMContentLoaded", () => {
    let total = 0;

    const allImages = document.querySelectorAll("#menu-list img");
    for (let img of allImages) {
        // preload rollover image (url in id attribute) 
        const rolloverImage = new Image();
        rolloverImage.src = img.id;

        // save original image src
        const origSrc = img.src; 

        // set up image event handlers
        img.addEventListener("mouseover", () => {
            img.src = rolloverImage.src;
        }); 
        
        img.addEventListener("mouseout", () => {
            img.src = origSrc;  
        }); 

        img.addEventListener("click", evt => {
            // get data for selected item 
            const selected = getSelectedProduct(origSrc);

            // get <select> element that displays order details
            const order = getElement("#order");

            // add to order details
            const option = document.createElement("option");    // create <option> element
            option.setAttribute("value", selected[0]);          // add value attribute to <option>
            const text = `$${selected[1]} - ${selected[2]}`;    
            option.appendChild(document.createTextNode(text));  // add text to <option>
            order.appendChild(option);                          // add <option> to <select>

            // update total
            total += selected[1];
            getElement("#total").textContent = `Total: $${total.toFixed(2)}`;
            
            // cancel default event of the clicked link
            evt.preventDefault();
        }); 
    }

    // add click event handler for check out button
    getElement("#place_order").addEventListener("click", () => {
        if (getElement("#order").textContent) {
            getElement("#order_form").submit();
        } else {
            alert ("Please add at least one item to your order.");
        }
    }); 
    
    // add click event handler for clear button
    getElement("#clear_order").addEventListener("click", () => {
        total = 0;
        getElement("#order").textContent = "";
        getElement("#total").textContent = "";
    }); 
    
}); 