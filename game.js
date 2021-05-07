var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


// Main Game
function nextSequence() {
  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4); //Random Number Generator

  var randomChosenColor = buttonColors[randomNumber]; //Call random item from buttonColors
  gamePattern.push(randomChosenColor); //Add randomChosenColor to gamePattern Array
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100); //Animation for gamePattern

  playSound(randomChosenColor);

  $("#level-title").text("Level " + level); //Changing H1 w/ Level Number
  level++;
}


function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}


// Comparing last item in userClickedPattern to gamePattern
function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if(gamePattern.length === userClickedPattern.length) {
      setTimeout(() => nextSequence(), 1000);
    }
  } else {
    $("#level-title").text("Game over, Press Any Key to Restart");

    playSound("wrong");

    $("body").addClass("game-over"); //Background Flash Red
    setTimeout(() => $("body").removeClass("game-over"), 200);
    startOver();
  }
}


// Handler Function for adding to userClickedPattern
$(".btn").click(function() {
  var userChosenColor = this.id; //User Selection
  userClickedPattern.push(userChosenColor); //Saves User Selection

  checkAnswer(userClickedPattern.length - 1);

  playSound(userChosenColor);
  animatePress(userChosenColor);
});


// Adding Sounds to Button Clicks
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


// User Click Animation
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed"); //Add "Pressed" class to user selection

  setTimeout(() => $("#" + currentColor).removeClass("pressed"),100);
}


// Detect Keydown & Start the Game
$(document).keydown(function() {
  if(!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true; //Limit the # of Keydown Events to 1
  }

});
