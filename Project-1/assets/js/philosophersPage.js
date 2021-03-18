$(".card").on("click", function () {
    var profInfo = $(this).children(".details").children("h2").text()
    console.log(profInfo)
    var profUrl = "./philosopher-profile.html?" + profInfo
    window.location.assign(profUrl)
    console.log("hello")
})