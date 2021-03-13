// how to get images on wikipedia (api images): returns all files contained on given page
// pageimages: Returns information about images on the page, such as thumbnail and presence of photos.
// page terms: Get the Wikidata terms (typically labels, descriptions and aliases) associated with a page via a sitelink.
// extracts: Returns plain-text or limited HTML extracts of the given pages.



async function wikiPull() {
    var response = await fetch("https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=Hampi&namespace=0&limit=10")
    var data = await response.json()
    return console.log(data);

}

