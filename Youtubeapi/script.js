$(document).ready(function(){

        $("#search-term").submit(function(event){
          event.preventDefault();
          var searchTerm = $("#query").val();
          getRequest(searchTerm);
        });
      
      
      function getRequest(searchTerm){
        var params = {
          "q": "searchTerm",
          "part": "snippet",
          "type": "video",
          "embedded": "true",
          "key": "AIzaSyA-PERyp6RWtIztoWvv4dynZlpds03hj-o"
        }
        url = "https://www.googleapis.com/youtube/v3/search";
      
        $.getJSON(url, params, function(data){
          showResults(data.items);
         })
      }
      
      function showResults(results){
        var html = "";
      
        $.each(results, function(index,value){
          html += "<p>" + value.snippet.thumbnails.high.url + "</p>" + "<p>" + "https://www.youtube.com/watch?v=" + value.id.videoId + "</p>" + "<hr/>";
          console.log(value.snippet.thumbnails.high.url);
          console.log(value);
        })
        $("#search-results").html(html);
      }
      })