// Global Vars 

const deck = document.querySelector('.deck'); // the deck of all cards in the game & used for a single evt listener
// store the global variables in the array

let toggledCards = []; // Create a list that holds all of your cards
let matchedCards = []; 
let matched = 0; // Match counter
let moves = 0; // Reset moves counter
let clockOff = true; // Holds the state of whether the clock is on or off with a Boolean value
let time = 0; 
let clockId; 
const totalpairs = 8; 

// shuffle the cards

function shuffleDeck() { 
    const cardsToShuffle = Array.from(document.querySelectorAll('.deck li')); 
    console.log('Cards to shuffle', cardsToShuffle); 
    const shuffledCards = shuffle(cardsToShuffle); 
    console.log('Shuffled cards', shuffledCards); 



// when you shuffle flip all cards back to backside, removing all shown, open, and currently matched
    for (card of shuffledCards) { 
        card.classList.remove('show'); 
        card.classList.remove('open'); 
        card.classList.remove('match'); 
        deck.appendChild(card); 
    } 
}; 


// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue, randomIndex;
  
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  };

 // Set up the event listener for a card. If a card is clicked:
 // The first click will toggle the card and add it to the toggledCards array. On the second click, it again toggles the card and add to the array
// Added a conditional check within the click handler. Stop the array from toggling or push a new cards after the length of 2. 
deck.addEventListener('click', event => {
    const clickTarget = event.target; 
    if (isClickValid(clickTarget)) { 
// After a valid click, which start the time function and set's clockOff = false
        if(clockOff) { 
            startClock(); 
            clockOff = false; 
        }

        toggleCard(clickTarget); 
        addToggleCard(clickTarget); 
        if (toggledCards.length === 2) { 
            checkForMatch(clickTarget); 
            addMove(); 
            checkScore(); 
        }
    }
}); 

// Checks the conditions - is it a card, array's length less than 2, does the toggledCards array NOT include the clickTarget. 
// If the cards do not match, lock the cards in the open position (put this functionality in another function that you call from this one)
function isClickValid(clickTarget) {
    return (
        clickTarget.classList.contains('card') &&
// If the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
        !clickTarget.classList.contains('match') &&
        toggledCards.length < 2 &&
        !toggledCards.includes(clickTarget) // The .includes array method takes an array and return a true or false values of the element existences within the array.                 
        ) // With the include, now every time a card is click, it checks 'it is a card?', 'is our array's length less than 2?', and 'does the toggledCards array NOT incude the clickTarget?'. 
    }; // If all those conditions return true, proceed with the code. 

// add the card to a *list* 
function toggleCard(card) {
    card.classList.toggle('open'); 
    card.classList.toggle('show'); 
}

// Create a new function which will push the clickTarget into the toggleCards array. 
// Each card that is clicked gets added to a *list* of 'open' cards (put this functionality in another function that you all from this one) 

function addToggleCard(clickTarget) {
    toggledCards.push(clickTarget); 
    console.log(toggledCards); 
}

// if the cards matches, the cards stay put

function checkForMatch() {
    if (
        toggledCards[0].firstElementChild.className ===
        toggledCards[1].firstElementChild.className) 
        {
        setTimeout(() => { // runs after the designated time expires - gives the appearance of a 'turn' and allow us to see both cards for a brief period of time (1000ms) before turning them back over. 
            toggledCards[0].classList.toggle('match'); 
            toggledCards[1].classList.toggle('match');
            console.log('A match!'); // Confirms if the cards are a match

        toggledCards = []; 
        moves = moves - 1; // Don't add moves if a match 

        matched++; 
        
    if (matched === totalPairs) {
        gameOver(); 
        }; 
    }, 1000); 
// If the cards do not match, the cards flip back - reset the array and toggle off those cards
        
} else { 
        setTimeout(() => {
            console.log('Not a match!'); // Confirms if the cards are not a match
            toggleCard(toggledCards[0]); 
            toggleCard(toggledCards[1]); 
// The placement of toggledCards is important as it is a local scope
            toggledCards = []; 
            }, 1000); 
        }
    };


////* modal * note: //// 

function toggleModal() {
    const modal = document.querySelector('.modal_background'); 
    modal.classList.toggle('hide'); 
}

toggleModal() // open

// stat in the modal pop up when gameOver function is run 

function writeModalStats() {
    const timeStat = document.querySelector('.modal_time'); 
    const moveStat = document.querySelector('.modal_moves'); 
    const clockTime = document.querySelector('.clock').innerHTML; 
    const starStat = document.querySelector('.modal_stars');
    const stars = getStars(); 
    
    timeStat.innerHTML = `Time = $${clockTime}`; 
    moveStat.innerHTML = `Moves = ${moves}`; 
    starsStat.innerHTML = `Stars = ${stars}`; 
}


// show star count at end of game - count each element of stars that doesn't have a display property of none. Then return this value, the modal 'stars' stat. 


function getStars() {
    stars = document.querySelectorAll('.stars li'); 
    starCount = 0; 
    for (star of stars) {
        if (star.style.display != 'none') {
            starCount++; 
        }
    }
    console.log(starCount); 
    return starCount; 
}


// add moves
// initialize a variaable in the global score to the value of 0; 
// increment the move counter and display it on the page (put this functionality in another function that you call from this one) 
function addMove() { 
    moves++; 
    const movesText = document.querySelector('.moves'); 
    movesText.innerHTML = moves; 
}; 



// function hides the stars
// We loop through each star and apply 'display = 'none' to each element
// Add a condition which check the current element's display style. If the element already has the display syle of none, skip it, otherwise, proceed the next star. set it's display = 'none', and break
function hideStar() { 
let starList = document.querySelectorAll('.stars li'); 
for (star of starList) {
    if (star.style.display !== 'none') {
        star.style.display = 'none'; 
        break; 
    }
}
}; 

// This function will hide the stars by checking how many moves the player has done. 
function checkScore() { 
    if (moves === 15 || moves == 25) {
        hideStar (); 
    }
}; 

// Query the element and attach an even listener for 'click', which will execute a function. Call the toggleModal function to close the window
document.querySelector('.modal_cancel').addEventListener('click', () => {
    toggleModal(); 
}); 

// Query and attach an event listener that will listen for a lick and execute our function: 
document.querySelector('.modal_replay').addEventListener('click', () => { 
    resetGame()
}); 

// reset the game

function resetGame() {
    resetClockAndTime(); 
    resetMoves(); 
}

function resetClockAndTime() {
    stopClock(); 
    clockOff = true; 
    time = 0; 
    displayTime(); 
}

// Reset moves counter

function resetMoves() {
    moves = 0; 
    document.querySelector('.moves').innerHTML = moves; 
}

// Reset star counter - reset stars = 0 and loop through the starList, setting each star's display propoerty back to inine from none. 

function resetStars() {
    stars = 0; 
    const starList = document.querySelectorAll('.stars li'); 
    for (star of starList) {
        star.style.display = 'inline'; 
    }
}

document.querySelector('.restart').addEventListener('click', resetGame);

// TIMER //

// setTimeout returns an integer value you can store and at anytime call the method, which will cancel the timeout. 

function startClock() {
        clockId = setInterval(() => {
        time++; 
        displayTime(); 
        console.log(time); 
        }, 1000); 
}

startClock(); 

function displayTime() {
    const clock = document.querySelector('.clock'); 
    console.log(clock); 
    const minutes = Math.floor(time / 60); 
    const seconds = time % 60;
    clock.innerHTML = time;  

// show time in correct manner of 0:00, after 60 seconds, and 1 to minutes, etc as time goes on

    if(seconds < 10) {
        clock.innerHTML = `${minutes}:0${seconds}`; 
    } else { 
        clock.innerHTML = `${minutes}:${seconds}`; 
    }
}

function stopClock() { 
    clearInterval(clockId); 
}

// If all cards have matched, display message with the final score (put this functionality in another function that you call from this one)

function gameOver() {
    stopClock(); 
    writeModalStats(); 
    toggleModal(); 
}

// gameOver function will call resetGame and also toggleModal

function resetGame() { 
    resetClockAndTime(); 
    resetMoves(); 
    resetStars(); 
    shuffleDeck(); 
}

function replayGame() { 
    resetGame();  
    toggleModal(); 
}

document.querySelector('.restart').addEventListener('click', resetGame); 

document.querySelector('.modal_replay').addEventListener('click', resetGame); 

// With the function, we are selecting all the card elements and looping over each one, resetting it's classes to just the card class

function resetCards() {
    const cards = document.querySelectorAll('.deck li'); 
    for (let card of cards) {
        card.className = 'card'; 
    }
}


/* 
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */





// https://matthewcranford.com/memory-game-walkthrough

