const philoIMG = $(".philo-img");
const philoName = $(".philo-name");
const philoBlurb = $(".phil-blurb");


async function loadProfile(name){
    let response = fetchWiki(name);
    philoName.text(name);
    //philoIMG.attr("src", function-to-get-img)
    philoBlurb.text(response);
}

window.onload = function(){
    let query = window.location.search.replace("\?", "");
    loadProfile(query);
}
