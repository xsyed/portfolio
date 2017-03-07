$(document).ready(function () {

    var list = ["ESL_SC2", "Tentacool", "naughtydog", "OgamingSC2", "freecodecamp", "Nysira", "stpeach", "kaceytron", "behkuhtv", "aurateur"];

    var channel_url = "https://wind-bow.gomix.me/twitch-api/channels/";
    var stream_url = "https://wind-bow.gomix.me/twitch-api/streams/";

    function getChannel(ch) {
        $.getJSON(channel_url + ch + "?callback=?", function (json) {
            if (json.status === 404) {
                $(".container").append('<div class="card offlinec"><div class="head"><img src="https://res.cloudinary.com/syedsamiuddin/image/upload/v1482659378/rainbow_zfepta.gif" alt=""></div><div class="meat"><div class="notfound"><p>' + json.message + '</p></div></div></div>');

            } else {
                var memsin = json.created_at.substring(0, json.created_at.indexOf("T"));

                $(".container").append('<div class="card offlinec"><div class="head"><div class="launch"><a href="' + json.url + '" target="_blank"><i class="material-icons md-48 launchicon">launch</i></a></div><div class="livecon"><span class="blinkoff">•</span><span class="live"> OFFLINE</span></div><img src="https://res.cloudinary.com/syedsamiuddin/image/upload/v1482659349/tvoff_hbownz.gif" alt=""></div><div class="meat"><div class="title"><p>Offline</p></div><div class="profile"><div class="poster"><img src="' + json.logo + '" alt=""></div><div class="disname"><p><a href="' + json.url + '" target="_blank">' + json.display_name + '</a></p><p>Followers: ' + json.followers + '</p><p>Member since ' + memsin + '</p></div></div></div></div>');
            }

        });
    }

    function getStream(st) {
        $.getJSON(stream_url + st + "?callback=?", function (json) {
            if (json.stream === null) {
                getChannel(st);
            } else {
                var memsin = json.stream.channel.created_at.substring(0, json.stream.channel.created_at.indexOf("T"));

                $(".container").append('<div class="card onlinec"><div class="head"><div class="launch"><a href="' + json.stream.channel.url + '" target="_blank"><i class="material-icons md-48 launchicon">launch</i></a></div><div class="livecon"><span class="blink">•</span><span class="live"> Live</span></div><img src="' + json.stream.preview.large + '" alt=""></div><div class="meat"><div class="title"><p>' + json.stream.channel.status + '</p></div><div class="mid"><div class="game">Game : ' + json.stream.game + ' </div><div class="view"><i class="material-icons md-28">person</i><span class="vp">' + json.stream.viewers + '</span></div></div><div class="profile"><div class="poster"><img src="' + json.stream.channel.logo + '" alt=""></div><div class="disname"><p><a href="' + json.stream.channel.url + '" target="_blank">' + json.stream.channel.display_name + '</a></p><p>Followers: ' + json.stream.channel.followers + '</p><p>Member since ' + memsin + '</p></div></div></div></div>');
            }
        });

    }

    function setObj() {
        for (var i in list) {
            getStream(list[i]);
        }
    }

    setObj();

    $(".allbtn").click(function () {
        $(".offlinec").fadeIn(300);
        $(".onlinec").fadeIn(500);

        $(".allbtn").css("color", "#FFEB3B");
        $(".onlinebtn").css("color", "white");
        $(".offlinebtn").css("color", "white");
    });
    $(".offlinebtn").click(function () {
        $(".onlinec").fadeOut(300);
        $(".offlinec").fadeIn(100);

        $(".offlinebtn").css("color", "#FFEB3B");
        $(".onlinebtn").css("color", "white");
        $(".allbtn").css("color", "white");
    });
    $(".onlinebtn").click(function () {
        $(".offlinec").fadeOut(500);
        $(".onlinec").fadeIn(100);

        $(".onlinebtn").css("color", "#FFEB3B");
        $(".offlinebtn").css("color", "white");
        $(".allbtn").css("color", "white");
    });

});