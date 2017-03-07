
$(document).ready(function(){
    var quote = "";
    var author = "";
    function getQuote(){
          $.ajax({
            url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous', // The URL to the API. You can get this in the API page of the API you intend to consume
            type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
            data: {}, // Additional parameters here
            dataType: 'json',
            success: function(data) {
                $(".quoteText").show().fadeIn();
                $(".quoteText").html('" '+data.quote+'"<h3>- '+data.author+"</h3>");
                quote = data.quote;
                author = data.author;
            },
            error: function(err) { alert(err); },
            beforeSend: function(xhr) {
            xhr.setRequestHeader("X-Mashape-Authorization", "IVxPS6Vbn9mshB2P0ok7vdfwLEMSp1ZfSxFjsnPsFCgXNV892t"); // Enter here your Mashape key
        }
      }); 
    }
    getQuote();
    console.log(quote);
    console.log(author);
    
    $("#qbtn").click(function(){
        $(".quoteText").fadeOut(500);
        getQuote();
    });    
    
    $(".twitter-btn").click(function(){
        var text = $(".quoteText").text();
        var link = 'https://twitter.com/intent/tweet?url=https://goo.gl/fppbv1&text=' + encodeURIComponent(text) +
            '&hashtags=quotes';
        window.open(link,"_blank");
    });
});