let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("list-el");
const tabBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("delete-btn");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
//console.log(leadsFromLocalStorage);

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

inputBtn.addEventListener("click", function() {
    //console.log("Input saved! via event Listener");
    newLead = inputEl.value;
    myLeads.push(newLead);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    //console.log(myLeads);
    render(myLeads);
    clearInput();
})

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear();
    myLeads = [];
    //ulEl.removeChild();
    render(myLeads);
})

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    });
})

function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        //listItems += "<li><a href='" + myLeads[i] + "' +  " + target='_blank'>" + myLeads[i] + "</a></li>";
        listItems +=
            `<li>
                <a href='${leads[i]}' target='_blank' >
                    ${leads[i]}
                </a>
            </li>`;
        //console.log(listItems);
    }
    ulEl.innerHTML = listItems;
}

function clearInput() {
    inputEl.value = "";
}