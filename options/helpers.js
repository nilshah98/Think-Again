var domains;
const blockedDomainList = document.getElementsByClassName("blockedDomains__wrapper")[0];
const quotesList = document.getElementsByClassName("quotes__wrapper")[0];

const createDomainRow = (res, domain) => {
    const row = document.createElement("div");
    row.classList.add("list__item");
    row.id = domain;

    const text = document.createElement("div");
    text.classList.add("list__itemText")

    const textDomain = document.createElement("div");
    textDomain.textContent = `${domain}`;
    const textUnlocked = document.createElement("div");
    textUnlocked.innerHTML = `<i class="fa fa-unlock" aria-hidden="true"></i>${res.thinkAgain_blockedDomains[domain][0]}`;
    const textSpent = document.createElement("div");
    textSpent.innerHTML = `<i class="fa fa-hourglass-half" aria-hidden="true"></i>${(res.thinkAgain_blockedDomains[domain][1]/60000).toFixed(2)}`;
    
    text.appendChild(textDomain);
    text.appendChild(textUnlocked);
    text.appendChild(textSpent);

    const button = document.createElement("div");
    button.classList.add("list__itemButton");
    button.classList.add("blockedDomain__button")
    button.textContent = "Remove";

    row.appendChild(text);
    row.appendChild(button);

    row.addEventListener("click", (e) => {
        if(e.target.classList.contains("blockedDomain__button")){
            const domain = row.id;
            row.style.display = "none";
            delete res.thinkAgain_blockedDomains[domain];

            chrome.storage.sync.set({"thinkAgain_blockedDomains": res.thinkAgain_blockedDomains});
        }
    })

    return row;
}

const createQuoteList = (res,index, quote) => {
    const row = document.createElement("div");
    row.classList.add("list__item");
    row.id = index;

    const text = document.createElement("div");
    text.classList.add("list__quoteText")

    const textDomain = document.createElement("div");
    textDomain.textContent = `${quote}`;
    
    text.appendChild(textDomain);

    const button = document.createElement("div");
    button.classList.add("list__itemButton");
    button.classList.add("motivation__button")
    button.textContent = "Remove";

    row.appendChild(text);
    row.appendChild(button);

    row.addEventListener("click", (e) => {
        if(e.target.classList.contains("motivation__button")){
            const index = row.id;
            row.style.display = "none";
            res.motivation.splice(index,1);

            chrome.storage.sync.set({"motivation": res.motivation});
        }
    })

    return row;
}
