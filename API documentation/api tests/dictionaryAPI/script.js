


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




async function hello() {
    await grabCords()
}

hello()
