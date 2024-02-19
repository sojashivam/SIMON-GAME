
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;



$(document).keypress(function () {
    if (!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;

    }
    
});

$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    checkanswer(userClickedPattern.length-1);
    animatePress(userChosenColour);
});

function checkanswer(currentlevel) {
    if (userClickedPattern[currentlevel] === gamePattern[currentlevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            },1000);
            
        }
        }else{
            playSound("wrong");
            $("h1").text("KHATAM BYE BYE, Press Any Key to Restart");
            $("body").addClass("game-over");
            setTimeout(function () {
                $("body").removeClass("game-over");
            },500)
            startover();
        
    }
}


function nextSequence() {
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
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


function startover() {
    level=0;
    gamePattern=[];
    started=false;
}
