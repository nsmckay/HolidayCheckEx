//const dayjs = require("dayjs")

//console.log(dayjs)
//const dayjs = require('dayjs')
//import dayjs from 'dayjs' // ES 2015
//dayjs().format()
//var customParseFormat = require('dayjs/plugin/customParseFormat')
//dayjs.extend(customParseFormat)

// let myLeads = []
// const inputEl = document.getElementById("input-el")
// const inputBtn = document.getElementById("input-btn")
// const ulEl = document.getElementById("ul-el")
// const deleteBtn = document.getElementById("delete-btn")
// const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
// const tabBtn = document.getElementById("tab-btn")

let myDate = []
//let myCountry = []
let myCountry = ""
const countryInput = document.getElementById("country-input")
//const countryFromLocalStorage = JSON.parse(localStorage.getItem("myCountry"))
const countryFromLocalStorage = localStorage.getItem("myCountry")
const dateInput = document.getElementById("date-input")
const dateOutput = document.getElementById("date-output")
const dateFromLocalStorage = JSON.parse(localStorage.getItem("myDate"))
const clearBtn = document.getElementById("clear-btn")

let today = new Date()
let todayString = today.toDateString()

let queryCountry = countryInput.value // country to be selected by user
let queryDate = today // date to be selected by user, initialised as today's date
let queryDateString = todayString

document.addEventListener('DOMContentLoaded', function() {
    dateInput.setAttribute("value", todayString)
    dateOutput.valueAsDate = today
    if(countryFromLocalStorage) {
        myCountry = countryFromLocalStorage
        //countryInput.value = myCountry[0].toString()
        //countryInput.setAttribute("value", myCountry[0].toString())
        countryInput.value = myCountry
        //countryInput.setAttribute("value", myCountry)
    }
    if(dateFromLocalStorage) {
        myDate = dateFromLocalStorage
        //queryDateString = myDate[0]
        queryDateString = dayjs(myDate[0]).format("MMM-DD-YYYY").toString()
        dateInput.setAttribute("value", queryDateString)
        queryDate = dayjs(myDate[0]).format("YYYY-MM-DD")
        dateOutput.value = queryDate
    }
}, false)

countryInput.addEventListener("change", function() {
    queryCountry = countryInput.value
    console.log(queryCountry)
    console.log(typeof queryCountry)
    localStorage.removeItem("myCountry")
    //myCountry = []
    //myCountry.push(queryCountry)
    myCountry = queryCountry
    console.log(myCountry)
    //localStorage.setItem("myCountry", JSON.stringify(myCountry))
    localStorage.setItem("myCountry", myCountry)
    console.log(localStorage)
})

dateInput.addEventListener("change", function() {
    queryDateString = removeDay(dateInput.value)
    console.log(queryDateString)
    console.log(typeof queryDateString)
    //queryDate = dayjs(queryDateString, "MMM-DD-YYYY").format("YYYY-MM-DD")
    queryDate = dayjs(queryDateString).format("YYYY-MM-DD")
    console.log(queryDate)
    dateOutput.value = queryDate
    localStorage.removeItem("myDate")
    myDate = []
    myDate.push(queryDate)
    localStorage.setItem("myDate", JSON.stringify(myDate))
    console.log(localStorage)
})

dateOutput.addEventListener("change", function() {
    queryDate = dateOutput.value
    dateInput.value = ""
    //dateInput.value = queryDate.toDateString()
    console.log(queryDate)
    localStorage.clear()
    myDate = []
    myDate.push(queryDate)
    localStorage.setItem("myDate", JSON.stringify(myDate))
})

function removeDay(str) {
    str = str.replace("Monday", "")
    str = str.replace("Monday ", "")
    str = str.replace("Mon", "")
    str = str.replace("Mon ", "")
    str = str.replace("Mo", "")
    str = str.replace("Mo ", "")

    str = str.replace("Tuesday", "")
    str = str.replace("Tuesday ", "")
    str = str.replace("Tues", "")
    str = str.replace("Tues ", "")
    str = str.replace("Tue", "")
    str = str.replace("Tue ", "")
    str = str.replace("Tu", "")
    str = str.replace("Tu ", "")

    str = str.replace("Wednesday", "")
    str = str.replace("Wednesday ", "")
    str = str.replace("Wed", "")
    str = str.replace("Wed ", "")
    str = str.replace("We", "")
    str = str.replace("We ", "")

    str = str.replace("Thursday", "")
    str = str.replace("Thursday ", "")
    str = str.replace("Thur", "")
    str = str.replace("Thur ", "")
    str = str.replace("Thu", "")
    str = str.replace("Thu ", "")
    str = str.replace("Th", "")
    str = str.replace("Th ", "")

    str = str.replace("Friday", "")
    str = str.replace("Friday ", "")
    str = str.replace("Fri", "")
    str = str.replace("Fri ", "")
    str = str.replace("Fr", "")
    str = str.replace("Fr ", "")

    str = str.replace("Saturday", "")
    str = str.replace("Saturday ", "")
    str = str.replace("Sat", "")
    str = str.replace("Sat ", "")
    str = str.replace("Sa", "")
    str = str.replace("Sa ", "")

    str = str.replace("Sunday", "")
    str = str.replace("Sunday ", "")
    str = str.replace("Sun", "")
    str = str.replace("Sun ", "")
    str = str.replace("Su", "")
    str = str.replace("Su ", "")

    str = str.replace("st", "") //remove end of 1st to parse correctly
    str = str.replace("nd", "") //remove end of 2nd to parse correctly
    str = str.replace("rd", "") //remove end of 3rd to parse correctly
    str = str.replace("th", "") //remove end of nth to parse correctly (4th, 5th etc.)

    if (str.charAt(0) === " ") {
        str = str.replace(" ", "") //remove space at start of string if there is one
    }

    str = str.replaceAll(" ", "-") //replace spaces with hyphens to parse more easily

    return str
}

clearBtn.addEventListener("click", function() {
    localStorage.clear()
    //myCountry = []
    myCountry = ""
    //countryInput.setAttribute("value", "UK")
    countryInput.value = myCountry
    myDate = []
    queryDateString = ""
    //dateInput.value = queryDateString
    dateInput.setAttribute("value", "")
    queryDate = today
    dateOutput.valueAsDate = queryDate
})

//if (leadsFromLocalStorage) {
    //myLeads = leadsFromLocalStorage
    //render(myLeads)
//}

// tabBtn.addEventListener("click", function(){    
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
//         myLeads.push(tabs[0].url)
//         localStorage.setItem("myLeads", JSON.stringify(myLeads) )
//         render(myLeads)
//     })
// })

// function render(leads) {
//     let listItems = ""
//     for (let i = 0; i < leads.length; i++) {
//         listItems += `
//             <li>
//                 <a target='_blank' href='${leads[i]}'>
//                     ${leads[i]}
//                 </a>
//             </li>
//         `
//     }
//     ulEl.innerHTML = listItems
// }

//deleteBtn.addEventListener("dblclick", function() {
    //localStorage.clear()
    //myLeads = []
    //render(myLeads)
//})

//inputBtn.addEventListener("click", function() {
    //myLeads.push(inputEl.value)
    //inputEl.value = ""
    //localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    //render(myLeads)
//})