// Creating faded element
const fadeDiv = document.createElement("div");
fadeDiv.style.position = "fixed";
fadeDiv.style.top = "0";
fadeDiv.style.left = "0";
fadeDiv.style.bottom = "0";
fadeDiv.style.right = "0";
fadeDiv.style.background = "rgba(50,50,50,0.5)";
fadeDiv.style.zIndex = "99999";

// Creating Message Div
const messageDiv = document.createElement("div");
messageDiv.style.position = "absolute";
messageDiv.style.width = "50%";
messageDiv.style.height = "30%";
messageDiv.style.top = "50%";
messageDiv.style.left = "50%";
messageDiv.style.transform = "translate(-50%, -50%)";
messageDiv.style.background = "#fff";
messageDiv.textContent = "Think Again";

// Appending message div to fade element
fadeDiv.appendChild(messageDiv)

// Selecting body element
const body = document.getElementsByTagName("body")[0];

// *************************************************** //
// *******************MAIN CONTENT******************** //
// *************************************************** //

chrome.runtime.onMessage.addListener((message) => {
    console.log(`Message Received - ${message.url}`);
    messageDiv.textContent = message.url;
    // body.append(fadeDiv);
    // body.style.overflow = "hidden";
})