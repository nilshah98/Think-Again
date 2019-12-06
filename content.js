// Creating faded element
const fadeDiv = document.createElement("div");
fadeDiv.classList.add("fadeDiv");

// Creating Message Div
const messageDiv = document.createElement("div");
messageDiv.classList.add("messageDiv");

// Appending message div to fade element
fadeDiv.appendChild(messageDiv)

// Selecting body element
const body = document.getElementsByTagName("body")[0];
const html = document.getElementsByTagName("html")[0];

// *************************************************** //
// *******************MAIN CONTENT******************** //
// *************************************************** //

chrome.runtime.onMessage.addListener((message) => {
    console.log(`Message Received - ${message.url}`);
    messageDiv.textContent = message.url;
    body.classList.add("noScroll");
    html.appendChild(fadeDiv);
})