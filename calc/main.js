$(document).ready(function () {

    var hit = true; // checks if operator is pressed
    var dotHit = true; // checks for decimal enter, prevents two decimal points
    var backAt = false; // i think it is for continuation of answer after equals
    var subhit = false; // flag used enter minus in division and multiplication


    function isDay() {

        var d = new Date();
        var h = d.getHours();
        if (h >= 8 && h <= 21)
            return true;
        else
            return false;
    }


    function dayMode() {


        $('*').css({
            'background-color': 'white',
            'transition': '0.5s ease-out all'
        });
        $('.upip').css({
            'color': 'black',
            'background-color': 'white'
        });
        $('.wholetab input[type=text]').css({
            'background-color': 'white',
            'color': 'black'
        });
        $('.optab').css('background-color', 'aqua');
        $('.optab td button').css({
            'background-color': 'aqua',
            'color': 'black'
        });
        $('.optab tr td').css('background-color', 'aqua');
        $('.numtab button').css('color', 'rgb(72, 72, 72)');
//        $(".credit").css('color', 'black');
        $(".credit a").css('color', 'black');
        $(".credit a:hover").css({
            'color': '#00ff62',
            'transition': 'color 0.2s ease-out'
        });
    }

    function nightMode() {
        $('*').css({
            'background-color': 'black',
            'transition': '0.5s ease-out all'
        });
        $('.upip').css({
            'color': 'white',
            'background-color': 'black'
        });
        $('.wholetab input[type=text]').css({
            'background-color': 'black',
            'color': 'white'
        });
        $('.optab').css('background-color', '#424242');
        $('.optab td button').css({
            'background-color': '#424242',
            'color': 'white'
        });
        $('.optab tr td').css('background-color', '#424242');
        $('.numtab button').css('color', '#ddd');
//        $(".credit").css('color', '#ddd');
        $(".credit a").css('color', '#ddd');
        $(".credit a:hover").css({
            'color': '#00ff62',
            'transition': 'color 0.2s ease-out'
        });

    }


    function vibrate(op) {
        navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

        if (navigator.vibrate) {
            // vibration API supported
            switch (op) {
                case 'n':
                    navigator.vibrate(30);
                    break;
                case 'e':
                    navigator.vibrate(80);
                    break;
                case 'o':
                    navigator.vibrate(50);
                    break;
                case 'ac':
                    navigator.vibrate(100);
                    break;
            }
        }
    }

    $("button").click(function () {
        var clicked = this.className;

        switch (clicked) {
            case 'one':
                vibrate('n');
                if (backAt) {
                    $(".upip").val('');
                    $(".upip").val($(".upip").val() + "1");
                    backAt = false;
                } else {
                    $(".upip").val($(".upip").val() + "1");
                }
                hit = true;
                break;
            case 'two':
                vibrate('n');

                if (backAt) {
                    $(".upip").val('');
                    $(".upip").val($(".upip").val() + "2");
                    backAt = false;
                } else {
                    $(".upip").val($(".upip").val() + "2");
                }
                hit = true;
                break;
            case 'three':
                vibrate('n');


                if (backAt) {
                    $(".upip").val('');
                    $(".upip").val($(".upip").val() + "3");
                    backAt = false;
                } else {
                    $(".upip").val($(".upip").val() + "3");
                }
                hit = true;
                break;
            case 'four':
                vibrate('n');


                if (backAt) {
                    $(".upip").val('');
                    $(".upip").val($(".upip").val() + "4");
                    backAt = false;
                } else {
                    $(".upip").val($(".upip").val() + "4");
                }
                hit = true;
                break;
            case 'five':
                vibrate('n');


                if (backAt) {
                    $(".upip").val('');
                    $(".upip").val($(".upip").val() + "5");
                    backAt = false;
                } else {
                    $(".upip").val($(".upip").val() + "5");
                }
                hit = true;
                break;
            case 'six':
                vibrate('n');

                if (backAt) {
                    $(".upip").val('');
                    $(".upip").val($(".upip").val() + "6");
                    backAt = false;
                } else {
                    $(".upip").val($(".upip").val() + "6");
                }
                hit = true;
                break;
            case 'seven':
                vibrate('n');


                if (backAt) {
                    $(".upip").val('');
                    $(".upip").val($(".upip").val() + "7");
                    backAt = false;
                } else {
                    $(".upip").val($(".upip").val() + "7");
                }
                hit = true;
                break;
            case 'eight':
                vibrate('n');

                if (backAt) {
                    $(".upip").val('');
                    $(".upip").val($(".upip").val() + "8");
                    backAt = false;
                } else {
                    $(".upip").val($(".upip").val() + "8");
                }
                hit = true;
                break;
            case 'nine':
                vibrate('n');

                if (backAt) {
                    $(".upip").val('');
                    $(".upip").val($(".upip").val() + "9");
                    backAt = false;
                } else {
                    $(".upip").val($(".upip").val() + "9");
                }
                hit = true;
                break;
            case 'zero':
                vibrate('n');

                if (backAt) {
                    $(".upip").val('');
                    $(".upip").val($(".upip").val() + "0");
                    backAt = false;
                } else {
                    $(".upip").val($(".upip").val() + "0");
                }
                hit = true;
                break;
            case 'dot':
                vibrate('n');

                var len = $(".upip").val().length;

                if (hit && dotHit && len > 0) {
                    console.log("")
                    $(".upip").val($(".upip").val() + ".");
                    hit = false;
                    dotHit = false;
                }
                console.log(len);
                if (len == 0 || backAt) {
                    $(".upip").val("0.");
                    hit = false;
                    dotHit = false;
                    backAt = false;
                }
                break;
            case 'del':
                vibrate('e');

                $('.upip').val($('.upip').val().slice(0, -1));

                hit = true;
                dotHit = true;
                subhit = false;
                break;
            case 'clr':

                vibrate('ac');
                $('.upip').val('');
                hit = true;
                dotHit = true;
                subhit = false;
                break;
            case 'divide':
                vibrate('o');
                var len = $('.upip').val().length;
                if (hit && len > 0) {
                    $(".upip").val($(".upip").val() + "/");
                    hit = false;
                    dotHit = true;
                    subhit = true;
                    backAt = false;
                } else if (len <= 0) {}
                break;
            case 'multiply':
                vibrate('o');
                var len = $('.upip').val().length;
                if (hit && len > 0) {
                    $(".upip").val($(".upip").val() + "x");
                    hit = false;
                    dotHit = true;
                    subhit = true;
                    backAt = false;
                } else if (len <= 0) {
                    break;
                }
                break;
            case 'subtract':
                vibrate('o');
                if (hit) {
                    $(".upip").val($(".upip").val() + "-");
                    hit = false;
                    dotHit = true;
                    backAt = false;

                } else if (subhit) {
                    $(".upip").val($(".upip").val() + "-");
                    hit = false;
                    dotHit = true;
                    subhit = false;
                    backAt = false;

                }
                break;
            case 'add':
                vibrate('o');
                if (hit) {
                    $(".upip").val($(".upip").val() + "+");
                    hit = false;
                    dotHit = true;
                    backAt = false;
                }
                break;
            case 'equals':
                vibrate('e');
                    
                    var regex = /x/g;
                    var text = $('.upip').val();
                    text = text.replace(regex,'*');
                    var result = eval(text);

                    $(".upip").val(result);
                    backAt = true;
                    hit = true;
                    dotHit = true;
                    subhit = false;

                break;


        }


    });

    var flag = isDay();
    $('.bulb img').click(function () {

        if (flag) {
            nightMode();
            $('.bulb img').attr('src', 'white-bulb.png');
            flag = false;
        } else {
            dayMode();
            $('.bulb img').attr('src', 'black-bulb.png');
            flag = true;
        }

    });


});
