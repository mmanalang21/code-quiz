//create start button and timer
var timerEl = document.getElementByID('countdown')
var mainEl = document.getElementById('main');
var startBtn = document.getElementByID('start');

var message =
  'Game Over!';
var words = message.split(' ');

 
function countdown() {
    var timeLeft = 10;

    var timeInterval = setInterval(function() {
    if (timeLeft > 1) {
        timerEl.textcontent = timeLeft + ' seconds remaining';
        timeLeft--;
    } else if (timeLeft === 1) {
        timerEl.textcontent = timeLeft + ' second remaining';
        timeLeft--; 
    } else {
        timeEl.textContent = '';
        clearInterval(timeInterval);
        displayMessage();
    }
    }, 1000);   
}

startBtn.onlick = countdown;

//create question 1

// create question 2

// create question 3 

// create question 4

// after anwering each question the next question appears 

// after answering a question incorrectly time is subtracted from the clock 

// when all questions are answered or timer reches 0, then the game is over 

// when the game is over, I can save my initial score 