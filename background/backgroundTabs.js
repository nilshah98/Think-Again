const getDomain = (websiteURL) => {
    const regexSearch = websiteURL.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/i)
    const domain = regexSearch[1].split(".")[0];
    return domain;
}

const contactContent = (tab,tid) => {
    if(tab.url && tab.active){
        currDomain = getDomain(tab.url);
        console.log(`Currently browsing domain - ${currDomain}`);
        
        if(currDomain != syncLastDomain){
            syncLastDomain = currDomain;

            const timeConsumed = (new Date() - lastTime);
            lastTime = new Date();

            chrome.storage.sync.get(null, (res) => {
                
                var stat = res.thinkAgain_blockedDomains;
                if(stat.hasOwnProperty(currDomain)){

                    const motivation = res.hasOwnProperty("motivation")
                                        ? res.motivation[Math.floor(Math.random()*res.motivation.length)]
                                        : "Enter some motivation in popup";

                    chrome.tabs.sendMessage(tid, 
                                            {domain: currDomain,
                                            timesOpened: stat[currDomain][0],
                                            timeSpent: stat[currDomain][1],
                                            motivation: motivation}
                                            )
                    
                    console.log(`Message sent to content script -> ${currDomain}`);
                }

                if(stat.hasOwnProperty(lastDomain)){
                    stat[lastDomain][0] += 1;
                    stat[lastDomain][1] += timeConsumed;
                    chrome.storage.sync.set({"thinkAgain_blockedDomains" : stat});
                }
                
                lastDomain = currDomain;
            })
        }
    }
}

// **************************************EVENT LISTENERS********************************************

// Checking for switched tabs which are active, but not updated
chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => contactContent(tab, activeInfo.tabId));
})

// Checking for updated tabs which are active
chrome.tabs.onUpdated.addListener((tid, _changeInfo, tab) => contactContent(tab,tid))

chrome.windows.onRemoved.addListener(() => {
    chrome.storage.sync.get(null, (res) => {
        syncLastDomain = null;
        console.log(`Get result after browser closed -> ${currDomain}`);
        
        if(res.thinkAgain_blockedDomains.hasOwnProperty(currDomain)){
            res.thinkAgain_blockedDomains[currDomain][0] += 1;
            res.thinkAgain_blockedDomains[currDomain][1] += (new Date() - lastTime);
            chrome.storage.sync.set({"thinkAgain_blockedDomains" : res.thinkAgain_blockedDomains}, () => {
                console.log(`Set result after browser closed -> ${currDomain}`);
            });
        }
    })
})