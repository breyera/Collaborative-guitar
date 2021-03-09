
/** IMPORTS */
const cards = document.querySelectorAll(".results-card")
const dates = document.querySelectorAll(".date");
const subjects = document.querySelectorAll(".subjects");
const descriptions = document.querySelectorAll(".description");
const buttons = document.querySelectorAll(".read-more")


/** URL FORMATTING FOR FETCH REQUEST */
const LOCURL        = "https://www.loc.gov/";
const LOCqueryParam = "?q=";
const LOCformatJSON = "&fo=json";
// const LOCformatList = ["search/", "maps/", "audio/", "photos/", "manuscripts/", "newspapers/", "film-and-videos/", "notated-music/", "websites/"];
const LOCreturnCount= "&c=";
const LOCpageNumber = "&sp=";

const resultsPerPage = 5;

/**
 * 
 * @returns Argument Array from current URL [query, format, page]
 */
function parseURL(){

    let here = window.location;             //
    let currentURL = here.href;             //Current URL
    let URLArgs = currentURL.split("?");    //Make an array splitting URL and search terms
    URLArgs = URLArgs[1].split("&");        //Split Arguments into array of args
    URLArgs = [
        URLArgs[0].split("=")[1],           //Only save args not labels VALUES NOT KEYS
        URLArgs[1].split("=")[1], 
        URLArgs[2].split("=")[1]
    ]
    //console.log(URLArgs)
    return URLArgs;
}
/**
 * 
 * @param {Array} args Expects 3 item array with Query term, File format, and Page number
 * @returns Returns results data from Library of Congress
 */
async function fetchData(args){

    let query = args[0];    // Get the first arg passed "q="    SEARCH
    let format = args[1];   // Get the second arg "format="     FORMAT
    let page = args[2];     // Get the third arg "p="           PAGE NUMBER
    if(format === ""){format = "search";}   // If theres no format search everything

    let fetchMe = `${LOCURL + format}/${LOCqueryParam}${query}${LOCformatJSON}${LOCreturnCount}${resultsPerPage}${LOCpageNumber}${page}`;
    // fetchMe = LOCURL + format + "/" + ...


    //console.log(fetchMe);

    let response = await fetch(fetchMe);    //WAIT for response from fetch
    let data = await response.json();       //WAIT for it to parse
    //console.log(data)
    let results = data.results;             //ONLY STORE USEFUL RESULTS

    return results;                         
}

async function loadResults(){
    let currentPageResult = await fetchData(parseURL());    //GRAB USEFUL RESULTS FROM ABOVE FUNCTION
    //console.log(currentPageResult);                       //MUST AWAIT OR FOR LOOP WILL RUN BEFORE DATA IS RECIEVED

    for (let j = 0; j < 5; j++) {
        
        const cpr = currentPageResult[j];                   //CURRENT ITEM

        let activeURL = cpr.url;                            //URL LINK FOR ITEM PAGE
        let activeSubjects;                                 //SUBJECTS FOR ITEM
        let activeDescription;                              //DESC FOR ITEM
        if(cpr.subject){activeSubjects = cpr.subject.join(", ");}           //VERIFY ITEM HAS THESE DATAPOINTS
        if (cpr.description){activeDescription = cpr.description[0];}

        let activeDate = cpr.date;                          //DATE FOR CURRENT ITEM
        let activeHeading = cpr.title;                      //TITLE OF CURRENT ITEM

        cards[j].childNodes[1].textContent = activeHeading; //SET THE CARD TITLE TO THE ITEM TITLE
        dates[j].textContent = activeDate;                  //  "           DATE        "

        if(activeDescription !== undefined){                    //ERROR CATCHING / DEFAULTING
            descriptions[j].textContent = activeDescription;
        }else{
            descriptions[j].textContent = "No description for this entry."
        }

        if(activeSubjects !== undefined){                       //ERROR CATCHING / DEFAULTING
            subjects[j].textContent = activeSubjects;
        }else{
            subjects[j].textContent = "No Subjects"
        }
        buttons[j].setAttribute("href", activeURL);             //SET READMORE BUTTON LINK
    }
}

window.onload = loadResults; //LOAD THE PAGE ON PAGE LOAD