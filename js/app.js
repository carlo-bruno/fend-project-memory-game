/*
 * Create a list that holds all of your cards
 */
const cardList = ["anchor", "anchor", "bicycle", "bicycle", "bolt", "bolt", "bomb", "bomb", "cube", "cube", "gem", "gem", "leaf", "leaf", "paper-plane", "paper-plane"];

// card query selector
const cards = document.querySelectorAll('.card');

// array of matched cards
let matchedCards = document.getElementsByClassName('match');

// list of opened pair cards, limit to 2 then reset to []
let cardPair = [];


// query selector for stars
const stars = document.querySelectorAll('.fa-star');

// move counter
const moves = document.querySelector('.moves');
let movesNum = 0;

// timer
let sec = 0, min = 0;
const timer = document.querySelector('.timer');
let timeLapse;


// restart button, when clicked call gameStart()
document.querySelector('.restart').addEventListener('click', gameStart);


// congratulations modal
const modal = document.getElementById('modal');
const closeModal = document.querySelector('.modal-close');
const playAgain = document.querySelector('.play-again');

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
        cards[i].innerHTML = `<i class="fas fa-${cardList[i]}"></i>`;
        cards[i].addEventListener('click', showCard);
        cards[i].addEventListener('click', matchCard);

        cards[i].classList.remove('open', 'show', 'match');
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

    // reset stars
    stars[2].classList.remove('far');
    stars[2].classList.add('fas');
    stars[1].classList.remove('far');
    stars[1].classList.add('fas');
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
    if (cardPair.length < 1) {
        gameTime();
    }
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
    movesNum++;
    moves.innerHTML = movesNum;

    // rating logic
    // if 12 = **, 16+ = *
    if (movesNum == 12) {
        stars[2].classList.remove('fas');
        stars[2].classList.add('far');
    } else if (movesNum == 16) {
        stars[1].classList.remove('fas');
        stars[1].classList.add('far');
    }
}

function gameTime() {
    if (sec === 0 && min === 0 ){
        timeLapse = setInterval(function() {
            sec++;
            if (sec == 60) {
                min++;
                sec = 0;
            }
            timer.innerHTML = `${min} mins ${sec} secs`;
        }, 1000);
    }
}

function gameOver() {
    if (matchedCards.length == 16) {
        clearInterval(timeLapse);

        // show modal
        modal.classList.add('show-modal');

        // store star rating
        let starRating = document.querySelector('.stars').innerHTML;

        // display scoreboard
        document.getElementById('rating').innerHTML = starRating;
        document.getElementById('moves').innerHTML = movesNum;
        document.getElementById('time').innerHTML = timer.innerHTML;

        // modal buttons
        closeModal.addEventListener('click', function() {
            modal.classList.remove('show-modal');
        });

        playAgain.addEventListener('click', function() {
            modal.classList.remove('show-modal');
            gameStart();
        });
    }
}

