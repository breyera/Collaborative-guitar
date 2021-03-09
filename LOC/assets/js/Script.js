const sButton = document.querySelector(".search-button");
const sBar = document.querySelector(".search-bar");
const sSel = document.querySelector(".format-select");


sButton.addEventListener("click", function(){

    let query = sBar.value;
    let format = sSel.value;

    let newURL = `./search-results.html?q=${query}&format=${format}&p=1`;

    window.location.assign(newURL);


});


