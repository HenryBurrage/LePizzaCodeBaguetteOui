"use strict";
function getImageData(img) {
    let src = img.src;
    return (src);
}

function getToppingsList(element) {
    console.log(element.toString());
    if (element.style.filter == "grayscale(100%)") {
        (element).style.filter = "grayscale(0%)";
    } else {
        (element).style.filter = "grayscale(100%)";
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

function toggleHam(){
    if (document.getElementById("hampic").style.visibility === "hidden"){
        document.getElementById("hampic").style.visibility = "visible";
    } else {
        document.getElementById("hampic").style.visibility = "hidden";
    }
}

function toggleChicken(){
    if (document.getElementById("chickenpic").style.visibility === "hidden"){
        document.getElementById("chickenpic").style.visibility = "visible";
    } else {
        document.getElementById("chickenpic").style.visibility = "hidden";
    }
}

function toggleBacon(){
    if (document.getElementById("baconpic").style.visibility === "hidden"){
        document.getElementById("baconpic").style.visibility = "visible";
    } else {
        document.getElementById("baconpic").style.visibility = "hidden";
    }
}

function togglePepperoni(){
    if (document.getElementById("pepperonipic").style.visibility === "hidden"){
        document.getElementById("pepperonipic").style.visibility = "visible";
    } else {
        document.getElementById("pepperonipic").style.visibility = "hidden";
    }
}

function toggleChorizo(){
    if (document.getElementById("chorizopic").style.visibility === "hidden"){
        document.getElementById("chorizopic").style.visibility = "visible";
    } else {
        document.getElementById("chorizopic").style.visibility = "hidden";
    }
}

function toggleOlive(){
    if (document.getElementById("olivepic").style.visibility === "hidden"){
        document.getElementById("olivepic").style.visibility = "visible";
    } else {
        document.getElementById("olivepic").style.visibility = "hidden";
    }
}

function toggleOnion(){
    if (document.getElementById("onionpic").style.visibility === "hidden"){
        document.getElementById("onionpic").style.visibility = "visible";
    } else {
        document.getElementById("onionpic").style.visibility = "hidden";
    }
}

function togglePepper(){
    if (document.getElementById("pepperpic").style.visibility === "hidden"){
        document.getElementById("pepperpic").style.visibility = "visible";
    } else {
        document.getElementById("pepperpic").style.visibility = "hidden";
    }
}

function togglePineapple(){
    if (document.getElementById("pineapplepic").style.visibility === "hidden"){
        document.getElementById("pineapplepic").style.visibility = "visible";
    } else {
        document.getElementById("pineapplepic").style.visibility = "hidden";
    }
}

function toggleTomato(){
    if (document.getElementById("tomatopic").style.visibility === "hidden"){
        document.getElementById("tomatopic").style.visibility = "visible";
    } else {
        document.getElementById("tomatopic").style.visibility = "hidden";
    }
}