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
