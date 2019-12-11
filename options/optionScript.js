chrome.storage.sync.get(null, (res) => {
    domains = Object.keys(res.thinkAgain_blockedDomains);
    console.log(domains);

    for(var i=0 ; i<domains.length ; i++){
        const row = createDomainRow(res, domains[i]);
        blockedDomainList.appendChild(row);
    }

    if(res.hasOwnProperty("motivation")){
        res.motivation.forEach((element,index) => {
            const row = createQuoteList(res,index,element);
            quotesList.appendChild(row);
        });
    }

    const redirectWrapper = document.getElementsByClassName("redirect__wrapper")[0];
    const redirectText = document.createElement("div");
    redirectText.classList.add("redirect__text");
    redirectText.innerHTML = `Currently redirecting to- <b>${res.redirect}</b>, to change this, add new valid redirect in popup menu`;
    redirectWrapper.appendChild(redirectText);

})

