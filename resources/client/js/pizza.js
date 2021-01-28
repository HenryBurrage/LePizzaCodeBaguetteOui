"use strict";
function getImageData(img) {
    let src = img.src;
    return (src);
}

function getToppingsList(element) {
    console.log(element.toString());
    if (element.style.filter == "grayscale(0%)") {
        (element).style.filter = "grayscale(100%)";
    } else {
        (element).style.filter = "grayscale(0%)";
    }
    console.log("Invoked ToppingsList()");     //console.log your BFF for debugging client side - also use debugger statement
    const url = "/toppings/list/";    		// API method on web server will be in Users class, method list

    /*
    fetch(url, {
        method: "GET",				//Get method
    }).then(response => {
        return response.json();                 //return response as JSON
    }).then(response => {
        if (response.hasOwnProperty("Error")) { //checks if response from the web server has an "Error"
            alert(JSON.stringify(response));    // if it does, convert JSON object to string and alert (pop up window)
        } else {
            formatToppingsList(response);          //this function will create an HTML table of the data (as per previous lesson)
        }
    });

     */
}
function formatToppingsList(myJSONArray){
    let dataHTML = "";
    for (let item of myJSONArray) {
        dataHTML += "<tr><td>" + item.ToppingName + "<td><td>" + item.ToppingPrice + "<tr><td>";
    }
    document.getElementById("ToppingsTable").innerHTML = dataHTML;
}

function toggle(element){
    if (element.style.visibility === "hidden"){
        element.style.visibility = "visible";
    } else {
        element.style.visibility = "hidden";
    }
}

function updatePrice(element, toppingID) {
    debugger;
    console.log(toppingID);
    const url = "/toppings/get/"
    fetch(url + toppingID, {                // toppingID as a path parameter
        method: "GET",
    }).then(response => {
        return response.json();                         //return response to JSON
    }).then(response => {
        if (response.hasOwnProperty("Error")) {         //checks if response from server has an "Error"
            alert(JSON.stringify(response));            // if it does, convert JSON object to string and alert
        } else {
            var topping = parseFloat(response.ToppingPrice);
            var text = document.getElementById("pricetext");
            var currentPrice = parseFloat(text.innerHTML.substring(1));
            var addedPrice = parseFloat((topping / 100).toFixed(2));
            console.log(addedPrice);
            if (element.style.filter == "grayscale(0%)") {
                text.innerHTML = "£" + String(parseFloat(currentPrice += addedPrice).toFixed(2));
            } else {
                text.innerHTML = "£" + String(parseFloat(currentPrice -= addedPrice).toFixed(2));
            }

        }
    })
}

