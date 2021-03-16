let searchUrl ='https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
let contentUrl = 'http://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exlimit=max&origin=*&explaintext&exintro&redirects=&titles='



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