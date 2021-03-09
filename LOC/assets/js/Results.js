const cards = document.querySelectorAll(".results-card")
const dates = document.querySelectorAll(".date");
const subjects = document.querySelectorAll(".subjects");
const descriptions = document.querySelectorAll(".description");
const buttons = document.querySelectorAll(".read-more")



const LOCURL        = "https://www.loc.gov/";
const LOCformatJSON = "&fo=json";
// const LOCformatList = ["search/", "maps/", "audio/", "photos/", "manuscripts/", "newspapers/", "film-and-videos/", "notated-music/", "websites/"];
const LOCqueryParam = "?q=";
const LOCreturnCount= "&c=";
const LOCpageNumber = "&sp=";

const resultsPerPage = 5;

window.onload = loadResults;


/**
 * 
 * @returns Argument Array from current URL [query, format, page]
 */
function parseURL(){

    let here = window.location;
    let currentURL = here.href;
    let URLArgs = currentURL.split("?");
    URLArgs = URLArgs[1].split("&");
    URLArgs = [
        URLArgs[0].split("=")[1], 
        URLArgs[1].split("=")[1], 
        URLArgs[2].split("=")[1]
    ]
    console.log(URLArgs)
    return URLArgs;
}


/**
 * 
 * @param {Array} args Expects 3 item array with Query term, File format, and Page number
 * @returns Returns results data from Library of Congress
 */
async function fetchData(args){

    let query = args[0];
    let format = args[1];
    let page = args[2];
    if(format === ""){format = "search";}

    let fetchMe = `${LOCURL + format}/${LOCqueryParam}${query}${LOCformatJSON}${LOCreturnCount}${resultsPerPage}${LOCpageNumber}${page}`;

    console.log(fetchMe);

    let response = await fetch(fetchMe);
    let data = await response.json();

    let results = data.results;

    return results;

}




async function loadResults(){

    let currentPageResult = await fetchData(parseURL());
    console.log(currentPageResult);

    for (let j = 0; j < 5; j++) {
        
        const cpr = currentPageResult[j];

        let activeURL = cpr.url;
        let activeSubjects = cpr.subject.join(", ");
        let activeDescription = cpr.description[0];
        let activeDate = cpr.date;
        let activeHeading = cpr.title;

        cards[j].childNodes[1].textContent = activeHeading;
        dates[j].textContent = activeDate;
        subjects[j].textContent = activeSubjects;
        descriptions[j].textContent = activeDescription;
        buttons[j].setAttribute("href", activeURL);

    }




}