import { DateTime } from "./node_modules/luxon/src/luxon.js"

let myDate = []
let myCountry = ""

const countryInput = document.getElementById("country-input")
const countryFromLocalStorage = localStorage.getItem("myCountry")
const dateInput = document.getElementById("date-input")
const dateOutput = document.getElementById("date-output")
const dateFromLocalStorage = JSON.parse(localStorage.getItem("myDate"))
const infoBtn = document.getElementById("info-btn")
const checkBtn = document.getElementById("check-btn")
const apiKey = "a82fc2684f33c2d3df3f24d9f2436d3aa492e050" // API key from Calendarific
const clearBtn = document.getElementById("clear-btn")
const info = document.getElementById("info")
const errors = document.getElementById("error")
const results = document.getElementById("results")
const checkImg = document.getElementById("check-img")
const checkAnswer = document.getElementById("check-answer")
const checkResult = document.getElementById("check-result")
const checkResultType = document.getElementById("check-result-type")
const checkResultDesc = document.getElementById("check-result-desc")

let today = new Date()
let todayString = today.toDateString()
let queryCountry = countryInput.value // country to be selected by user
let queryDate = today // date to be selected by user, initialised as today's date
let queryDateString = todayString

document.addEventListener('DOMContentLoaded', function() {
    info.style.display = "none" // hide divs storing info not needed until later
    errors.style.display = "none"
    results.style.display = "none"
    dateInput.setAttribute("value", todayString) // date input value initialised as today's date
    dateOutput.valueAsDate = today
    if(countryFromLocalStorage) { // if country already in local storage, use that instead of default
        myCountry = countryFromLocalStorage
        countryInput.value = myCountry
    }
    if(dateFromLocalStorage) { // if date already in local storage, use that instead of default
        myDate = dateFromLocalStorage
        //queryDateString = dayjs(myDate[0]).format("MMM-DD-YYYY").toString()
        queryDateString = new DateTime(myDate[0]).toFormat('MMM-dd-yyyy')
        dateInput.setAttribute("value", queryDateString)
        //queryDate = dayjs(myDate[0]).format("YYYY-MM-DD")
        console.log(queryDate)
        console.log(myDate[0])
        console.log(typeof(myDate[0]))
        //queryDate = DateTime.fromJSDate(myDate[0], "yyyy-MM-dd")
        queryDate = DateTime.fromISO(myDate[0]).toFormat("yyyy-MM-dd")
        console.log(queryDate)
        console.log(typeof(queryDate))
        dateOutput.value = queryDate
    }
}, false)

countryInput.addEventListener("change", function() {
    queryCountry = countryInput.value
    //console.log(queryCountry)
    //console.log(typeof queryCountry)
    localStorage.removeItem("myCountry") // clear existing country in local storage
    myCountry = queryCountry
    //console.log(myCountry)
    localStorage.setItem("myCountry", myCountry) // store country selected by user in local storage
    //console.log(localStorage)
})

dateInput.addEventListener("change", function() {
    queryDateString = removeDay(dateInput.value)
    console.log(queryDateString)
    console.log(typeof queryDateString)
    //queryDate = dayjs(queryDateString).format("YYYY-MM-DD")
    //queryDate = new DateTime.fromJSDate(queryDateString, "yyyy-MM-dd")
    queryDate = DateTime.fromISO(queryDateString).toFormat("yyyy-MM-dd")
    console.log(queryDate)
    dateOutput.value = queryDate // set date output on right to same date as chosen by user on left input
    localStorage.removeItem("myDate") // clear existing date in local storage
    myDate = []
    myDate.push(queryDate)
    localStorage.setItem("myDate", JSON.stringify(myDate)) // store date selected by user in local storage
    //console.log(localStorage)
})

dateOutput.addEventListener("change", function() { // if user selects date using calendar in right date output box
    queryDate = dateOutput.value
    dateInput.value = ""
    console.log(queryDate)
    localStorage.clear() // clear existing date in local storage
    myDate = []
    myDate.push(queryDate)
    localStorage.setItem("myDate", JSON.stringify(myDate)) // store date selected by user in local storage
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

    str = str.replace("January", "01") //luxon doesn't parse months as words, so they need to be changed to numbers
    str = str.replace("January ", "01")
    str = str.replace("Jan", "01")
    str = str.replace("Jan ", "01")

    str = str.replace("February", "02")
    str = str.replace("February ", "02")
    str = str.replace("Feb", "02")
    str = str.replace("Feb ", "02")

    str = str.replace("March", "03")
    str = str.replace("March ", "03")
    str = str.replace("Mar", "03")
    str = str.replace("Mar ", "03")

    str = str.replace("April", "04")
    str = str.replace("April ", "04")
    str = str.replace("Apr", "04")
    str = str.replace("Apr ", "04")

    str = str.replace("May", "05")
    str = str.replace("May ", "05")

    str = str.replace("June", "06")
    str = str.replace("June ", "06")
    str = str.replace("Jun", "06")
    str = str.replace("Jun ", "06")

    str = str.replace("July", "07")
    str = str.replace("July ", "07")
    str = str.replace("Jul", "07")
    str = str.replace("Jul ", "07")

    str = str.replace("August", "08")
    str = str.replace("August ", "08")
    str = str.replace("Aug", "08")
    str = str.replace("Aug ", "08")

    str = str.replace("September", "09")
    str = str.replace("September ", "09")
    str = str.replace("Sept", "09")
    str = str.replace("Sept ", "09")
    str = str.replace("Sep", "09")
    str = str.replace("Sep ", "09")

    str = str.replace("October", "10")
    str = str.replace("October ", "10")
    str = str.replace("Oct", "10")
    str = str.replace("Oct ", "10")

    str = str.replace("November", "11")
    str = str.replace("November ", "11")
    str = str.replace("Nov", "11")
    str = str.replace("Nov ", "11")

    str = str.replace("December", "12")
    str = str.replace("December ", "12")
    str = str.replace("Dec", "12")
    str = str.replace("Dec ", "12")

    if (str.charAt(0) === " ") {
        str = str.replace(" ", "") //remove space at start of string if there is one
    }

    str = str.replaceAll(" ", "-") //replace spaces with hyphens to parse more easily

    return str
}

infoBtn.addEventListener("click", function() { //toggle visibility of div containing disclaimer and info on how to use extension
    if (info.style.display === "none") {
        info.style.display = "block"
    } else {
        info.style.display = "none"
    }
})

checkBtn.addEventListener("click", function() {

    console.log(Date.parse(dateOutput.value))
    console.log(Date.parse(typeof dateOutput.value))
    if(isNaN(Date.parse(dateOutput.value))) { //check if date is valid by converting to number
        //console.log("NOT A DATE!")
        errors.style.display = "block"
        return //if inputs invalid, display error and end function early
    } else {
         //console.log("IS A DATE!")
         errors.style.display = "none"
    }

    results.style.display = "block" // make holiday query results div visible
    let apiCountry = "gb"
    if(myCountry === "UK") { // country selected by user must be changed to format used by API
        apiCountry = "gb"
    } else if (myCountry === "USA") {
        apiCountry = "us"
    } else {
        apiCountry = "gb" // default to UK if myCountry is anything other than the above
    }
    //console.log(apiCountry)

    //let apiDate = dayjs(myDate[0]).format("MM-DD-YYYY").toString()
    let apiDate = new DateTime(myDate[0]).toFormat('MM-dd-yyyy')
    let apiYear = apiDate.slice(-4)
    let apiMonth = apiDate.slice(0, 2)
    let apiDay = apiDate.slice(3, 5)
    console.log(apiDate)
    //console.log(apiYear)
    //console.log(apiMonth)
    //console.log(apiDay)

    console.log(`https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=${apiCountry}&year=${apiYear}&month=${apiMonth}&day=${apiDay}`)

    fetch(`https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=${apiCountry}&year=${apiYear}&month=${apiMonth}&day=${apiDay}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            console.log(data.response.holidays.length)
            if(data.response.holidays.length === 0) { // if API array containing holidays is empty, means there is not a holiday that day for that country
                console.log(`NO, ${apiDate} is NOT a holiday.`)
                checkImg.src = "NoIcon.png"
                checkImg.alt = "NO"
                checkAnswer.innerText = `NO, ${apiDate} is NOT a holiday.`
                checkResult.innerText = ""
                checkResultType.innerText = ""
                checkResultDesc.innerText = ""
            } else {
                console.log(`YES, ${apiDate} IS a holiday.`)
                checkImg.src = "YesIcon.png"
                checkImg.alt = "YES"
                checkAnswer.innerText = `YES, ${apiDate} IS a holiday.`
                checkResult.innerText = `It is ${data.response.holidays[0].name}`
                checkResultType.innerText = `${data.response.holidays[0].name} is a ${data.response.holidays[0].type}`
                checkResultDesc.innerText = `${data.response.holidays[0].description}`
            }
        })
})

clearBtn.addEventListener("click", function() { // clear values for all inputs
    localStorage.clear()
    myCountry = ""
    countryInput.value = myCountry
    myDate = []
    queryDateString = ""
    dateInput.setAttribute("value", "")
    queryDate = today
    dateOutput.valueAsDate = queryDate
})