$(document).ready(function () {

    var fpscore = 0,
        spscore = 0,
        boardFull = 0,
        vc = 2,
        dept;

    var wins = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
		[1, 4, 7],
		[2, 5, 8],
		[3, 6, 9],
		[1, 5, 9],
		[3, 5, 7]
	];

    var note = [];

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
            $('.fplyr span').html('YOU [ O ]');
            $('.splyr span').html('BOT [ X ]');
        }

        //        if (chance) {
        //            // second player chance active X
        //
        //            $('.fplyr i').addClass('pdisable');
        //            $('.fplyr i').removeClass('pactive');
        //            $('.splyr i').addClass('pactive');
        //            $('.splyr i').removeClass('pdisable');
        //
        //        } else {
        //            // first player chance active O
        //
        //            $('.splyr i').addClass('pdisable');
        //            $('.splyr i').removeClass('pactive');
        //            $('.fplyr i').addClass('pactive');
        //            $('.fplyr i').removeClass('pdisable');
        //
        //        }

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

            if (player === 'vs')
                $('.whowonstatus').html("Player 2 won!");
            else
                $('.whowonstatus').html("BOT won!");

            spscore++;
            $('.sscore').html(spscore);
            delay();
        } else {
            //console.log('Player 1 won');
            $('.whowon').show();

            if (player === 'vs')
                $('.whowonstatus').html("Player 1 won!");
            else
                $('.whowonstatus').html("YOU won!");

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

            //console.log(colorArr);

            if (xc == 3) {
                vc = 1;
                //$('td div span').addClass('full');
                boardFull = 0;
                colorTheBlock(colorArr);
                checker(vc);
                break;
            } else if (oc == 3) {
                vc = 0;
                //$('td div span').addClass('full');
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
                //$('td div span').addClass('full');
                boardFull = 0;
                colorTheBlock(colorArr);

                checker(vc);

                vc = 2;
                break;
            } else if (oc == 3) {
                vc = 0;
                //$('td div span').addClass('full');
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
            //$('td div span').addClass('lock');
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

            //$('td div span').addClass('lock');
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

            //$('td div span').addClass('full');
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
            //$('td div span').addClass('full');
            boardFull = 0;
            colorTheBlock(colorArr, 2); // for d(/)
            checker(vc);
            vc = 2;
        }

        colorArr = [];


    }

    function full() {
        if (boardFull >= 9) {
            //                console.log('draw');
            $('.whowon').show();
            $('.whowonstatus').html("It's a draw!");
            delay();
        }
    }

    function coverter(val) {
        switch (val) {
            case 1:
                return [1, 1];
                break;
            case 2:
                return [1, 2];
                break;
            case 3:
                return [1, 3];
                break;
            case 4:
                return [2, 1];
                break;
            case 5:
                return [2, 2];
                break;
            case 6:
            case -1:
                return [2, 3];
                break;
            case 7:
                return [3, 1];
                break;
            case 8:
                return [3, 2];
                break;
            case 9:
                return [3, 3];
                break;
        }
    }

    function fillNote() {
        //var c = 0;
        for (var i = 1; i <= 3; i++) {
            for (var j = 1; j <= 3; j++) {
                if ($('table tr:nth-child(' + i + ') td:nth-child(' + j + ') div span:nth-child(1)').hasClass('fix')) {
                    note.push("O");
                } else if ($('table tr:nth-child(' + i + ') td:nth-child(' + j + ') div span:nth-child(2)').hasClass('fix')) {
                    note.push("X");
                } else {
                    note.push("");
                }
                //                c++;
                //                console.log(c);
            }
        }
        //        console.log("FillNote = "+note);
    }

    /**
     * Score the current game state
     * @returns {Number} Score for current game state.
     */
    function scoreNote() {
        var score = 0;
        for (var i = 0; i < wins.length; i++) {
            score += evaluateCombo(wins[i])
        }
        return score;
    }

    // Check board for winning combination
    function won() {
        for (var i = 0; i < wins.length; i++) {
            if (note[wins[i][0] - 1] !== "") {
                if (note[wins[i][0] - 1] === note[wins[i][1] - 1] && note[wins[i][1] - 1] === note[wins[i][2] - 1]) {
                    return true;
                }
            }
        }
        return false;
    }

    function finishHim() {
        return (won() || note.indexOf("") === -1);
    }


    // Return an array of possible/unplayed moves
    function possibleMoves() {
        var moves = [];
        for (var i = 1; i <= 9; i++) {
            if (note[i - 1] === "") moves.push(i);
        }
        return moves;
    }


    /**
     * Evaluate a win combination
     * Return +100, +10, +1 for 3, 2, 1 in a row for AI
     * Return -100, -10, -1 for 3, 2, 1 in a row for opponet
     * @param {Array} combo - Winning combination
     * @returns {Number} Score for a giving win combination
     */
    function evaluateCombo(combo) {
        var score = 0;

        // one in a row
        if (note[combo[0] - 1] === "X") score = 1;
        else if (note[combo[0] - 1] === "O") score = -1;

        // two in a row
        if (note[combo[1] - 1] === "X") {
            if (score === 1) score = 10; // two in a row for AI
            else if (score === -1) return 0;
            else score = 1;
        } else if (note[combo[1] - 1] === "O") {
            if (score === -1) score = -10; // two in a row for opponet
            else if (score == 1) return 0;
            else score = -1;
        }

        // Three in a row
        if (note[combo[2] - 1] === "X") {
            if (score > 0) score *= 10; // three in a row for AI
            else if (score < 0) return 0;
            else score = 1;
        } else if (note[combo[1] - 1] === "O") {
            if (score < 0) score *= 10; // three in a row for opponet
            else if (score > 1) return 0;
            else score = -1;
        }

        return score;
    }

    function minMax(dept, block, alpha, beta) {
        var bestMove = -1;
        var score = 0;

        if (finishHim() || dept === 0) {
            score = scoreNote();
            return [score, bestMove];
        }

        var validMoves = possibleMoves();

        for (var i = 0; i < validMoves.length; i++) {

            note[validMoves[i] - 1] = block;

            if (block === "X") {
                // AI turn
                score = minMax(dept - 1, "O", alpha, beta)[0];

                if (score > alpha) {
                    alpha = score;
                    bestMove = validMoves[i];
                }
            } else {
                // opponent's turn
                score = minMax(dept - 1, "X", alpha, beta)[0];

                if (score < beta) {
                    beta = score;
                    bestMove = validMoves[i];
                }
            }

            note[validMoves[i] - 1] = ""; //Undo move

            if (alpha >= beta) break;
        }

        score = (block === "X") ? alpha : beta;

        return [score, bestMove];

    }

    function ai() {
        // AI is X
        //console.log("Before FillNote = "+note);

        fillNote();
        playerIndicator();

        //var rand = Math.floor((Math.random()*9)+1);
        var move = minMax(dept, "X", -Infinity, Infinity);

        var move2D = coverter(move[1]);
        //        console.log("Random = "+rand+"move2D = "+move2D);
        console.log("move = " + move[1] + ",score =" + move[0] + " move2D = " + move2D);

        var s, v;

        // X move
        s = $('table  tr:nth-child(' + move2D[0] + ')  td:nth-child(' + move2D[1] + ') div span:nth-child(2)');
        v = $('table  tr:nth-child(' + move2D[0] + ')  td:nth-child(' + move2D[1] + ') div span:nth-child(1)');

        $(s).addClass('lock');
        $(s).addClass('fix');

        $(v).addClass('lock');
        $(s).removeClass('blockActive');
        $(v).removeClass('blockActive');

        $("td div span:not('.lock,.oblock')").addClass('blockInactive'); //xblock
        $("td div span:not('.lock,.oblock')").removeClass('blockActive'); //xblock
        $("td div span:not('.lock,.xblock')").addClass('blockActive'); //oblock
        $("td div span:not('.lock,.xblock')").removeClass('blockInactive'); //oblock

        console.log("After FillNote = " + note);

        note = [];

        //console.log("Final Note = "+note);
        chance = !chance;
        boardFull++;
        validate();
        full();
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
                console.log('2p');
                // X part

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
                console.log('1p');
                // O part

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

                //                if(player=='ai')
                //                    ai();

            }


            if (player == 'vs') {
                validate();
                boardFull++;
                chance = !chance;
                playerIndicator();
            } else {
                boardFull++;
                full();
                chance = !chance;
                validate();
                ai();
            }


            //            validate();
            //            boardFull++;

            console.log(boardFull);

            if (boardFull >= 9) {
                //                console.log('draw');
                $('.whowon').show();
                $('.whowonstatus').html("It's a draw!");
                delay();
            }
        }
    });

    function presto() {
        fpscore = 0;
        spscore = 0;
        chance = false;
        $('.fscore').html(fpscore);
        $('.sscore').html(spscore);
        $('.menu').hide();
        $('.grid').fadeIn(400);
        $('.grid').css('display', 'flex');
    }

    $('.start').click(function () {

        if ($('.computer').hasClass('pselected')) {
            if ($('.op').hasClass('pselected') || $('.xp').hasClass('pselected')) {
                player = 'ai';
                playerIndicator();
                if ($('.op').hasClass('pselected'))
                    dept = 5;
                else
                    dept = 2;

                presto();
            } else {
                //alert('please any select difficulty level');
                $('.inner').toggleClass('shakeitoff');



            }

        } else if ($('.twoplayers').hasClass('pselected')) {
            player = 'vs';
            playerIndicator();
            presto();
        } else {
            //            alert('please select any one them!');
            $('.inner').toggleClass('shakeitoff');
        }


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

        $('.inner').toggleClass('shakeitoff');
        $('.playerselection i').removeClass('pselected');
        $('.xoselection i').removeClass('pselected');
        $('.xoselection').hide();
        $('.grid').hide();
        $('.menu').fadeIn(400);
        $('.menu').css('display', 'flex');
    });

});
