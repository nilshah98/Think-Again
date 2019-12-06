const addButton = document.getElementsByClassName("button")[0];
const websiteInp = document.getElementsByClassName("input")[0];

addButton.addEventListener("click",(e) => {
    const website = websiteInp.value;
    chrome.storage.sync.set({name: website}, function() {
        console.log('Value is set to ' + website);
    });
})