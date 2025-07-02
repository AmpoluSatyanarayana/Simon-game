var userClickedPattern=[];
var gamePattern=[];
var level=0;
var buttonColors=["red","blue","green","yellow"];
var start=false;

$(document).keypress(function() {
  if (!start) {
    $("#level-title").text("Level " + level);
    nextSequence();
    start =true;
  }
});


$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
     userClickedPattern.push(userChosenColour);
    //  console.log(userClickedPattern);
     checkAnswer(userClickedPattern.length - 1);
     playSound(userChosenColour);
     animatePress(userChosenColour);
});

function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level "+level);
  var num=Math.floor(Math.random()*4);
  var randomChosenColor=buttonColors[num];
  gamePattern.push(randomChosenColor);
  // console.log(gamePattern);
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(colour)
{
    $("#"+colour).addClass("pressed");
    setTimeout(function(){
      $("#"+colour).removeClass("pressed");  
    },100)
}

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        console.log("YES "+level);
        if(gamePattern.length===userClickedPattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
      }
      else 
      {
        console.log("NO");
        playSound("wrong"); 
        startOver();
      }

  console.log("User pattern: ", userClickedPattern);
  console.log("Game pattern: ", gamePattern);
}

function startOver(){
     level=0;
     gamePattern=[];
     start=false;
    //  userClickedPattern=[];
     $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
          }, 200);
     $("h1").text("Game Over, Press Any Key to Restart");
}