let gamePattern=[];

let buttonColours=["red","blue","green","yellow"]
let userClickedPattern=[];


var started=false;

var level=0;

$(document).keypress(function(){
    if((!started))
    {   level=0;
        $("#level-title").text('Level'+level);
        nextSequence();
        started=true;
    }
})



$(".btn").click(function(){
    let userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkans(userClickedPattern.length-1);
});
function playSound(name){
    var audio=new Audio("sounds/" + name + ".mp3");
    audio.play();
};
function nextSequence()
{
    level++;
    userClickedPattern=[];
    $("#level-title").text("Level " + level);
    randomNo=Math.floor(Math.random()*10)%4;
    let randomCol= buttonColours[randomNo];
    gamePattern.push(randomCol);
    $("#"+randomCol).fadeOut(1000).fadeIn(1000);
    playSound(randomCol);
};


function animatePress(currentColour)
{   
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed")
    },100);
};


function checkans(currentLevel)
{
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel])
    {
        console.log("success");
        if(userClickedPattern.length==gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else
    {
        
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over");},200);
        startover();

    }
}


function startover()
{
    level=0;
    gamePattern=[];
    started=false;
}