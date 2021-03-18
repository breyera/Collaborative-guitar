const philoIMG = $(".profile-img");
const philoName = $("#philosopher-name");
const philoBlurb = $("#philosopher-about");
const philoBirth = $("#philosopher-birth");
const philoDeath = $("#philosopher-death");
const readMoreButts = $("#wiki-link");


async function loadProfile(name){

    
    let response = await fetchWiki(name);

    let page = response.query.pages;
    //console.log(page);
    let pageId = Object.keys(page)[0];
    //console.log(pageId)
    let content = page[pageId].extract;

    console.log(page[pageId]);

    let readMoreURL = "https://en.wikipedia.org/wiki/" + page[pageId].title;
    console.log(readMoreURL);

    //console.log(response)
    philoName.text(name.replace("\%20", " "));
    //philoIMG.attr("src", function-to-get-img);
    philoBlurb.text(trimString(content));
    readMoreButts.attr("href", readMoreURL);

    let asideResponse = await fetchAside(name);

    console.log(asideResponse);

    let asPage = asideResponse.query.pages;
    let asPageId = Object.keys(asPage)[0];
    let asContent = asPage[asPageId].revisions[0]["*"];
    console.log(asContent);

    let birthDate = "" + asContent.match(/\| birth\_date(.*?)(\r\n|\r|\n)/g)
    let deathDate = "" + asContent.match(/\| death\_date(.*?)(\r\n|\r|\n)/g)

    birthDate = birthDate.split("=")[1]
    deathDate = deathDate.split("=")[1]

    console.log(birthDate, "||||||||", deathDate);

    bDay = birthDate.match(/[0-9]*/g);
    console.log(bDay);
    //dDay = ;


}

readMoreButts.on("click", function(e){
    window.open(this.getAttribute("href"))
})


window.onload = function(){
    let query = window.location.search.replace("\?", "")
    loadProfile(query ? query : "Adam Yauch");
}
