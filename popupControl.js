const addButton = document.getElementsByClassName("button")[0];
const websiteInp = document.getElementsByClassName("input")[0];

addButton.addEventListener("click",(e) => {
    const website = websiteInp.value;
    chrome.storage.sync.get(["thinkAgain_blockedDomains"], (res) => {
        if(!res.thinkAgain_blockedDomains.hasOwnProperty(website)){
            res.thinkAgain_blockedDomains[website] = [0,0,0]
            const fin = res.thinkAgain_blockedDomains;
            chrome.storage.sync.set({"thinkAgain_blockedDomains": fin});
        }
    })
})
