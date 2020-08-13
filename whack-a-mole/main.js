function preloader() {
    if (document.images) {
        var img1 = new Image();
        var img2 = new Image();

        img1.src = "mole.jpeg";              
        img2.src = "t.png";              
    }
}
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            if (oldonload) {
                oldonload();
            }
            func();
        }
    }
}
addLoadEvent(preloader);

document.addEventListener('DOMContentLoaded', () => {

    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function() {
            FastClick.attach(document.body);
        }, false);
    }

    const squares = document.querySelectorAll('.square');

    const mole = document.querySelectorAll('.mole');
    const time = document.querySelector('.time');
    const restartBtn = document.querySelector('.restart')
    
    
    let scoreDisplay = document.querySelector("#score");

    let result = 0;
    let currentTime = time.textContent
    
    function randomSquare(){
        squares.forEach(item => {
            item.classList.remove('mole')
        })
        
        let randomPosition = squares[Math.floor(Math.random() * 9)]
        randomPosition.classList.add('mole')

        hitPosition = randomPosition.id;
    }

    squares.forEach(item => {
        item.addEventListener('mouseup', ()=>{
            if(item.id === hitPosition){
                result++;
                scoreDisplay.textContent = "Score : "+result;
            }
        })
    })

    let moleTimer = null

    function moveMole(){
        moleTimer = setInterval(randomSquare,600)
    }

    moveMole()

    function countDown(){
        
        currentTime--;
        time.textContent = currentTime;

        if(currentTime === 0){
            clearInterval(timerId);
            scoreDisplay.textContent = "Times Up!!! You Killed "+ result + " Moles";
            // alert("Time up!!! You Killed "+ result + " Moles");
            clearInterval(moleTimer)
            restartBtn.style.display = 'inline-block';
        }
    }

    let timerId = setInterval(countDown,1000)


    function restart(){
        scoreDisplay.textContent = "Score :"
        clearInterval(timerId);
        clearInterval(moleTimer)
        result = 0;

        time.textContent = 60;
        currentTime = time.textContent;
        scoreDisplay.textContent = "Score : 0";

        moleTimer = setInterval(randomSquare,600)
        timerId = setInterval(countDown,1000)

    }

    restartBtn.addEventListener('click', () => {
        restartBtn.style.display = 'none';
        restart()
    })
});






