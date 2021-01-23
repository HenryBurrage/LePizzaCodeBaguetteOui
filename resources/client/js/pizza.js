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

function updatePrice(element){
    let text = document.getElementsByClassName("pricetext");
    console.log(parseFloat(text));
    if (element.style.filter == "grayscale(0%)") {
        text.innerHTML = text.value += 1;
    } else {
        text.innerHTML = text -= 1;
    }
}