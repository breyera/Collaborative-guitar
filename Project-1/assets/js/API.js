
/** DICTIONARY */
async function grabCords() {

    var cordResponse = await fetch("https://wordsapiv1.p.rapidapi.com/words/realism/definitions", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "8708740722msh9c93ea5a1d1cf20p1f2401jsn8c36f2550bd0",
            "x-rapidapi-host": "wordsapiv1.p.rapidapi.com"
        }
    })

    var whatever = await cordResponse.json()

    console.log(whatever.definitions[1].definition)

}

/** PHILOSOPHY QUOTES */
async function fetchQuotes() {
    var response = await fetch('http://philosophy-quotes-api.glitch.me/quotes')
    var quotes = (response.json())
    return quotes
}


let searchUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
let contentUrl = 'http://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exlimit=max&origin=*&explaintext&exintro&redirects=&titles='


/** WIKIPOEDICA */
async function fetchWiki(philo) {
    data = await fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=${philo}&format=json`);


    object = await data.json();
    searchTitle = object[1][0];

    //console.log(object);
    //console.log(searchTitle);

    url = contentUrl + searchTitle;

    //console.log(url)

    contentData = await fetch(url);

    let x = await contentData.json();
    //console.log(x);
    let page = x.query.pages;
    //console.log(page);
    let pageId = Object.keys(page)[0];
    //console.log(pageId)
    let content = page[pageId].extract;

    //console.log(content)

    return content;

}

var trimString = str => str.replace(/\((.*?)\)/g, "").replace("  ", " ").replace(/ \,/g, ",").replace(/ \./g, ".");


/** YOUTUBE */

var googleApiKey = "AIzaSyBWH8ojYF9YRbijUhlBQeCjuLtH6SQTIzQ"
var searchTerm = ""

//<script src="https://apis.google.com/js/api.js"></script>



function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({ scope: "https://www.googleapis.com/auth/youtube.force-ssl" })
        .then(function () { console.log("Sign-in successful"); },
            function (err) { console.error("Error signing in", err); });
}
function loadClient() {
    gapi.client.setApiKey(googleApiKey);
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function () { console.log("GAPI client loaded for API"); },
            function (err) { console.error("Error loading GAPI client for API", err); });
}
// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
    return gapi.client.youtube.search.list({
        "part": [
            "snippet"
        ],
        "q": searchTerm,
        "type": [
            "video"
        ],
        "videoEmbeddable": "true"
    })
        .then(function (response) {
            // Handle the results here (response.result has the parsed body).
            console.log("Response", response);
        },
            function (err) { console.error("Execute error", err); });
}
gapi.load("client:auth2", function () {
    gapi.auth2.init({ client_id: "YOUR_CLIENT_ID" });
});

//<button onclick="authenticate().then(loadClient)">authorize and load</button>
//<button onclick="execute()">execute</button>


//youtube embed dissection

var embed1 = "https://www.youtube.com/embed/"
var embed2 = videoID

var finalEmbed = embed1 + embed2

$('iframe').attr("src", finalEmbed)