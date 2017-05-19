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



    function isInt(n) {
        return n % 1 === 0;
    }


    function gather() {
        /*
         * Some Dark Magic is used here! O_O
         */
        var s = $(".upip").val();
        if (s.length >= 3) {
            console.log($('.upip').val());
            var repRegex = /x/g;
            var numRegex = /((\w+\.\w+|\-\w+\.\w+)|\w+|\-\w+)/g;
            //var opRegex = /(\+|\*|\-|\/)/g;
            s = s.replace(repRegex, "*");
            var opRegex = /((\*|\/)(?=\-\w)|(\/)|(\+)|(\*)|([^\*\/])\-(?=\w))/g;
            var arr = [];
            var numResult = s.match(numRegex);
            var preJoinResult = s.match(opRegex);
            console.log(numResult);
            console.log(preJoinResult);
            var opJoin = preJoinResult.join('');
            var opResult = opJoin.replace(/\w/g, '');
            opResult = opResult.split('');
            arr.push(numResult);
            arr.push(opResult);
            console.log(numResult);
            console.log(opResult);
            return arr;
        } else {
            console.log($('.upip').val());
            return 0;
        }

    }

    function execute(num, op) {

        var result = play(parseFloat(num[0]), parseFloat(num[1]), op[0]);
        for (var i = 2; i < num.length; i++) {
            result = play(result, parseFloat(num[i]), op[i - 1]);
        }
        return result;

    }

    function play(num1, num2, op) {
        switch (op) {
            case '+':
                return num1 + num2;
            case '*':
                return num1 * num2;
            case '-':
                if (num2 < 0) {
                    num2 = (num2 * (-1));
                    //                    console.log(num1 + " " + num2);
                    return num1 - num2;
                }
                //                console.log(num1 + " " + num2);
                return num1 - num2;
            case '/':
                if (num2 == 0 && num1 != 0) {
                    return "INFINITY";
                } else if (num1 == 0 && num2 == 0) {
                    return 0;
                } else {
                    var n = num1 / num2;
                    if (!isInt(n))
                        return n.toFixed(5);
                    else
                        return n;
                }
        }
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
                //console.log(lg);
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
                //                console.log(lg);
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
                //                console.log(lg);
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
                //                console.log(lg);
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
                //                console.log(lg);
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
                //                console.log(lg);
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
                //                console.log(lg);
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

                //                console.log(lg);
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

                //                
                //                
                //
                //                //                var pressTimer;
                //                //
                //                //                $(".del").mouseup(function () {
                //                //                    clearTimeout(pressTimer);
                //                //                    // Clear timeout
                //                //                    return false;
                //                //                }).mousedown(function () {
                //                //                    // Set timeout
                //                //                    pressTimer = window.setTimeout(function () {
                //                //                       vibrate('ac');
                //                            $('.upip').val('');
                //                //
                //                //                    }, 500);
                //                //                    return false;
                //                //                });

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
                //                console.log(len);
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
                //                console.log(lg);
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
                //                console.log(lg);
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
                //                console.log(lg);
                console.log(hit);
                console.log($('.upip').val());
                if (hit) {
                    $(".upip").val($(".upip").val() + "+");
                    console.log($('.upip').val());
                    hit = false;
                    dotHit = true;
                    backAt = false;
                }
                break;
            case 'equals':
                vibrate('e');

                var coll = gather();
                if (coll == 0) {
                    console.log('empty');
                } else {
                    var num = coll[0];
                    var ops = coll[1];
                    console.log(num);
                    console.log(ops);
                    var result = execute(num, ops);
                    //                console.log(result);
                    if (isNaN(result)) {
                        $(".upip").val(result);
                    } else {
                        $(".upip").val(result);

                    }
                    backAt = true;
                    hit = true;
                    dotHit = true;
                    subhit = false;
                }

                break;


        }
        //        var lg = $('.upip').val();
        //        console.log(lg);

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
