var domains;
const blockedDomainList = document.getElementsByClassName("blockedDomain--list")[0];

chrome.storage.sync.get("thinkAgain_blockedDomains", (res) => {
    domains = Object.keys(res.thinkAgain_blockedDomains);
    console.log(domains);
    const createRow = (domain) => {
        const row = document.createElement("div");
        row.classList.add("blockDomain--list--item");
        row.id = domain;
    
        const text = document.createElement("div");
        text.classList.add("blockDomain--list--item--text")
        text.textContent = domain;
    
        const button = document.createElement("div");
        button.classList.add("blockDomain--list--item--button");
        button.textContent = "Remove";
    
        row.appendChild(text);
        row.appendChild(button);

        row.addEventListener("click", (e) => {
            if(e.target.classList.contains("blockDomain--list--item--button")){
                const domain = row.id;
                row.style.display = "none";
                delete res.thinkAgain_blockedDomains[domain];

                chrome.storage.sync.set({"thinkAgain_blockedDomains": res.thinkAgain_blockedDomains});
            }
        })
    
        return row;
    }
    
    for(var i=0 ; i<domains.length ; i++){
        const row = createRow(domains[i]);
        blockedDomainList.appendChild(row);
    }
})

