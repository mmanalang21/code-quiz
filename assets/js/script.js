// create array with questions and correct answer 

var questionArr = [
    {
        question: '1. Using the DOM, which code best illustrates the object representation of the elements?',
        answer1: 'console.dir(window.document);',
        answer2: 'console.log(window.document);',
        answer3: 'window.document.querySelector()',
        answer4: 'none of the above',
        corAns: 'console.dir(window.document);'
    },
    {
        question: '2. Which of the following refers to the user behavior click?',
        answer1: 'event listener',
        answer2: 'event',
        answer3: 'event handler',
        answer4: 'all the above',
        corAns: 'event'
    },
    {
        question: '3. Passing a function into a function is called?',
        answer1: 'function passing',
        answer2: 'hoisting',
        answer3: 'callback',
        answer4: 'none of the above',
        corAns: 'callback'
    },
    {
        question: '4. Which method can be used to create a DOM element object?',
        answer1: 'appendChild',
        answer2: 'addEventListener',
        answer3: 'createElement',
        answer4: 'all the above',
        corAns: 'createElement'
    }
];

// create addEventListener functions and variables

window.addEventListener('load', function (ev) {
    var viewHighScores = document.getElementById('view-high-scores');
    var highScores = document.getElementById('high-scores');
    var goBack = document.querySelector('.go-back');
    var quizChallenge = document.getElementById('quiz-challenge');

    function renderHighScores(){
        highScoreList.innerHTML = '';
        var recordSet = JSON.parse(localStorage.getItem('scoreRecord'));
        recordSet.forEach(function(ele){
            var newLi = createNewLi();
            newLi.textContent = ele;
            highScoreList.appendChild(newLi);
        });
    }

    viewHighScores.addEventListener('click', function (ev1) {
        ev1.preventDefault();
        highScores.style.display = 'block';
        quizChallenge.style.display = 'none';
        
        renderHighScores();
    });

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    goBack.addEventListener('click', function (evt) {
        quizChallenge.style.display = 'block';
        highScores.style.display = 'none';
    });


    var startQuizBtn = document.getElementById('start-quiz');
    var quizStart = document.getElementById('quiz-start');
    var quizQuestion = document.querySelector('.quiz-question');

    startQuizBtn.addEventListener('click', function (ev1) {
        quizStart.style.display = 'none';
        quizQuestion.style.display = 'block';

        resetTimer();
    });

    var questionLi = document.querySelectorAll('.quiz-question ul li');
    var timeoutID;
    var quizSubmit = document.getElementById('quiz-submit');

    var score = 0;
    var correct = document.getElementById('correct');
    var wrong = document.getElementById('wrong');
    var scoreNum = document.getElementById('score');
    
// create if else statements  for questions

    function questionChange() {
        var index = 0;
        questionLi.forEach(function (li) {
            correct.style.display = 'none';
            wrong.style.display = 'none';
            li.addEventListener('click', function () {
                li.style.backgroundColor = "#99ccff";
                
                if (li.innerHTML === questionArr[index].corAns) {
                    score++;
                    correct.style.display = 'block';
                } else {
                    wrong.style.display = 'block';
                    timer -= 5;
                }

                if (score === 0){
                    scoreNum.textContent = 0;
                }else {
                    scoreNum.textContent = score * parseInt(80 / questionArr.length) + parseInt(timer / 5);
                }

                clearTimeout(timeoutID);
                timeoutID = setTimeout(function () {
                    if (index >= questionArr.length - 1) {
                        quizQuestion.style.display = 'none';
                        quizSubmit.style.display = 'block';
                        correct.style.display = 'none';
                        wrong.style.display = 'none';
                    } else {
                        index++;
                    }

                    renderQuestion(index);
                    clearTimeout(timeoutID);
                }, 800);

            });

        });
    }
    
    questionChange();

    var textInput = quizSubmit.getElementsByTagName('input')[0];
    var submitBtn = quizSubmit.getElementsByTagName('button')[0];
    var highScoreList = document.getElementById('high-score-list');
    submitBtn.addEventListener('click', function () {
        var initAndScore = textInput.value + ' - ' + scoreNum.textContent;

        var scoreRecord = [];
        if (localStorage.getItem('scoreRecord')) {
            scoreRecord = JSON.parse(localStorage.getItem('scoreRecord'));
        }

        if (textInput.value.trim() === ''){
            alert('Please type something!');
        }else {
            scoreRecord.unshift(initAndScore);
            var recordSet = [...new Set(scoreRecord)];
            localStorage.setItem('scoreRecord', JSON.stringify(recordSet));

            renderHighScores();

            alert("Thanks for submitting!");
        }
    });

    var oneMoreTimeBtn = quizSubmit.getElementsByTagName('button')[1];
    oneMoreTimeBtn.addEventListener('click', function () {
        window.location.reload();
    });

    var clearHighScores = document.querySelector('.clear');
    clearHighScores.addEventListener('click', function (evt) {
  
        localStorage.setItem('scoreRecord', JSON.stringify([]));
        renderHighScores();
    });

    function renderQuestion(index) {
        var quizQuestionTitle = quizQuestion.querySelector('.quiz-question-title');
        var allLis = quizQuestion.querySelectorAll('li');
        correct.style.display = 'none';
        wrong.style.display = 'none';
        quizQuestionTitle.textContent = questionArr[index].question;

        allLis.forEach(function (li) {
            li.className = '';
            li.style.backgroundColor = '#009191';
        });

        allLis[0].textContent = questionArr[index].answer1;
        allLis[1].textContent = questionArr[index].answer2;
        allLis[2].textContent = questionArr[index].answer3;
        allLis[3].textContent = questionArr[index].answer4;
    }
});

function createNewLi() {
    return document.createElement('li');
}

var timer;
var timerCountDown = document.getElementById('timer-num');
var intervalID;
var quizSubmit = document.getElementById('quiz-submit');
function resetTimer() {
    timer = 15 * questionArr.length;
    timerCountDown.textContent = timer;

    clearInterval(intervalID);
    intervalID = setInterval(function () {
        timer--;
        timerCountDown.textContent = timer;
        
        if (timer <= 0) {
            timer = 0;
            clearInterval(intervalID);
            alert('Times Up! Try again!');
        }

        if (quizSubmit.style.display === 'block') {
            timerCountDown.textContent = "0";
            clearInterval(intervalID);
        }
    }, 1000);
}