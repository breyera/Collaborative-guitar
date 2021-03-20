



function getRequest(searchTerm) {
  var params = {
    part: "snippet",
    type: "video",
    embedded: "true",
    order: "relevance",
    maxResults: 1,
    key: "AIzaSyA-PERyp6RWtIztoWvv4dynZlpds03hj-o",
    q: searchTerm,
    safeSearch: "none",
  }
  url = "https://www.googleapis.com/youtube/v3/search";
  console.log("hello");

  $.getJSON(url, params, function (data) {
    showResults(data.items);
    console.log("bye");
  })
}

function showResults(results) {
  var html = "";

  $.each(results, function (index, value) {
    html += "<p>" + value.snippet.thumbnails.high.url + "</p>" + "<p>" + "https://www.youtube.com/watch?v=" + value.id.videoId + "</p>" + "<hr/>";
    console.log(value.snippet.thumbnails.high.url);
    console.log(value.id.videoId);
    var videoId = value.id.videoId
    console.log(videoId)
    var newSrc = "https://www.youtube.com/embed/" + videoId
    $("iframe").attr("src", newSrc)
  })

}






