// Checking for updated tabs which are active
chrome.tabs.onUpdated.addListener((tid, _changeInfo, tab) => {
    if(tab.url && tab.active){
        chrome.tabs.sendMessage(tid, {url: tab.url});
        console.log(`Message sent - ${tab.url}`);
    }
})