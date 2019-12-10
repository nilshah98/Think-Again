console.log("Loaded content script");

const totalMS = 1000*60*60*24;

// Creating faded element
const fade = document.createElement("div");
fade.classList.add("fade");

// Creating Message Div
const messageDiv = document.createElement("div");
messageDiv.classList.add("message__container");

// creating messageButton
const messageButtons = document.createElement("div");
messageButtons.classList.add("message__buttonContainer");

// creating messageText
const messageTexts = document.createElement("div");
messageTexts.classList.add("message__textContainer");

// Creating domain name | times opened | time consumed | total time left in day div
const textDomain = document.createElement("div");
textDomain.classList.add("message__text");
const textOpened = document.createElement("div");
textOpened.classList.add("message__text");
const textSpent = document.createElement("div");
textSpent.classList.add("message__text");

// Creating time left div
const timeLeftWrapper = document.createElement("div");
timeLeftWrapper.classList.add("message__timeLeftWrapper");
const timeLeft = document.createElement("div");
timeLeft.classList.add("message__timeLeft");
// Weirdly doesn't work with template string, needto append after template string declared
// timeLeftWrapper.appendChild(timeLeft);

// Creating motivation line
const motivationalQuote = document.createElement("div");
motivationalQuote.classList.add("message__motivation");

// Create carry on button
const carryOn = document.createElement("div");
carryOn.classList.add("message__button");
carryOn.classList.add("carryOn");
carryOn.textContent = "carry on";

// Create get me out of here
const getMeOut = document.createElement("div");
getMeOut.classList.add("message__button");
getMeOut.classList.add("getMeOut");
getMeOut.textContent = "get me out";

// Appending message div to fade element
messageButtons.appendChild(carryOn);
messageButtons.appendChild(getMeOut);

messageTexts.appendChild(textDomain);
messageTexts.appendChild(textOpened);
messageTexts.appendChild(textSpent);

messageDiv.appendChild(motivationalQuote);
messageDiv.appendChild(messageTexts);
messageDiv.appendChild(timeLeftWrapper);

messageDiv.appendChild(messageButtons);
fade.appendChild(messageDiv);

// Selecting html element
const html = document.getElementsByTagName("html")[0];

carryOn.addEventListener("click",() => {
    html.removeChild(fade);
    html.classList.remove("noScroll");
})

getMeOut.addEventListener("click",() => {
    chrome.storage.sync.get(null, (res) => document.location = res.hasOwnProperty("redirect") ? res.redirect : "https://www.google.com/");
})

// ********************************************************************************************************************************** //
// ******************************************************MAIN CONTENT**************************************************************** //
// ********************************************************************************************************************************** //

const dispMessage = (message) => {
    console.log("message received");
    console.log(message);

    var now = new Date()
    var then = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,0,0)
    var diff = now.getTime() - then.getTime(); // difference in milliseconds

    const percentUsed = (diff/totalMS)*100;
    timeLeft.style.width = `${percentUsed}%`;

    timeLeftWrapper.textContent = `Time Left in your day...  ${(100-percentUsed).toFixed(2)}%`;
    timeLeftWrapper.appendChild(timeLeft);

    textDomain.innerHTML = `Stop accessing, <span class="message__highlight">${message.domain}</span>`;
    textOpened.innerHTML = `You've unlocked it <span class="message__highlight">${message.timesOpened}</span> times today`;
    textSpent.innerHTML = `And spent <span class="message__highlight">${((message.timeSpent)/60000).toFixed(2)}</span> minutes today`;
    
    motivationalQuote.textContent = `${message.motivation}`;

    html.classList.add("noScroll");
    html.appendChild(fade);
}

chrome.runtime.onMessage.addListener((message,_sender,_sendResponse) => {
    dispMessage(message);
})
