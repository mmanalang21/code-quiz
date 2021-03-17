//question arrays 
var questionArr = [
    {
        question: '1. Using the DOM, which code best illustrates the object representation of the elements?',
        answer1: '&lt;console.dir(window.document);&gt;',
        answer2: '&lt;cosole.log(window.document);&gt;',
        answer3: '&lt;window.document.querySelector();&gt;',
        answer4: '&lt;None of the above&gt;',
        corAns: '&lt;console.dir(window.document);&gt;'
    },
    {
        question: '2. Which of the following refers to the user behavior-the click?',
        answer1: 'event listener', 
        answer2: 'event handler', 
        answer3: 'event',
        answer4:'All of the above',
        corAns: 'event'
    },
    {
        question: '3. Passing a function into a function is called?',
        answer1: 'Hoisting',
        answer2: 'Callback', 
        answer3: 'Function passing ',
        answer4: 'None of the above ',
        corAns: 'Callback'
    },
    {
        question: '4. Which method can be used to create a DOM element object?',
        answer1: 'appendChild()',
        answer2: 'createElement()',
        answer3: 'addEventListener()',
        answer4: 'All of the above',
        corAns: 'createElement()'
    }
];

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


     var startQuizBtn = document.getElementById('start');
     var quizStart = document.getElementById('start-quiz');
     var quizQuestion = document.querySelector('.questions');

     startQuizBtn.addEventListener('click', function (ev1) {
         quizStart.style.display = 'none';
         quizQuestion.style.display = 'block';

         resetTimer();
     });

     var questionLi = document.querySelectorAll('.questions ul li');
     var timeoutID;
     var quizSubmit = document.getElementById('submit-quiz');

     var score = 0;
     var correct = document.getElementById('correct');
     var wrong = document.getElementById('wrong');

     var scoreNum = document.getElementById('score');
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
                 

               scoreNum.textContent = score * 25 + parseInt(timer / 5);

                timeoutID = setTimeout(function () {
                     if (index >= 3) {
                        quizQuestion.style.display = 'none';
                        quizSubmit.style.display = 'block';
                        correct.style.display = 'none';
                        wrong.style.display = 'none';
                    } else {
                        index++;
                   }

                    renderQuestion(index);
                     clearTimeout(timeoutID);
                }, 1000);

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
        
         scoreRecord.unshift(initAndScore);
         var recordSet = [...new Set(scoreRecord)];
         localStorage.setItem('scoreRecord', JSON.stringify(recordSet));

         renderHighScores();

         alert("You're all set!");
     });

     var oneMoreTimeBtn = quizSubmit.getElementsByTagName('button')[1];
     oneMoreTimeBtn.addEventListener('click', function () {
         window.location.reload();
     });



     var clearHighScores = document.querySelector('.clear');

     clearHighScores.addEventListener('click', function (evt) {
         // localStorage.clear();
         localStorage.setItem('scoreRecord', JSON.stringify([]));
         renderHighScores();
     });


     function renderQuestion(index) {
         var quizQuestionTitle = quizQuestion.querySelector('.question-title');
         var allLis = quizQuestion.querySelectorAll('li');
         correct.style.display = 'none';
         wrong.style.display = 'none';
         quizQuestionTitle.textContent = questionArr[index].question;

         allLis.forEach(function (li) {
             li.className = '';
             li.style.backgroundColor = '#000091';
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
 var quizSubmit = document.getElementById('submit-quiz');
 function resetTimer() {
     timer = 60;
     timerCountDown.textContent = timer;
     clearInterval(intervalID);
     intervalID = setInterval(function () {
         timer--;
         timerCountDown.textContent = timer;
        
         if (timer <= 0) {
             timer = 0;
             // timerCountDown.textContent = timer;
             clearInterval(intervalID);
             alert('Time Out!');
             // quizQuestion.style.display = 'none';
         }
         if (quizSubmit.style.display === 'block') {
             timerCountDown.textContent = "0";
             clearInterval(intervalID);
         }
     }, 1000);
}
