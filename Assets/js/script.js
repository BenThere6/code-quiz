var viewScores = document.getElementById("view_scores");
var timerCount = document.getElementById("timer_count");
var timeDiv = document.getElementById("time_div");
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
var rightOrWrongEl = document.getElementById("right_or_wrong");
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
var timeLeftMain = 60;
var message;

finalScoreEl.textContent = points;
timerCount.textContent = timeLeftMain;

// When this button is clicked, start timer and change to questions screen
startQuizBtn.addEventListener('click',function() {
    timeLeft = timeLeftMain;
    isQuizComplete = false;
    timerUpdate();
    renderQuestionAndOptions();
    showQuestionScreen();
});

// When any of the option buttons are clicked, render the new question and options
optionOneBtn.addEventListener('click',function() {
    if (optionOneEl.textContent === correctAnswers[questionNum]) {
        message = 'Correct!';
        points += 5;
    } else {
        message = 'Wrong!';
        timeLeft -= 10;
    }
    questionNum++;
    renderQuestionAndOptions();
    displayMessage();
    renderScore();
});

optionTwoBtn.addEventListener('click',function() {
    if (optionTwoEl.textContent === correctAnswers[questionNum]) {
        message = 'Correct!';
        points += 5;
    } else {
        message = 'Wrong!';
        timeLeft -= 10;
    }
    questionNum++;
    renderQuestionAndOptions();
    displayMessage();
    renderScore();
});

optionThreeBtn.addEventListener('click',function() {
    if (optionThreeEl.textContent === correctAnswers[questionNum]) {
        message = 'Correct!';
        points += 5;
    } else {
        message = 'Wrong!';
        timeLeft -= 10;
    }
    questionNum++;
    renderQuestionAndOptions();
    displayMessage();
    renderScore();
});

optionFourBtn.addEventListener('click',function() {
    if (optionFourEl.textContent === correctAnswers[questionNum]) {
        message = 'Correct!';
        points += 5;
    } else {
        message = 'Wrong!';
        timeLeft -= 10;
    }
    questionNum++;
    renderQuestionAndOptions();
    displayMessage();
    renderScore();
});

// When back button clicked, change to main screen
backBtn.addEventListener('click',function() {
    questionNum = 0;
    points = 0;
    timerCount.textContent = timeLeftMain;
    renderQuestionAndOptions();
    renderScore();
    showMainScreen();
});

// When clear scores button is clicked, remove the 'scores' key from local storage
clearScoresBtn.addEventListener('click',function() {
    localStorage.removeItem("scores");
    scoresListEl.innerHTML = '';
});

// If view scores is clicked, show score screen unless there are no scores to display
viewScores.addEventListener('click',function() {
    try {
        renderScoreList();
        showScoresScreen();
    }
    catch {
        alert('No scores to display')
    }
});

// When initials form is submitted, save initials and show score screen
$('#save_score').submit(function(e){
    showScoresScreen();
    initials = document.querySelector('#initials').value.toUpperCase();
    document.getElementById('initials').value = "";
    e.preventDefault();
    saveScore();
    renderScoreList();
});

// Display right or wrong message after each question
function displayMessage() {
    // If there is a message timer going, clear it first
    try {
        clearTimeout(messageTimeout);
    }
    catch {
        console.log("No message timer yet");
    }
    rightOrWrongEl.style.display = 'block';
    rightOrWrongEl.textContent = message;
    messageTimeout = setTimeout(() => {
        rightOrWrongEl.style.display = 'none';
    }, 2000);
}

// Display question and options based on questionNum
function renderQuestionAndOptions() {
    if (questionNum < 5) {
        questionEl.textContent = questionsArray[questionNum];
        optionOneEl.textContent = optionsArray[questionNum][0];
        optionTwoEl.textContent = optionsArray[questionNum][1];
        optionThreeEl.textContent = optionsArray[questionNum][2];
        optionFourEl.textContent = optionsArray[questionNum][3];
    }
    // If timeLeft hasn't been defined yet, checkQuizComplete will get an error, but at that point it also wouldn't need to run. This skips it.
    try {
        checkQuizComplete();
    }
    catch {
        console.log("Skipping quiz-complete check");
    }
}

function renderScore() {
    finalScoreEl.textContent = points;
}

// If quiz is complete, show quiz end screen 
function checkQuizComplete() {
    if (questionNum == 5 || timeLeft <= 0) {
        showQuizEndScreen();
        isQuizComplete = true;
        // If any questions were answered correctly, add timeLeft to points
        if (points > 4) {
            points += timeLeft + 1;
        } else {
            points = 0;
        }
        timeLeft = 0;
    }
}

// Make the timer countdown every second until it reaches 0
function timerUpdate() {
    var timerInterval = setInterval(function() {
        timeLeft--;
        timerCount.textContent = timeLeft;
        if(timeLeft < 1) {
            timerCount.textContent = "";
            clearInterval(timerInterval);
            checkQuizComplete();
        }
    }, 1000);
}

// Save initials and points to local storage as JSON list
function saveScore() {
    currentScore = [[initials,points]];
    const scores = (localStorage.getItem('scores') !== null);
    if (!scores) {
        localStorage.setItem("scores", JSON.stringify(currentScore));
    } else {
        // Sort list in descending order
        var sortedScoresList = [];
        var pointsList = [];
        // Pull list from local storage and add current score
        unsortedScoresList = JSON.parse(localStorage.getItem("scores"));
        unsortedScoresList.push(currentScore[0]);
        // Add points to separate list
        for (i=0;i<unsortedScoresList.length;i++) {
            point = unsortedScoresList[i][1];
            if (!pointsList.includes(point)) {
                pointsList.push(point);
            };
        }
        // Sort points list in descending order
        pointsList = pointsList.sort().reverse();
        // Loop through pointsList and unsortedScoresList. Append unsorted item to sorted list if it matches pointsList[i].
        for (i=0;i<pointsList.length;i++){
            for (j=0;j<unsortedScoresList.length;j++) {
                if (unsortedScoresList[j][1] == pointsList[i]){
                    sortedScoresList.push(unsortedScoresList[j]);
                }
            }
        }
        // Save sorted list to local storage in JSON format
        localStorage.setItem("scores", JSON.stringify(sortedScoresList));
    }
}

// Create list items for each score saved in local storage
function renderScoreList() {
    scoresListEl.innerHTML = '';
    scoresList = JSON.parse(localStorage.getItem("scores"));

    for (i=0;i<scoresList.length;i++) {
        initials = scoresList[i][0];
        points = scoresList[i][1];
        $('#scores_list').append('<li>' + points + ' - ' + initials + '</li>');
    }
}

function init() {
    showMainScreen();
}

function showMainScreen() {
    mainScreen.style.display = "block";
    questionScreen.style.display = "none";
    quizEndScreen.style.display = "none";
    scoresScreen.style.display = "none";
    viewScores.style.color = "var(--purple)";
    timeDiv.style.display = "block";
}

function showQuestionScreen() {
    mainScreen.style.display = "none";
    questionScreen.style.display = "block";
    quizEndScreen.style.display = "none";
    scoresScreen.style.display = "none";
    viewScores.style.color = "white";
    timeDiv.style.display = "block";
}

function showQuizEndScreen() {
    mainScreen.style.display = "none";
    questionScreen.style.display = "none";
    quizEndScreen.style.display = "block";
    scoresScreen.style.display = "none";
    viewScores.style.color = "var(--purple)";
    timeDiv.style.display = "none";
}

function showScoresScreen() {
    mainScreen.style.display = "none";
    questionScreen.style.display = "none";
    quizEndScreen.style.display = "none";
    scoresScreen.style.display = "block";
    viewScores.style.color = "white";
    timeDiv.style.display = "none";
}

init();