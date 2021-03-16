
async function fetchQuotes() {
    var response = await fetch('http://philosophy-quotes-api.glitch.me/quotes')
    var quotes = (response.json())
    return quotes
}
fetchQuotes()
