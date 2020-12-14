// VARIABLES
// ************************************************************************************************************************

var intervalId;

var correctAnswers = 0;

var incorrectAnswers = 0;

var unanswered = 0;

var questionIndex = 0;

var questionTime = 30;

var breakTime = 3;

var beerQuestions = [{
    "question": "Where and when was the earliest instance of beer found?",
    "option1" : "Mesopotamia (ancient Iraq) & 19th Century BC",
    "option2" : "Ancient Egypt & 32nd Century BC",
    "option3" : "Ancient Greece & 12th Century BC",
    "option4" : "Ancient Rome & 8th Century BC",
    "answer"  : "Mesopotamia (ancient Iraq) & 19th Century BC"
}, {
    "question": "What is the oldest active brewery in the USA?",
    "option1" : "Pabst Brewing Company",
    "option2" : "Minhas Craft Brewery",
    "option3" : "Anheuser-Busch",
    "option4" : "Yuengling",
    "answer"  : "Yuengling"
}, {
    "question": "What is the best selling beer in the world?",
    "option1" : "Heineken",
    "option2" : "Budweiser",
    "option3" : "Snow",
    "option4" : "Bud Light",
    "answer"  : "Snow"
}];

// FUNCTIONS
// ***********************************************************************************************************************

function questionTimer() {
    intervalId = setInterval(decrementQuestionTime, 1000);
}

function decrementQuestionTime() {
    questionTime--;
    $("#questionTime").text("Time Remaining: " + questionTime + " seconds");
    if (questionTime === 0) {
        stop();
        $("#beerQuestion").text("Out of Time!");
        $(".answerButtons").text("The Correct Answer was: " + beerQuestions[questionIndex].answer)
        unanswered++;
        questionIndex++;
        questionBreakTime();
    }
}

function questionBreakTime() {
    intervalId = setInterval(decrementBreakTime, 1000);
}

function decrementBreakTime() {
    breakTime--;
    if (breakTime === 0) {
        stop();
        questionTime = 30;
        breakTime = 3;
        $("#questionTime").text("Time Remaining: " + questionTime + " seconds");
        $(".answerButtons").empty();
        if (questionIndex <= beerQuestions.length - 1) {
            questionTimer();
            createAnswerDiv();
        } else if (questionIndex > beerQuestions.length - 1) {
            gameReset();
        }
    }
}

function createAnswerDiv() {
    for (var i = 1; i < 5; i++) {
        var answerButtonDiv = $("<div>")
        // Assign new button element to variable answerButton
        var answerButton = $("<button>");
            // Assign class, id, and value to each answerButton
            answerButton.attr({
                "class": "answerButton btn btn-block",
                "id": "option" + i,
            });
        answerButtonDiv.append(answerButton);
        $(".answerButtons").append(answerButtonDiv);
    }
    $("#beerQuestion").text(beerQuestions[questionIndex].question);
    $("#option1").text(beerQuestions[questionIndex].option1);
    $("#option2").text(beerQuestions[questionIndex].option2);
    $("#option3").text(beerQuestions[questionIndex].option3);
    $("#option4").text(beerQuestions[questionIndex].option4);
}

function stop() {
    clearInterval(intervalId);
}

function checkUserAnswer() {
    stop();
    var userAnswer = $(this).text();

    if (userAnswer === beerQuestions[questionIndex].answer) {
        $("#beerQuestion").text("Correct!");
        $(".answerButtons").empty();
        correctAnswers++;
    } else {
        $("#beerQuestion").text("Nope!");
        $(".answerButtons").text("The Correct Answer was: " + beerQuestions[questionIndex].answer)
        incorrectAnswers++;
    }
    questionIndex++;
    questionBreakTime();
}

function gameReset() {
        $("#beerQuestion").text("All done, here's how you did!");
        $("#questionTime").empty();
        $(".answerButtons").append("<p>Correct Answers: " + correctAnswers + "</p>");
        $(".answerButtons").append("<p>Incorrect Answers: " + incorrectAnswers + "</p>");
        $(".answerButtons").append("<p>Unanswered: " + unanswered + "</p>");
        $("#start").show();
    }

// MAIN PROCESS
//************************************************************************************************************************
$(document).ready(function() {

    $("#start").click(function() {
        $("#start").hide();
        $(".answerButtons").empty();
        correctAnswers = 0;
        incorrectAnswers = 0;
        unanswered = 0;
        questionIndex = 0;
        $("#questionTime").text("Time Remaining: " + questionTime + " seconds");
        questionTimer();
        createAnswerDiv();
    });

    // Run the checkUserAnswer function when someone clicks on one of the answer choices
    $(document).on("click", ".answerButton", checkUserAnswer);
});