// *************************************************************************************************
// *****************************************INITIALIZTION*******************************************
// *************************************************************************************************

var lastDomain;
var syncLastDomain;
var lastTime;

const getDomain = (websiteURL) => {
    const regexSearch = websiteURL.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/i)
    const domain = regexSearch[1].split(".")[0];
    return domain;
}

// Initializing blocked domains website
chrome.storage.sync.get(null, (res) => {
    if(res.hasOwnProperty("currDate") != new Date().toDateString()){
        if(res.currDate){        
            res.currDate = new Date().toDateString();
            // WIPE
            console.log("WIPE!");
            Object.keys(res.thinkAgain_blockedDomains).forEach((domain) => res.thinkAgain_blockedDomains[domain] = [0,0,0]);
            console.log(res);
        }
    }
    else{
        res.currDate = new Date().toDateString();
        Object.keys(res.thinkAgain_blockedDomains).forEach((domain) => res.thinkAgain_blockedDomains[domain] = [0,0,0]);
        console.log(res);
    }

    if(!res.hasOwnProperty("thinkAgain_blockedDomains")){
        res.thinkAgain_blockedDomains = {};
        chrome.storage.sync.set(res, () => console.log("initialized"));
    }
    else{
        chrome.storage.sync.set(res, () => console.log("initialized"));
    }
})

// Initializeing last website and last time
// This won't be persistent so not using any kind of storage here
chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    lastDomain = getDomain(tabs[0].url);
    syncLastDomain = getDomain(tabs[0].url);
    lastTime = new Date();
});

// *************************************************************************************************
// **************************************EVENT LISTENERS********************************************
// *************************************************************************************************

// Checking for updated tabs which are active
chrome.tabs.onUpdated.addListener((tid, _changeInfo, tab) => {
    // chrome.tabs.sendMessage(tid, {status: changeInfo.status?changeInfo.status:"undefined", url: changeInfo.url?changeInfo.url:"not set yet", url2: tab.url?tab.url:"not set yet"}, (res) => console.log(res));

    if(tab.url && tab.active){
        const currDomain = getDomain(tab.url);

        if(currDomain != syncLastDomain){
            syncLastDomain = currDomain;

            const timeConsumed = (new Date() - lastTime);
            lastTime = new Date();

            chrome.storage.sync.get("thinkAgain_blockedDomains", (res) => {
                var stat = res.thinkAgain_blockedDomains;

                if(stat.hasOwnProperty(currDomain)){
                    console.log("Message sent!");
                    chrome.tabs.sendMessage(tid, {domain: currDomain, timesOpened: stat[currDomain][0], timeSpent: stat[currDomain][1]})
                }

                if(stat.hasOwnProperty(lastDomain)){
                    stat[lastDomain][0] += 1;
                    stat[lastDomain][1] += timeConsumed;

                    console.log(stat);
                    console.log(currDomain, syncLastDomain, tab.url);
                    chrome.storage.sync.set({"thinkAgain_blockedDomains" : stat}, () => lastDomain = currDomain);
                }
                else{
                    lastDomain = currDomain;
                }
            })
        }
    }
})