"use strict";
function getUsersList() {
    //debugger;
    console.log("Invoked getUsersList()");     //console.log your BFF for debugging client side - also use debugger statement
    const url = "/users/list/";    		// API method on web server will be in Users class, method list
    fetch(url, {
        method: "GET",				//Get method
    }).then(response => {
        return response.json();                 //return response as JSON
    }).then(response => {
        if (response.hasOwnProperty("Error")) { //checks if response from the web server has an "Error"
            alert(JSON.stringify(response));    // if it does, convert JSON object to string and alert (pop up window)
        } else {
            formatUsersList(response);          //this function will create an HTML table of the data (as per previous lesson)
        }
    });
}

function formatUsersList(myJSONArray){
    let dataHTML = "";
    for (let item of myJSONArray) {
        dataHTML += "<tr><td>" + item.UserID + "<td><td>" + item.Email + "<tr><td>";
    }
    document.getElementById("UsersTable").innerHTML = dataHTML;
}

function getUser() {
    debugger;
    console.log("Invoked getUser()");     //console.log your BFF for debugging client side
    const UserID = document.getElementById("UserID").value;  //get the UserId from the HTML element with id=UserID
    //let UserID = 1; 			  //You could hard code it if you have problems
    //debugger;				  //debugger statement to allow you to step through the code in console dev F12
    const url = "/users/get/";           // API method on webserver
    fetch(url + UserID,{                // UserID as a path parameter
        method: "GET",
    }).then(response => {
        return response.json();                         //return response to JSON
    }).then(response => {
        if (response.hasOwnProperty("Error")) {         //checks if response from server has an "Error"
            alert(JSON.stringify(response));            // if it does, convert JSON object to string and alert
        } else {
            document.getElementById("DisplayOneUser").innerHTML = response.UserID + " " + response.Email;  //output data
        }
    })
}

function addUser() {
    debugger;
    console.log("Invoked AddUser()");
    const formData = new FormData(document.getElementById('InputUserDetails'));
    let url = "/users/add";
    fetch(url, {
        method: "POST",
        body: formData,
    }).then(response => {
        return response.json()
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));
        } else {
            window.open("/client/welcome.html", "_self");   //URL replaces the current page.  Create a new html file
        }                                                  //in the client folder called welcome.html
    });
}

function UsersLogin() {
    //debugger;
    console.log("Invoked UsersLogin() ");
    let url = "/users/login";
    let formData = new FormData(document.getElementById('LoginForm'));

    fetch(url, {
        method: "POST",
        body: formData,
    }).then(response => {
        return response.json();                 //now return that promise to JSON
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));        // if it does, convert JSON object to string and alert
        } else {
            Cookies.set("Token", response.Token);
            Cookies.set("Email", response.Email);
            window.open("index.html", "_self");       //open index.html in same tab
        }
    });
}

function logout() {
    debugger;
    console.log("Invoked logout");
    let url = "/users/logout";
    fetch(url, {method: "POST"
    }).then(response => {
        return response.json();                 //now return that promise to JSON
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));        // if it does, convert JSON object to string and alert
        } else {
            Cookies.remove("Token", response.Token);    //UserName and Token are removed
            Cookies.remove("Email", response.Email);
            window.open("login.html", "_self");       //open index.html in same tab
        }
    });
}

