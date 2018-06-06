$(document).ready(function() {
    $("#introSection").hide();//.hide() .. hides matched elements
    $("#messageSection").hide();
    $('#instructionModal').modal();//Opens instructions
    $('.parallax').parallax(); // function for MaterializeCSS parallax componenet
    $('.tooltipped').tooltip({ // delay function for button tool tips
        delay: 50
    });


    $("#introSection").fadeIn(1000 * 5, function() { // fade in page elements
        // fadeIn function
    });

    $("#questionPotter").hide()
    var correctCounter = 0,
        incorrectCounter = 0,
        unansweredCounter = 0,
        currentQuestionIndex = 0;


    var congratsMessages = ['Great going first year', 'Wingardium Leviosa', "Lumos!"]; //creates array of different Congrats messages

    function randomNum(x) {
        var roll = Math.floor(Math.random() * x);
        return roll;
    }

    function randomCongrats() {
        var messageRoll = randomNum(congratsMessages.length);
    }//randomly chooses random congrats message


//Following code creates countdown timer
    function countDown() {
        $('.pickAnswer').click(function() {
            $(this).data('clicked', true);
        });
        var i = 30;
        var myInterval = setInterval(function() {

            if (i < 10) {
                $('#timerSeconds').html("0" + i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            } else {
                $('#timerSeconds').html(i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            }

            if (i === 0) {
                unansweredCounter++;
                clearInterval(myInterval);
                currentQuestionIndex++;
                $('#timer').effect("pulsate", {
                    times: 25
                }, 1000 * 5);
                i = 30;
                postQuestion(currentQuestionIndex);
            } else {
                i--;
            }
        }, 1000);
    }

    //Quiz Questions
    var questions = [
        // question 1
        {
            "q": "What Platform do you take to go to Hogwarts?",
            "c": ["9 & 3/4", "12 & 3/4", "8 & 3/4"],
            "answer": 0
        },
        // question 2
        {
            "q": "Where do you go for the sorting ceremony?",
            "c": ["Great Hall", "Diagon Ally", "Grand Hall"],
            "answer": 0
        },
        // question 3
        {
            "q": "Who is the Headmaster of Hogwarts?",
            "c": ["Severus Snape", "Lily Potter", "Albus Dumbledore"],
            "answer": 2
        },
        // question 4
        {
            "q": "Who is the potions professor?",
            "c": ["Prof. McGonagall", "Prof. Lupin", "Prof. Snape"],
            "answer": 2
        },
        // question 5
        {
            "q": "Who is the gamekeeper at Hogwarts?",
            "c": ["Hagrid", "Dumbledore", "Petunia"],
            "answer": 0
        },
        // question 6
        {
            "q": "What charm makes an item float?",
            "c": ["Lumos", "Wingardium Leviosa", "Accio"],
            "answer": 1
        },
        // question 7
        {
            "q": "What house has a snake as it's mascot?",
            "c": ["Gryffindor", "Slytherin", "Ravenclaw"],
            "answer": 1
        },
        // question 8
        {
            "q": "Where do you get your wand?",
            "c": ["The Leaky Cauldron", "Flourish and Blotts", "Ollivanders"],
            "answer": 2
        },
        // question 9
        {
            "q": "What house is Hermione Granger in?",
            "c": ["Gryffindor", "Ravenclaw", "Hufflepuff"],
            "answer": 0
        },
        // question 10
        {
            "q": "To win the Quidditch game, you must catch _______",
            "c": ["The Silver Snitch", "The Golden Snitch", "The Bronze Snitch"],
            "answer": 1
        }
    ];


    function postQuestion(n) {

        if (currentQuestionIndex < questions.length) {
            $('#question').remove();
            $('.pickAnswer').remove();
            countDown();
            $('#questionContainer').append("<div id='question'>" + questions[n].q + "</div>");
            for (var i = 0; i < questions[n].c.length; i++) {
                var newDiv = $("<div>");
                newDiv.addClass("pickAnswer").attr("indexnum", i).text(questions[n].c[i]);
                $('#choices').append(newDiv);
            }


        } else {
            resetGame(); // the conditional successfully loops the game
        }

        $(".pickAnswer").on("click", function() {
            var userChoice = $(this).attr('indexnum'); // stored as a string not a number
            userChoice = parseInt(userChoice);

            // checks if user is correct and will tally accordingly
            if (userChoice === questions[currentQuestionIndex].answer) {
                correctCounter++;
                currentQuestionIndex++
                randomCongrats();

            } else {
                incorrectCounter++;
                currentQuestionIndex++;

            }
            postQuestion(currentQuestionIndex);
        })
    }

    function startTrivia() {
        $('#messageSection').hide();
        $('#gameMessage').empty()
        $('#questionContainer').show();
        $('#choices').show();
        $("#timer").show();
        correctCounter = 0;
        incorrectCounter = 0;
        unansweredCounter = 0;
        currentQuestionIndex = 0;

        postQuestion(currentQuestionIndex);

    }

    function resetGame() {
        $('#messageSection').show();
        $('#questionContainer').hide();
        $('#choices').hide();
        $('#timer').hide()

        $('#gameMessage').append("<h2>You have completed the quiz!</h2>");
        $('#gameMessage').append("<h4>Total Correct: " + correctCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Incorrect: " + incorrectCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Unanswered: " + unansweredCounter + "</h4>");

        setTimeout(startTrivia, 1000 * 10);

    }



    $("#startButton").on("click", function() {
        $("#buttonRow").hide();
        $("#introCard").remove();
        $("#timer").append("<span id='timerMinutes'>00</span>:<span id='timerSeconds'>00</span>");
        $("#questionPotter").show();

        startTrivia();


    })


});