// how to get images on wikipedia (api images): returns all files contained on given page
// pageimages: Returns information about images on the page, such as thumbnail and presence of photos.
// page terms: Get the Wikidata terms (typically labels, descriptions and aliases) associated with a page via a sitelink.
// extracts: Returns plain-text or limited HTML extracts of the given pages.




let searchUrl =
  'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
let contentUrl =
  'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&origin=*&rvprop=content&format=json&titles=';



async function fetchWiki() {
  data = await fetch("https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=plato&format=json")


  object = await data.json();
  searchTitle = object[1][0];

  console.log(object);
  console.log(searchTitle);

  url = contentUrl + searchTitle;

  console.log(url)

  contentData = await fetch(url)

  let x = await (contentData.json())
  console.log(x);
  let page = x.query.pages;
  console.log(page);
  let pageId = Object.keys(page)[0];
  console.log(pageId)
  let content = page[pageId].revisions[0]["*"]

  console.log(content)


}

fetchWiki()