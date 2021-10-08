let myLeads = [];
const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.getElementById("tab-btn");

// Render localStorage data if present
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    /* Same as 
      listItems +="<li><a href='" + myLeads[i] + "' target=_'blank'>" + myLeads[i] + "</a></li>";
      But more readable. Also added // before leads so that outside URLs will not be assumed by the program as directories. */
    listItems += `
          <li>
              <a href="//${leads[i]}" target="_blank"> 
                  ${leads[i]}
              </a>
          </li>`;

    /* Alternative method
          const li = document.createElement("li");
          li.textContent = myLeads[i];
          ulEl.append(li); */
  }
  ulEl.innerHTML = listItems;
}

// Save input button - Adds URL to list
inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});

// Save tab button - Gets current tab and saves it to list
tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

// Delete button - Removes all URLs from list
deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear("myLeads");
  myLeads = [];
  render(myLeads);
});
