
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
});

function startOver() {
    level = 0; // Reset level to 0
    gamePattern = []; // Clear gamePattern array
    gameStarted = false; // Reset gameStarted flag
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        // Success case
        if (userClickedPattern.length === gamePattern.length) {
            // Check if sequence completed successfully
            setTimeout(function() {
                nextSequence();
                userClickedPattern = []; // Reset userClickedPattern to an empty array
            }, 1000);
        }
    } else {
        // Wrong case
        playSound("wrong"); // Play wrong sound
        $("body").addClass("game-over"); // Apply "game-over" class to the body
        setTimeout(function() {
            $("body").removeClass("game-over"); // Remove "game-over" class after 200 milliseconds
        }, 200);
        $("#level-title").text("Game Over, Refresh the Page"); // Change h1 title
        startOver(); // Call startOver() if the user gets the sequence wrong
    }
}

function nextSequence() {

  //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

