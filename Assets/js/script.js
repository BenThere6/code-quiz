var viewScores = document.getElementById("view_scores");
var timerCount = document.getElementById("timer_count");
var mainScreen = document.getElementById("main_screen");
var startQuizBtn = document.getElementById("start_quiz");
var questionScreen = document.getElementById("question_screen");
var questionEl = document.getElementById("question");
var optionOneEl = document.getElementById("option_one");
var optionTwoEl = document.getElementById("option_two");
var optionThreeEl = document.getElementById("option_three");
var optionFourEl = document.getElementById("option_four");
var optionOneBtn = document.getElementById("option_one_btn");
var optionTwoBtn = document.getElementById("option_two_btn");
var optionThreeBtn = document.getElementById("option_three_btn");
var optionFourBtn = document.getElementById("option_four_btn");
var rightOrWrongEl = document.getElementById("view_scores");
var quizEndScreen = document.getElementById("quiz_end_screen");
var finalScoreEl = document.getElementById("final_score");
var scoresScreen = document.getElementById("scores_screen");
var scoresListEl = document.getElementById("scores_list");
var backBtn = document.getElementById("go_back");
var clearScoresBtn = document.getElementById("clear_scores");
var questionsArray = ['Commonly used data types DO NOT include:','The condition in an if / else statement is enclosed within _____.','Arrays in JavaScript can be used to store _____.','String values must be enclosed within _____ when being assigned to variables.','A very useful tool used during development and debugging for printing content to the debugger is:'];
var optionsArray = [['strings','booleans','alerts','numbers'],['quotes','curly brackets','parenthesis','square brackets'],['numbers and strings','other arrays','booleans','all of the above'],['commas','curly brackets','quotes','parenthesis'],['JavaScript','terminal / bash','for loops','console.log']];
var correctAnswers = ['alerts','parenthesis','all of the above','quotes','console.log'];
var questionNum = 0;
var points = 0;
var isQuizComplete = false;
var timeLeft = 10;

finalScoreEl.textContent = points;

startQuizBtn.addEventListener('click',function() {
    timeLeft = 10;
    startQuizBtn.disabled = true;
    timerUpdate();
    renderQuestionAndOptions();
});

optionOneBtn.addEventListener('click',function() {
    if (optionOneEl.textContent === correctAnswers[questionNum]) {
        console.log("correct answer");
        points += 20;
    } else {
        console.log("wrong answer");
    }
    questionNum++;
    renderQuestionAndOptions();
    renderScore();
});

optionTwoBtn.addEventListener('click',function() {
    if (optionTwoEl.textContent === correctAnswers[questionNum]) {
        console.log("correct answer");
        points += 20;
    } else {
        console.log("wrong answer");
    }
    questionNum++;
    renderQuestionAndOptions();
    renderScore();
});

optionThreeBtn.addEventListener('click',function() {
    if (optionThreeEl.textContent === correctAnswers[questionNum]) {
        console.log("correct answer");
        points += 20;
    } else {
        console.log("wrong answer");
    }
    questionNum++;
    renderQuestionAndOptions();
    renderScore();
});

optionFourBtn.addEventListener('click',function() {
    if (optionFourEl.textContent === correctAnswers[questionNum]) {
        console.log("correct answer");
        points += 20;
    } else {
        console.log("wrong answer");
    }
    questionNum++;
    renderQuestionAndOptions();
    renderScore();
});

backBtn.addEventListener('click',function() {
    questionNum = 0;
    points = 0;
    renderQuestionAndOptions();
    renderScore();
    // timerUpdate();
});

clearScoresBtn.addEventListener('click',function() {
    localStorage.removeItem("scores");
    scoresListEl.innerHTML = '';
});

viewScores.addEventListener('click',function() {
    renderScoreList();
});

$('#save_score').submit(function(e){
    initials = document.querySelector('#initials').value.toUpperCase();
    document.getElementById('initials').value = "";
    e.preventDefault();
    saveScore();
    renderScoreList();
});

function renderQuestionAndOptions() {
    if (questionNum < 5) {
        questionEl.textContent = questionsArray[questionNum];
        optionOneEl.textContent = optionsArray[questionNum][0];
        optionTwoEl.textContent = optionsArray[questionNum][1];
        optionThreeEl.textContent = optionsArray[questionNum][2];
        optionFourEl.textContent = optionsArray[questionNum][3];
    }
    checkQuizComplete();
}

function renderScore() {
    finalScoreEl.textContent = points;
}

function checkQuizComplete() {
    if (questionNum == 5 || timeLeft == 0) {
        isQuizComplete = true;
        startQuizBtn.disabled = false;
        timeLeft = 0;
    }
}

function timerUpdate() {
    // var timeLeft = 10;
    var timerInterval = setInterval(function() {
        
        timerCount.textContent = timeLeft;
        timeLeft--;
    
        if(timeLeft < 1) {
            timerCount.textContent = "";
            clearInterval(timerInterval);
            checkQuizComplete();
        }
    
    }, 1000);
}

function saveScore() {
    // $('#scores_list').append('<li>' + initials + ' - ' + points + '<li>');

    currentScore = [initials + ',' + points];
    // console.log(currentScore);

    const scores = (localStorage.getItem('scores') !== null);
    if (!scores) {
        localStorage.setItem("scores", JSON.stringify(currentScore));
    } else {
        scoresList = JSON.parse(localStorage.getItem("scores"));
        scoresList.push(currentScore[0]);
        localStorage.setItem("scores", JSON.stringify(scoresList));
    }
}

function renderScoreList() {
    scoresListEl.innerHTML = '';
    scoresList = JSON.parse(localStorage.getItem("scores"));
    // console.log("render scores");
    // console.log(scoresList);
    for (i=0;i<scoresList.length;i++) {
        splitScoreItem = scoresList[i].split(',');
        initials = splitScoreItem[0];
        points = splitScoreItem[1];
        $('#scores_list').append('<li>' + initials + ' - ' + points + '<li>');
    }
}