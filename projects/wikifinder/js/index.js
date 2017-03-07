$(document).ready(function () {

    var url = "https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrnamespace=0&piprop=thumbnail&gsrlimit=10&prop=extracts|pageimages|images&pilimit=max&exsentences=3&imdir=descending&exlimit=max&imlimit=10&exintro&explaintext&pithumbsize=200&format=json&gsrsearch="

    function getContent() {
        $(".content").html('');
        var input = $("#search").val();
        $.getJSON(url + input + "&callback=?", function (json) {
            for (var p in json.query.pages) {
                if (json.query.pages[p].hasOwnProperty("thumbnail")) {
                    $(".content").append("<a class='card_link' href='https://en.wikipedia.org/?curid=" + json.query.pages[p].pageid + "' target='_blank' alt=''><div class='card animated fadeInUp'><div class='title'>" + json.query.pages[p].title + "</div><div class='thumb'><img src='" + json.query.pages[p].thumbnail.source + "' ></div><div class='sentence'>" + json.query.pages[p].extract + "</div></div></a>");
                } else {
                    $(".content").append("<a class='card_link' href='https://en.wikipedia.org/?curid=" + json.query.pages[p].pageid + "' target='_blank' alt=''><div class='card'><div class='title'>" + json.query.pages[p].title + "</div><div class='sentence'>" + json.query.pages[p].extract + "</div></div></a>");
                }

            }
        });
    }


    $(".random").click(function () {
        window.open("https://en.wikipedia.org/wiki/Special:Random");
    });

    $(".search-btn").click(getContent);

    $("#search").autocomplete({
        source: function (req, res) {
            $.ajax({
                url: "https://en.wikipedia.org/w/api.php",
                dataType: "jsonp",
                data: {
                    'action': "opensearch",
                    'format': "json",
                    'limit': '5',
                    'search': req.term
                },
                success: function (data) {
                    res(data[1]);
                }
            });
        }
    });

    $("#search").keyup(function (event) {
        if (event.keyCode == 13) {
            getContent();
            $(".card").addClass("animated slideInLeft");

        }
    });

});