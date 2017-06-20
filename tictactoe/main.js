$(document).ready(function () {

    var fpscore = 0,
        spscore = 0,
        boardFull = 0,
        vc = 2;

    var player,
        chance = true; // its second player chance

    function colorTheBlock(arr, diagonal) {
        var d1 = [[1, 1], [2, 2], [3, 3]],
            d2 = [[1, 3], [2, 2], [3, 1]];
        if (diagonal == 1) {
            arr = d1;
        } else if (diagonal == 2) {
            arr = d2
        }
        arr.forEach(function (v) {
            $('table tr:nth-child(' + v[0] + ') td:nth-child(' + v[1] + ') div span').addClass('red');
        });
    }

    function playerIndicator() {

        if (player == 'vs') {
            $('.fplyr span').html('1P');
            $('.splyr span').html('2P');
        } else {
            $('.fplyr span').html('BOT');
            $('.splyr span').html('YOU');
        }

        if (chance) {
            // second player chance active X

            $('.fplyr i').addClass('pdisable');
            $('.fplyr i').removeClass('pactive');
            $('.splyr i').addClass('pactive');
            $('.splyr i').removeClass('pdisable');

        } else {
            // first player chance acttive O

            $('.splyr i').addClass('pdisable');
            $('.splyr i').removeClass('pactive');
            $('.fplyr i').addClass('pactive');
            $('.fplyr i').removeClass('pdisable');

        }

    }

    function reset() {
        chance = false;
        boardFull = 0;
        vc = 0;
        $('.whowon').hide();

        playerIndicator();

        $('td div span').removeClass('blockActive blockInactive lock fix full red');

        $('.oblock').addClass('blockActive');
        $('.xblock').addClass('blockInactive');

    }

    function delay() {

        setTimeout(function () {
            reset();
        }, 2500);

    }

    function checker(v) {

        if (v == 1) {
            //console.log('Player 2 won');
            $('.whowon').show();
            $('.whowonstatus').html("Player 2 won!");
            spscore++;
            $('.sscore').html(spscore);
            delay();
        } else {
            //console.log('Player 1 won');
            $('.whowon').show();
            $('.whowonstatus').html("Player 1 won!");
            fpscore++;
            $('.fscore').html(fpscore);
            delay();
        }

    }

    function validate() {
        var oc = 0,
            xc = 0;
        var colorArr = [];

        //horizontal check
        for (var i = 1; i <= 3; i++) {
            for (var j = 1; j <= 3; j++) {
                if ($('table tr:nth-child(' + i + ') td:nth-child(' + j + ') div span:nth-child(1)').hasClass('fix')) {
                    oc++;
                    colorArr.push([i, j]);
                } else if ($('table tr:nth-child(' + i + ') td:nth-child(' + j + ') div span:nth-child(2)').hasClass('fix')) {
                    xc++;
                    colorArr.push([i, j]);
                }
            }

            //            console.log(colorArr);

            if (xc == 3) {
                vc = 1;
                $('td div span').addClass('full');
                boardFull = 0;
                colorTheBlock(colorArr);
                checker(vc);
                break;
            } else if (oc == 3) {
                vc = 0;
                $('td div span').addClass('full');
                boardFull = 0;
                colorTheBlock(colorArr);
                checker(vc);
                break;
            }

            oc = 0;
            xc = 0;
            colorArr = [];
        }

        //vertical check
        for (var i = 1; i <= 3; i++) {
            for (var j = 1; j <= 3; j++) {
                if ($('table tr:nth-child(' + j + ') td:nth-child(' + i + ') div span:nth-child(1)').hasClass('fix')) {
                    oc++;
                    colorArr.push([j, i]);

                } else if ($('table tr:nth-child(' + j + ') td:nth-child(' + i + ') div span:nth-child(2)').hasClass('fix')) {
                    xc++;
                    colorArr.push([j, i]);

                }
            }

            console.log(colorArr);

            if (xc == 3) {
                vc = 1;
                $('td div span').addClass('full');
                boardFull = 0;
                colorTheBlock(colorArr);

                checker(vc);

                vc = 2;
                break;
            } else if (oc == 3) {
                vc = 0;
                $('td div span').addClass('full');
                boardFull = 0;
                colorTheBlock(colorArr);
                checker(vc);
                vc = 2;
                break;
            }
            oc = 0;
            xc = 0;
            colorArr = [];
        }

        // Diagonal check
        if ($('table  tr:nth-child(1)  td:nth-child(1) div span:nth-child(1)').hasClass('fix') &&
            $('table  tr:nth-child(2)  td:nth-child(2) div span:nth-child(1)').hasClass('fix') &&
            $('table  tr:nth-child(3)  td:nth-child(3) div span:nth-child(1)').hasClass('fix')) {

            //check for oblock (\)
            vc = 0;
            //colorArr = [[1, 1], [2, 2], [3, 3]];
            $('td div span').addClass('lock');
            boardFull = 0;
            colorTheBlock(colorArr, 1);
            checker(vc);
            vc = 2;

        } else if ($('table  tr:nth-child(1)  td:nth-child(3) div span:nth-child(1)').hasClass('fix') &&
            $('table  tr:nth-child(2)  td:nth-child(2) div span:nth-child(1)').hasClass('fix') &&
            $('table  tr:nth-child(3)  td:nth-child(1) div span:nth-child(1)').hasClass('fix')) {

            //check for oblock (/)
            vc = 0;
            //colorArr = [[1, 3], [2, 2], [3, 1]];
            
            $('td div span').addClass('lock');
            boardFull = 0;
            colorTheBlock(colorArr, 2);
            checker(vc);
            vc = 2;

        } else if ($('table  tr:nth-child(1)  td:nth-child(1) div span:nth-child(2)').hasClass('fix') &&
            $('table  tr:nth-child(2)  td:nth-child(2) div span:nth-child(2)').hasClass('fix') &&
            $('table  tr:nth-child(3)  td:nth-child(3) div span:nth-child(2)').hasClass('fix')) {

            //check for xblock (\)
            vc = 1;
            //colorArr = [[1, 3], [2, 2], [3, 1]];
            
            $('td div span').addClass('full');
            boardFull = 0;
            colorTheBlock(colorArr, 1); // for d(\)
            checker(vc);
            vc = 2;

        } else if ($('table  tr:nth-child(1)  td:nth-child(3) div span:nth-child(2)').hasClass('fix') &&
            $('table  tr:nth-child(2)  td:nth-child(2) div span:nth-child(2)').hasClass('fix') &&
            $('table  tr:nth-child(3)  td:nth-child(1) div span:nth-child(2)').hasClass('fix')) {

            //check for xblock (/)
            vc = 1;
            //colorArr = [[1, 3], [2, 2], [3, 1]];
            $('td div span').addClass('full');
            boardFull = 0;
            colorTheBlock(colorArr, 2); // for d(/)
            checker(vc);
            vc = 2;
        }

        colorArr = [];


    }

    function ai() {
        playerIndicator();
    }

    $('td div').click(function () {


        var s, v;
        var lockxx = $(this).find('span').hasClass('lock');
        var fixx = $(this).find('span').hasClass('fix');
        var fullxx = $(this).find('span').hasClass('full');
        if (fixx || fullxx) {

        } else {

            //validate();
            if (chance) {
                //console.log('2p');
                s = $(this).find('.xblock');
                v = $(this).find('.oblock');
                $(s).addClass('lock');
                $(s).addClass('fix');

                $(v).addClass('lock');

                $(s).removeClass('blockActive');
                $(v).removeClass('blockActive');

                $("td div span:not('.lock,.oblock')").addClass('blockInactive'); //xblock
                $("td div span:not('.lock,.oblock')").removeClass('blockActive'); //xblock
                $("td div span:not('.lock,.xblock')").addClass('blockActive'); //oblock
                $("td div span:not('.lock,.xblock')").removeClass('blockInactive'); //oblock

            } else {
                // console.log('1p');
                s = $(this).find('.oblock');
                v = $(this).find('.xblock');
                $(s).addClass('lock');
                $(s).addClass('fix');

                $(v).addClass('lock');
                $(s).removeClass('blockActive');
                $(v).removeClass('blockActive');


                $("td div span:not('.lock,.xblock')").addClass('blockInactive'); //oblock
                $("td div span:not('.lock,.xblock')").removeClass('blockActive'); //oblock
                $("td div span:not('.lock,.oblock')").addClass('blockActive'); //xblock
                $("td div span:not('.lock,.oblock')").removeClass('blockInactive'); //xblock
            }


            if (player == 'vs') {

                chance = !chance;
                playerIndicator();
            } else {
                ai();
            }


            validate();
            boardFull++;

            console.log(boardFull);

            if (boardFull >= 9) {
                //                console.log('draw');
                $('.whowon').show();
                $('.whowonstatus').html("It's a draw!");
                delay();
            }
        }
    });

    $('.start').click(function () {

        if ($('.computer').hasClass('pselected')) {
            alert('wait my boi');
            player = 'ai';
            ai();
        } else {
            player = 'vs';
            fpscore = 0;
            spscore = 0;
            $('.fscore').html(fpscore);
            $('.sscore').html(spscore);
            chance = false;
            playerIndicator();
        }

        $('.menu').hide();
        $('.grid').fadeIn(400);
        $('.grid').css('display', 'flex');
    });

    $('.computer').click(function () {
        $(this).addClass('pselected');
        $('.twoplayers').removeClass('pselected');
        $('.xoselection').show();
    });

    $('.twoplayers').click(function () {
        $(this).addClass('pselected');
        $('.computer').removeClass('pselected');
        $('.xoselection').hide();
    });

    $('.op').click(function () {
        $(this).addClass('pselected');
        $('.xp').removeClass('pselected');
    });

    $('.xp').click(function () {
        $(this).addClass('pselected');
        $('.op').removeClass('pselected');
    });

    $('.restart').click(function () {
        reset();
    });

    $('.home').click(function () {
        reset();
        player = '';

        $('.playerselection i').removeClass('pselected');
        $('.grid').hide();
        $('.menu').fadeIn(400);
        $('.menu').css('display', 'flex');
    });

});
