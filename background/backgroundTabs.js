// *************************************************************************************************
// *******************************VARIABLES AND HELPER FUNCTIONS************************************
// *************************************************************************************************

// lastDomain and lastTime are not persistent, so stored as is.
// Need to use lastDomain to update in chrome storage
var lastDomain = null;
// SyncLastDomain so as to not get any lags with other concurrent events
var syncLastDomain = null;
var lastTime = new Date();
var currDomain = null;

const getDomain = (websiteURL) => {
    const regexSearch = websiteURL.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/i)
    const domain = regexSearch[1].split(".")[0];
    return domain;
}

const contactContent = (tab,tid) => {
    if(tab.url && tab.active){
        currDomain = getDomain(tab.url);

        if(currDomain != syncLastDomain){
            syncLastDomain = currDomain;

            const timeConsumed = (new Date() - lastTime);
            lastTime = new Date();

            chrome.storage.sync.get(null, (res) => {
                var stat = res.thinkAgain_blockedDomains;

                if(stat.hasOwnProperty(currDomain)){
                    console.log(`Message sent! ${currDomain}`);
                    
                    const motivation = res.hasOwnProperty("motivation") ? res.motivation[Math.floor(Math.random()*res.motivation.length)] : "Enter some motivation in popup";

                    chrome.tabs.sendMessage(tid, {domain: currDomain, timesOpened: stat[currDomain][0], timeSpent: stat[currDomain][1], motivation: motivation})
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
}

// *************************************************************************************************
// *****************************************INITIALIZTION*******************************************
// *************************************************************************************************

// Initializing blocked domains website
chrome.storage.sync.get(null, (res) => {

    // Check and initialize thinkAgain_blockedDomains
    if(!res.hasOwnProperty("thinkAgain_blockedDomains")){
        res.thinkAgain_blockedDomains = {};
    }

    if(!res.hasOwnProperty("motivation")){
        res.motivation = ["You got this"];
    }

    if(!res.hasOwnProperty("redirect")){
        res.redirect = "https://www.google.com/";
    }

    // Check and initialize currDate 
    if(res.hasOwnProperty("currDate")){
        if(res.currDate  != new Date().toDateString()){        
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

    // Update chrome storage
    chrome.storage.sync.set(res, () => console.log("initialized"));
})

// Initializeing last website and last time
// This won't be persistent so not using any kind of storage here
// chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
//     lastDomain = getDomain(tabs[0].url);
//     syncLastDomain = getDomain(tabs[0].url);
//     lastTime = new Date();
// });

// *************************************************************************************************
// **************************************EVENT LISTENERS********************************************
// *************************************************************************************************

// Checking for switched tabs which are active, but not updated
chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => contactContent(tab, activeInfo.tabId));
})

// Checking for updated tabs which are active
chrome.tabs.onUpdated.addListener((tid, _changeInfo, tab) => contactContent(tab,tid))

chrome.windows.onRemoved.addListener(() => {
    chrome.storage.sync.get(null, (res) => {
        syncLastDomain = null;
        console.log(`Got result after browser closed ${currDomain}`);
        if(res.thinkAgain_blockedDomains.hasOwnProperty(currDomain)){
            res.thinkAgain_blockedDomains[currDomain][0] += 1;
            res.thinkAgain_blockedDomains[currDomain][1] += (new Date() - lastTime);
            chrome.storage.sync.set({"thinkAgain_blockedDomains" : res.thinkAgain_blockedDomains}, () => {
                lastDomain = null;
                console.log("Set result after browser closed");
            });
        }
    })
})