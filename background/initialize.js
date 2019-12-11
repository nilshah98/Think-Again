
var lastDomain = null;
var syncLastDomain = null;
var lastTime = new Date();
var currDomain = null;

chrome.storage.sync.get(null, (res) => {

    if(!res.hasOwnProperty("thinkAgain_blockedDomains")){
        res.thinkAgain_blockedDomains = {};
    }

    if(!res.hasOwnProperty("motivation")){
        res.motivation = ["You got this"];
    }

    if(!res.hasOwnProperty("redirect")){
        res.redirect = "https://www.google.com/";
    }

    if(res.hasOwnProperty("currDate")){
        if(res.currDate  != new Date().toDateString()){        
            res.currDate = new Date().toDateString();

            // WIPE
            Object.keys(res.thinkAgain_blockedDomains)
                    .forEach((domain) => res.thinkAgain_blockedDomains[domain] = [0,0,0]);
        }
    }
    else{
        res.currDate = new Date().toDateString();

        // WIPE
        Object.keys(res.thinkAgain_blockedDomains)
                .forEach((domain) => res.thinkAgain_blockedDomains[domain] = [0,0,0]);
    }

    // Update chrome storage
    chrome.storage.sync.set(res, () => console.log("initialized"));
})
