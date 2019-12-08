console.log("Loaded content script");

// Creating faded element
const fadeDiv = document.createElement("div");
fadeDiv.classList.add("fadeDiv");

// Creating Message Div
const messageDiv = document.createElement("div");
messageDiv.classList.add("messageDiv");

// Create carry on button
const carryOn = document.createElement("div");
carryOn.classList.add("button");
carryOn.classList.add("carryOn");
carryOn.textContent = "carry on...";

// Create get me out of here
const getMeOut = document.createElement("div");
getMeOut.classList.add("button");
getMeOut.classList.add("getMeOut");
getMeOut.textContent = "get me out!";

// Appending message div to fade element
fadeDiv.appendChild(messageDiv);
console.log("Appended buttons and message div");

// Selecting body element
// const body = document.getElementsByTagName("body")[0];
const html = document.getElementsByTagName("html")[0];

carryOn.addEventListener("click",() => {
    html.removeChild(fadeDiv);
    html.classList.remove("noScroll");
})

getMeOut.addEventListener("click",() => {
    document.location = "https://www.google.com/";
})

// *************************************************** //
// *******************MAIN CONTENT******************** //
// *************************************************** //

chrome.runtime.onMessage.addListener((message,_sender,_sendResponse) => {
    console.log("message received");
    console.log(message);
    messageDiv.textContent = `You've opened ${message.domain} for ${message.timesOpened} times today and used ${(message.timeSpent)/1000} seconds today`;
    messageDiv.appendChild(carryOn);
    messageDiv.appendChild(getMeOut);
    html.classList.add("noScroll");
    html.appendChild(fadeDiv);
})