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
// carryOn.classList.add("blocked");
carryOn.textContent = "carry on...";

// Create get me out of here
const getMeOut = document.createElement("div");
getMeOut.classList.add("button");
getMeOut.classList.add("getMeOut");
// getMeOut.classList.add("blocked");
getMeOut.textContent = "get me out!";

// creating messageButton
const messageButtons = document.createElement("div");
messageButtons.classList.add("messageButtons");
// messageButtons.classList.add("noCursor");

// creating messageText
const messageText = document.createElement("div");
messageText.classList.add("messageList");

// Appending message div to fade element
messageButtons.appendChild(carryOn);
messageButtons.appendChild(getMeOut);
messageDiv.appendChild(messageText);
messageDiv.appendChild(messageButtons);
fadeDiv.appendChild(messageDiv);

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
    messageText.textContent = `You've opened 👀 ${message.domain} for 🔓 ${message.timesOpened} times today and used ⏳ ${((message.timeSpent)/60000).toFixed(2)} minutes today`;
    html.classList.add("noScroll");
    html.appendChild(fadeDiv);

    // setTimeout(() => {
    //     carryOn.classList.remove("blocked");
    //     getMeOut.classList.remove("blocked");
    //     messageButtons.classList.remove("noCursor");
    // }, 5000);
})