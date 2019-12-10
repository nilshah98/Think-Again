// Execute at document_end, for switching tabs
chrome.runtime.onMessage.addListener((message,_sender,_sendResponse) => {
    dispMessage(message);
})