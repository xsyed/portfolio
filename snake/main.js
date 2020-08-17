
document.addEventListener('DOMContentLoaded', () => {

    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function() {
            FastClick.attach(document.body);
        }, false);
    }
    
    const squares = document.querySelectorAll('.grid div');
    const scoreDisplay= document.querySelector('.score span');
    const startBtn = document.querySelector('.start')
    
    const right = document.querySelector("#right")
    const left = document.querySelector("#left")
    const up = document.querySelector("#up")
    const down = document.querySelector("#down")

    const width = 15;

    let direction = 1;
    let currentIndex = 0;
    let appleIndex = 0;
    let currentSnake = [2,1,0];
    let score = 0;
    let speed = 0.9;
    let interval = 0;
    let intervalTime = 0;


    function startGame(){
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        randomApple();
        score = 0;
        scoreDisplay.textContent = score;
        direction = 1;
        intervalTime = 300;
        currentSnake = [2,1,0]
        currentIndex = 0;
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutComes, intervalTime)
        startBtn.textContent = "Reset"
    }

    function randomApple(){

        do{
            appleIndex = Math.floor(Math.random() * squares.length)
        } while(squares[appleIndex].classList.contains('snake'))

        squares[appleIndex].classList.add('apple')
    }

    function moveOutComes(){

        if(
            (currentSnake[0] + width >= (width * width) && direction === width) || //if snake hits bottom
            (currentSnake[0] % width === width -1 && direction === 1) || //if snake hits right
            (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left
            (currentSnake[0] - width < 0 && direction === -width) || //if snake hits top
            squares[currentSnake[0] + direction].classList.contains('snake')
        ){
            startBtn.textContent = 'Play Again';
            return clearInterval(interval)
            
        }

        const tail = currentSnake.pop()
        squares[tail].classList.remove('snake')
        currentSnake.unshift(currentSnake[0]+direction)

        //deals with snake eating apples
        if(squares[currentSnake[0]].classList.contains('apple')){
            squares[currentSnake[0]].classList.remove('apple')
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            randomApple()
            score++;
            scoreDisplay.textContent = score;
            clearInterval(interval)
            intervalTime = intervalTime * speed;
            interval = setInterval(moveOutComes,intervalTime)
        }

        squares[currentSnake[0]].classList.add('snake')
        
    }


    //controls 
    function control(e){
        squares[currentIndex].classList.remove('snake')

        if(e.keyCode === 39 && direction !== -1){
            //right
            direction = 1;
        } else if(e.keyCode === 38 && direction <=1){
            //up
            direction =- width;
        } else if(e.keyCode === 37 && direction !== 1){
            //left
            direction = -1;
        } else if(e.keyCode === 40 && direction >= -1){
            //down
            direction =+ width;
        }
    }   

    document.addEventListener('keyup', control)

    startBtn.addEventListener('click', startGame)

    right.addEventListener('click', function(){
        direction = 1;
    })
    up.addEventListener('click', function(){
        direction =- width ;
    })
    down.addEventListener('click', function(){
        direction =+ width ;
    })
    left.addEventListener('click', function(){
        direction = -1;
    })

})