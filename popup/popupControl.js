const domainAdd = document.getElementsByClassName("form__button")[0];
const domainInp = document.getElementsByClassName("form__input")[0];

const redirectAdd = document.getElementsByClassName("form__button")[1];
const redirectInp = document.getElementsByClassName("form__input")[1];

const motivationAdd = document.getElementsByClassName("form__button")[2];
const motivationInp = document.getElementsByClassName("form__input")[2];


domainAdd.addEventListener("click",(_e) => {
    const website = domainInp.value;
    chrome.storage.sync.get(["thinkAgain_blockedDomains"], (res) => {
        if(!res.thinkAgain_blockedDomains.hasOwnProperty(website)){
            res.thinkAgain_blockedDomains[website] = [0,0,0]
            const fin = res.thinkAgain_blockedDomains;
            chrome.storage.sync.set({"thinkAgain_blockedDomains": fin},(_res) => domainInp.value = "");
        }
        domainInp.value = "";
    })
})

redirectAdd.addEventListener("click",(_e) => {
    const redirect = redirectInp.value;
    chrome.storage.sync.set({"redirect":redirect}, (_res) => redirectInp.value = "");
})

const openOptions = document.getElementsByClassName("openOptions")[0];
openOptions.addEventListener("click", () => chrome.runtime.openOptionsPage());

motivationAdd.addEventListener("click",(_e) => {
    chrome.storage.sync.get(null,(res)=>{
        if(res.hasOwnProperty("motivation")){
            var quotes = res.motivation.concat(motivationInp.value);
        }
        else{
            var quotes = [motivationInp.value];
        }

        console.log(quotes);
        chrome.storage.sync.set({"motivation": quotes}, (_res) => motivationInp.value = "" );
    })
})
