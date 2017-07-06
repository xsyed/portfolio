$(document).ready(function () {

    var isOn = false,
        isStart = false,
        isStrict = false,
        isXerox = true;

    var sound = {
        red: new Audio('s1.mp3'),
        blue: new Audio('s2.mp3'),
        green: new Audio('s3.mp3'),
        yellow: new Audio('s4.mp3'),
        buzzer: new Audio('buzzer.mp3')
    };

    var seq = [],
        conf = [];

    var deathclock, playTimer, num, index = 0;



    function rand() {
        num = Math.floor((Math.random() * 4) + 1);
        seq.push(num);
        index++;
    }

    function playSound(x) {
        switch (x) {
            case 'topleft':
            case 1:
                sound.green.play();
                vib('n');
                break;
            case 'topright':
            case 2:
                sound.red.play();
                vib('n');
                break;
            case 'bottomleft':
            case 3:
                sound.yellow.play();
                vib('n');
                break;
            case 'bottomright':
            case 4:
                sound.blue.play();
                vib('n');
                break;
            case 'all':
            case 5:
                sound.buzzer.play();
                vib('n');
                break;
        }
    }

    function dim(j) {
        switch (j) {
            case 1:
                $('.topleft').removeClass('gb');
                break;
            case 2:
                $('.topright').removeClass('rb');
                break;
            case 3:
                $('.bottomleft').removeClass('yb');
                break;
            case 4:
                $('.bottomright').removeClass('bb');
                break;
            case 5:
                $('.block').removeClass('gb rb yb bb');
                break;
        }
    }

    function delay(d) {
        setTimeout(function () {
            dim(d);
        }, 800);

    }

    function p(v) {
        switch (v) {
            case 1:
                playSound(v);
                $('.topleft').addClass('gb');
                break;
            case 2:
                playSound(v);
                $('.topright').addClass('rb');
                break;
            case 3:
                playSound(v);
                $('.bottomleft').addClass('yb');
                break;
            case 4:
                playSound(v);
                $('.bottomright').addClass('bb');
                break;
            case 5:
                playSound(v);
                $('.topleft').addClass('gb');
                $('.topright').addClass('rb');
                $('.bottomleft').addClass('yb');
                $('.bottomright').addClass('bb');
                break;
        }
    }


    function combo(i) {
        switch (seq[i]) {
            case 1:
                p(seq[i]);
                delay(seq[i]);
                break;
            case 2:
                p(seq[i]);
                delay(seq[i]);
                break;
            case 3:
                p(seq[i]);
                delay(seq[i]);
                break;
            case 4:
                p(seq[i]);
                delay(seq[i]);
                break;
        }
    }


    function playSeq(bruh) {
        console.log('in playSeq()');
        var len = seq.length;
        for (var i = 0; i < seq.length; i++) {
            (function (inx) {
                playTimer = setTimeout(function () {

                    $('.countnum').html(('000' + len).slice(-2));
                    $('.top > div,.bottom > div').removeClass('clickable unclickable').addClass('unclickable');
                    combo(inx);
                    conf = [];
                    if ((inx + 1) == seq.length) {
                        $('.top > div,.bottom > div').removeClass('unclickable clickable').addClass('clickable');
                        bruh();
                    }

                }, (i * 1000) - (len * 30));
            })(i);

        }

    }


    function bruh() {

        deathclock = setTimeout(function () {
            if (isXerox == false) {
                if (isStrict) {
                    seq = [];
                    start();
                } else {
                    playSeq(bruh);
                }
            }
            console.log('gotcha');
        }, 8000);
    }



    function start() {

        rand();
        playSeq(bruh);
    }


    function vib(i) {
        navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

        switch (i) {

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

    function damnn() {
        setTimeout(function () {
            return true;
        }, 2000);
    }


    function victory() {
        seq = [];
        seq = [4, 1, 2, 3, 4, 1, 2, 3, 4];

        for (var i = 0; i < seq.length; i++) {
            (function (inx) {
                setTimeout(function () {

                    $('.top > div,.bottom > div').removeClass('clickable unclickable').addClass('unclickable');
                    combo(inx);

                }, (i * 500));
            })(i);

        }

    }

    function verfiy() {

        isXerox = false;

        for (var i = 0; i < conf.length; i++) {

            if (seq[i] === conf[i]) {
                isXerox = true;
            } else {
                isXerox = false;
                break;
            }
        }

        if (isXerox == false) {
            
            if (isStrict) {
                seq = [];
                start();
            } else {
                p(5);
                setTimeout(function () {
                    dim(5);
                }, 600);
                setTimeout(function () {
                    playSeq(bruh);
                }, 1500);
            }
            
        } else {
            
            if (seq.length == conf.length && isXerox) {
                
                if (seq.length >= 20) {
                    victory();
                    seq = [];
                    start();
                } else {
                    
                    setTimeout(function () {
                        start();
                    }, (1500) - (seq.length * 30));
                }

                isXerox = !isXerox;
                
            } else {
                bruh();
                isXerox = !isXerox;

            }
        }

    }

    function addConf(c) {
        switch (c) {
            case 'topleft':
            case 1:
                conf.push(1);
                break;
            case 'topright':
            case 2:
                conf.push(2);
                break;
            case 'bottomleft':
            case 3:
                conf.push(3);
                break;
            case 'bottomright':
            case 4:
                conf.push(4);
                break;
        }
    }

    $(".top > div,.bottom > div").click(function () {
        clearTimeout(deathclock);
        var elem = this.className;
        elem = elem.split(' ');
        playSound(elem[0]);
        addConf(elem[0]);
        verfiy();

        //console.log('seq' + seq);
        //console.log('conf' + conf);
    });


    $('.tgl').click(function () {
        isOn = !isOn;
        seq = [];
        conf = [];
        $('.countnum').html('--');
        if (isOn) {
            $('.countnum').html('--');
            $('.countnum').removeClass('off').addClass('on');
        } else {
            isXerox = true;
            clearTimeout(deathclock);
            $('.countnum').removeClass('on').addClass('off');
            $('.led').removeClass('led-off led-on').addClass('led-off');
            $('.top > div,.bottom > div').removeClass('clickable').addClass('unclickable');
        }

    });

    $('.start').click(function () {
        if (isOn) {
            $('.top > div,.bottom > div').removeClass('unclickable');
            $('.top > div,.bottom > div').addClass('clickable');
            $('.countnum').html('--');
            seq = [];
            conf = [];
            start();
        } else {

        }
    });


    $('.strict').click(function () {
        if (isOn) {
            isStrict = !isStrict;
            if (isStrict) {
                $('.led').removeClass('led-off');
                $('.led').addClass('led-on');
            } else {
                $('.led').removeClass('led-on');
                $('.led').addClass('led-off');
            }

        } else {

        }
    });


});
