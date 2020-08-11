function preloader() {
    if (document.images) {
        var img1 = new Image();
        var img2 = new Image();
        var img3 = new Image();
        var img4 = new Image();
        var img5 = new Image();
        var img6 = new Image();
        var img7 = new Image();
        var img8 = new Image();
        var img9 = new Image();

        img1.src = "images/blank.png";
        img2.src = "images/cheeseburger.png";
        img3.src = "images/cheeseburger.png";
        img4.src = "images/fries.png";
        img5.src = "images/hotdog.png";
        img6.src = "images/ice-cream.png";
        img7.src = "images/milkshake.png";
        img8.src = "images/pizza.png";
        img9.src = "images/white.png";
                      
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

document.addEventListener('DOMContentLoaded',() => {
    
    

    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function() {
            FastClick.attach(document.body);
        }, false);
    }

     const cardArray = [
         {
             name:'fries',
             img:'images/fries.png'
         },
         {
            name:'fries',
            img:'images/fries.png'
        },
        {
            name:'hotdog',
            img:'images/hotdog.png'
        },
        {
            name:'hotdog',
            img:'images/hotdog.png'
        },
        {
            name:'ice-cream',
            img:'images/ice-cream.png'
        },
        {
            name:'ice-cream',
            img:'images/ice-cream.png'
        },
        {
            name:'pizza',
            img:'images/pizza.png'
        },
        {
            name:'pizza',
            img:'images/pizza.png'
        },
        {
            name:'milkshake',
            img:'images/milkshake.png'
        },
        {
            name:'milkshake',
            img:'images/milkshake.png'
        },
        {
            name:'cheeseburger',
            img:'images/cheeseburger.png'
        },
        {
            name:'cheeseburger',
            img:'images/cheeseburger.png'
        }
     ]

     cardArray.sort(() => 0.5 - Math.random())

     const grid = document.querySelector('.grid')
     const resultDisplay = document.querySelector('#result')
     const livesDisplay = document.querySelector('#lives')
     const btn = document.querySelector('#btn')
     btn.addEventListener('click',playAgain)

     let cardsChosen = [];
     let cardsChosenId = [];
     let cardsWon = [];
     let lives = 8;

     function createBoard(){
         for(let i=0;i<cardArray.length;i++){
            var card = document.createElement('img')
            card.setAttribute('src','images/blank.png')
            card.setAttribute('data-id',i)
            card.addEventListener('click', flipCard,false)
            card.style.cursor = 'pointer';
            grid.appendChild(card)
         }
     }

     createBoard()

     function removeClick(item){
         item.style.cursor = 'default';
         item.removeEventListener('click',flipCard)
     }
     

     function playAgain(){
        cardsChosen = [];
        cardsChosenId = [];
        cardsWon = [];
        lives = 8;

        resultDisplay.style.color = "#eee"
        resultDisplay.textContent = "Score : 0";
        livesDisplay.textContent = 'Lives : ' + lives;

        let cards = document.querySelectorAll('img')
        cards.forEach((item)=>{
            item.remove()
        });

        createBoard()
        
        cardArray.sort(() => 0.5 - Math.random())
     }

     function checkForMatch(){
        let cards = document.querySelectorAll('img')
        let optionOneId = cardsChosenId[0];
        let optionTwoId = cardsChosenId[1];

        if(cardsChosen[0] === cardsChosen[1]){
            
            cards[optionOneId].setAttribute('src','images/white.png');
            cards[optionTwoId].setAttribute('src','images/white.png');
            cards[optionOneId].removeEventListener('click',flipCard)
            cards[optionTwoId].removeEventListener('click',flipCard)
            cards[optionOneId].style.cursor = 'default'
            cards[optionTwoId].style.cursor = 'default'
            cardsWon.push(cardsChosen)
        }else{
            cards[optionOneId].setAttribute('src','images/blank.png');
            cards[optionTwoId].setAttribute('src','images/blank.png');
            cards[optionOneId].addEventListener('click', flipCard,false)
            cards[optionTwoId].addEventListener('click', flipCard,false)
            if(lives>=1){
                lives--;  
            } 
            
        }

        livesDisplay.textContent = 'Lives : ' + lives;

        cardsChosen = [];
        cardsChosenId = [];
        
        resultDisplay.textContent = 'Score : ' + cardsWon.length
        
        if(cardsWon.length === cardArray.length/2){
            confetti.start();
            setTimeout(function(){
                confetti.stop();
            },3000);
            resultDisplay.textContent = "YOU WON!!!";
            resultDisplay.style.color = 'green';
        }

        if(lives===0){
            cards.forEach(removeClick)
            resultDisplay.textContent = 'YOU LOST!!!';
            resultDisplay.style.color = 'red';
            btn.textContent = 'Play Again'
            //setTimeout(playAgain,3000)
        }

     }

     function flipCard(){
        if(lives>0){
            let cardId = this.getAttribute('data-id')
            cardsChosen.push(cardArray[cardId].name)
            cardsChosenId.push(cardId)
            this.setAttribute('src',cardArray[cardId].img)
            this.removeEventListener('click', flipCard)

            if(cardsChosen.length === 2){
                setTimeout(checkForMatch, 500)
            }
        }
     }

});