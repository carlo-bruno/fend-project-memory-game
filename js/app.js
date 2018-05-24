/*
 * Create a list that holds all of your cards
 */
const cardList = ["anchor", "anchor", "bicycle", "bicycle", "bolt", "bolt", "bomb", "bomb", "cube", "cube", "diamond", "diamond", "leaf", "leaf", "paper-plane-o", "paper-plane-o"]

// card query selector
const card = document.querySelectorAll('.card');

// array of matched cards
let matchedCards = document.getElementsByClassName('match');

// list of opened pair cards, limit to 2 then reset to []
let cardPair = [];

// stars
const stars = document.querySelectorAll('.fa-star');


// move counter
const moves = document.querySelector('.moves');
let movesNum = 0;

// timer
let sec = 0, min = 0;
const timer = document.querySelector('.timer');
let timeLapse;


// restart button, when clicked call gameStart()
const restart = document.querySelector('.restart').addEventListener('click', gameStart);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



function gameStart() {
    shuffle(cardList);
    for (let i = 0; i < cardList.length; i++) {
        card[i].innerHTML = `<i class="fa fa-${cardList[i]}"></i>`;
        card[i].addEventListener('click', showCard);
        card[i].addEventListener('click', matchCard);
        
        card[i].classList.remove('open', 'show', 'match');
    }
    // reset values
    cardPair = [];
    
    movesNum = 0;
    moves.innerHTML = movesNum;
    
    // restart time
    clearInterval(timeLapse);
    sec = 0;
    min = 0;
    timer.innerHTML = `${min} mins ${sec} secs`;
    
}

window.onload = gameStart();


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
    >>> showCard()
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
    >>> matchCard()
 *  - if the list already has another card, check to see if the two cards match
 
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
    >>> pairMatch()
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
    >>> pairUnmatch()
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
    >>> moveCounter()
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
    >>> gameOver()
 */

function showCard(event) {
    if (cardPair.length < 2) {
    event.target.classList.add('show', 'open'); 
    } 
}

function matchCard() {
    cardPair.push(this);
    if (cardPair.length == 2) {
        if (cardPair[0].innerHTML === cardPair[1].innerHTML) {
            pairMatch();
        } else {
            setTimeout(pairUnmatch, 500);
        }
        moveCounter();
    }
    gameOver();
}

function pairMatch() {
    cardPair[0].classList.add('match');
    cardPair[1].classList.add('match');
    cardPair[0].classList.remove('open', 'show');
    cardPair[1].classList.remove('open', 'show');

    cardPair = [];
}

function pairUnmatch() {
    cardPair[0].classList.remove('open', 'show');
    cardPair[1].classList.remove('open', 'show');
    cardPair = [];
}

function moveCounter() {
    movesNum++
    moves.innerHTML = movesNum;
    
    if (movesNum == 1) {
        gameTime();
    }
    
    // rating logic
    // if 12 = **, 16+ = *
    if (movesNum > 8 && movesNum <= 12) {
        console.log("2 stars");
        stars[2].outerHTML = `<li><i class="far fa-star"></i></li>`
    } else if (movesNum >= 16) {
        console.log("1 star");
        stars[1].outerHTML = `<li><i class="far fa-star"></i></li>`
    }
}

function gameTime() {
    timeLapse = setInterval(function() {
        timer.innerHTML = `${min} mins ${sec} secs`;
        sec++;
        if (sec == 60) {
            min++;
            sec = 0;
        }
    },1000);
}


function gameOver() {
    if (matchedCards.length == 16) {
        clearInterval(timeLapse);
        finalTime = timer.innerHTML
        console.log(finalTime)
    }
}

