var domains;
const blockedDomainList = document.getElementsByClassName("blockedDomain--list")[0];

chrome.storage.sync.get("thinkAgain_blockedDomains", (res) => {
    domains = Object.keys(res.thinkAgain_blockedDomains);
    console.log(domains);
    const createRow = (domain) => {
        const row = document.createElement("div");
        row.classList.add("blockDomain--list--item");
    
        const text = document.createElement("div");
        text.classList.add("blockDomain--list--item--text")
        text.textContent = domain;
    
        const button = document.createElement("div");
        button.classList.add("blockDomain--list--item--button");
        button.textContent = "X";
    
        row.appendChild(text);
        row.appendChild(button);
    
        return row;
    }
    
    for(var i=0 ; i<domains.length ; i++){
        const row = createRow(domains[i]);
        blockedDomainList.appendChild(row);
    }
})

