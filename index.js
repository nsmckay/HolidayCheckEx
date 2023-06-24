let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")

const countryInput = document.getElementById("country-input")
const dateInput = document.getElementById("date-input")
const dateOutput = document.getElementById("date-output")

let today = new Date()
let todayString = today.toDateString()

let queryCountry = countryInput.value
let queryDate = today
let queryDateString = todayString

document.addEventListener('DOMContentLoaded', function() {
    dateInput.setAttribute("value", todayString)
    dateOutput.valueAsDate = today
}, false)

countryInput.addEventListener("change", function() {
    queryCountry = countryInput.value
    console.log(queryCountry)
})

dateInput.addEventListener("change", function() {
    queryDateString = dateInput.value
    console.log(queryDateString)
})

dateOutput.addEventListener("change", function() {
    queryDate = dateOutput.value
    console.log(queryDate)
})

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})