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
    const websiteURL = message.url;
    const regexSearch = websiteURL.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/i)
    const domain = regexSearch[1].split(".")[0];

    chrome.storage.sync.get(['name'], function(result) {
        if(result.name === domain){
            messageDiv.textContent = websiteURL;
            body.classList.add("noScroll");
            html.appendChild(fadeDiv);
        }
    });
})