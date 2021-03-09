const sButton = document.querySelector(".search-button");
const sBar = document.querySelector(".search-bar");
const sSel = document.querySelector(".format-select");

sButton.addEventListener("click", function(){
    let query = sBar.value;                                                 //search bar value
    let format = sSel.value;                                                //format selector value
    let newURL = `./search-results.html?q=${query}&format=${format}&p=1`;   //build URL for search result page with query info
    window.location.assign(newURL);                                         //loads the URL
});