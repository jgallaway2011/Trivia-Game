// VARIABLES
// ************************************************************************************************************************

var intervalId;

var correctAnswers = 0;

var incorrectAnswers = 0;

var unanswered = 0;

var questionIndex = 0;

var questionTime = 30;

var breakTime = 4;

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
    $("#questionTime").text("Time Remaining: " + questionTime + " seconds" );
    intervalId = setInterval(decrementQuestionTime, 1000);
}

function decrementQuestionTime() {
    questionTime--;
    $("#questionTime").text("Time Remaining: " + questionTime + " seconds" );
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
        breakTime = 4;
        $(".answerButtons").empty();
        if (questionIndex <= beerQuestions.length - 1) {
            questionTimer();
            for (var i = 1; i < 5; i++) {
                // Assign new button element to variable crystalButton
                var answerButton = $("<button>");
                    // Assign class, id, and value to each crystalButton
                    answerButton.attr({
                        "class": "answerButton",
                        "id": "option" + i,
                    });
                $(".answerButtons").append(answerButton);
            } 
            $("#beerQuestion").text(beerQuestions[questionIndex].question);
            $("#option1").text(beerQuestions[questionIndex].option1);
            $("#option2").text(beerQuestions[questionIndex].option2);
            $("#option3").text(beerQuestions[questionIndex].option3);
            $("#option4").text(beerQuestions[questionIndex].option4);

            $(".answerButton").click(function() {
                stop();
                var answerValue = $(this).text();
    
                if (answerValue === beerQuestions[questionIndex].answer) {
                    $("#beerQuestion").text("Correct!");
                    $(".answerButtons").empty();
                    questionIndex++;
                    correctAnswers++;
                    questionBreakTime();
                
                } else {
                    $("#beerQuestion").text("Nope!");
                    $(".answerButtons").text("The Correct Answer was: " + beerQuestions[questionIndex].answer)
                    questionIndex++;
                    incorrectAnswers++;
                    questionBreakTime();
                }
            });
        } else if (questionIndex > beerQuestions.length - 1) {
            gameReset();
        }
    }
}

function gameReset() {
        $("#beerQuestion").text("All done, here's how you did!");
        $("#questionTime").empty();
        $(".answerButtons").append("<p>Correct Answers: " + correctAnswers + "</p>");
        $(".answerButtons").append("<p>Inorrect Answers: " + incorrectAnswers + "</p>");
        $(".answerButtons").append("<p>Unanswered: " + unanswered + "</p>");
        $("#start").show();
    }

function stop() {
    clearInterval(intervalId);
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
        questionTimer();
        for (var i = 1; i < 5; i++) {
            // Assign new button element to variable crystalButton
            var answerButton = $("<button>");
                // Assign class, id, and value to each crystalButton
                answerButton.attr({
                    "class": "answerButton",
                    "id": "option" + i,
                });
            $(".answerButtons").append(answerButton);
        }
        $("#beerQuestion").text(beerQuestions[questionIndex].question);
        $("#option1").text(beerQuestions[questionIndex].option1);
        $("#option2").text(beerQuestions[questionIndex].option2);
        $("#option3").text(beerQuestions[questionIndex].option3);
        $("#option4").text(beerQuestions[questionIndex].option4);

        $(".answerButton").click(function() {
            stop();
            var answerValue = $(this).text();

            if (answerValue === beerQuestions[questionIndex].answer) {
                $("#beerQuestion").text("Correct!");
                $(".answerButtons").empty();
                questionIndex++;
                correctAnswers++;
                questionBreakTime();
            
            } else {
                $("#beerQuestion").text("Nope!");
                $(".answerButtons").text("The Correct Answer was: " + beerQuestions[questionIndex].answer)
                questionIndex++;
                incorrectAnswers++;
                questionBreakTime();
            }
        });
    });

});