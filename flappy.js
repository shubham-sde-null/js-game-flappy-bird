const hole = document.getElementById("hole");
const bird = document.getElementById("bird");
const block = document.getElementById("block");
var jumpinig = 0;
var result = document.getElementById("result");
var toJump = document.getElementById("tojump");
var text = document.getElementById("text");
var game = document.getElementById("game");
var btn = document.getElementById("btn"); // added to control score from becoming zero
var test = document.getElementById("test");
var score = 0;
var randomBorder = ["#0984e3", "#fd79a8", "#81ecec", "#55efc4"]; // added to change the border color
var randomB;
const merascore = document.getElementById("merascore");

function randomBorderColor() {
  randomB = Math.floor(Math.random() * 3);
}
setInterval(() => {
  randomBorderColor();
  game.style.border = `5px solid ${randomBorder[randomB]}`;
  // console.log(randomB);
}, 2000);

// animation function
hole.addEventListener("animationiteration", hole_space);

function hole_space() {
  var random = -(Math.random() * 350 + 150);
  hole.style.top = random + "px";
  score++;
  merascore.innerHTML = `score:${score}`;
}

// fall and game over code
var fall = setInterval(function () {
  var birdTop = parseInt(window.getComputedStyle(bird).getPropertyValue("top"));
  if (jumpinig == 0) {
    bird.style.top = birdTop + 2 + "px";
  }
  var blockLeft = parseInt(
    window.getComputedStyle(block).getPropertyValue("left")
  );
  var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
  var hTop = 500 + holeTop; //we are adding 500 so  that we can calculate the top from display top earlier the value of top is calculated from the bottom of the display
  if (
    birdTop > 450 ||
    (blockLeft < 50 &&
      blockLeft > -50 &&
      (birdTop < hTop || birdTop > hTop + 100))
  ) {
    result.style.display = "block";
    text.innerText = `score:${score}`;
    game.style.display = "none";
    // score = 0;
    // console.log("earlier" + score);
    btn.addEventListener("click", function () {
      score = 0;
      // console.log(score);
    });
  }
}, 10);
// setInterval(fall, 10);

// jump
function jump() {
  jumpinig = 1;
  var birdTop = parseInt(window.getComputedStyle(bird).getPropertyValue("top"));
  if (birdTop > 10) {
    bird.style.top = birdTop - 70 + "px";
  }

  setTimeout(function () {
    jumpinig = 0;
  }, 100); // here this setTieout function will run only once and it will again make the value of jumping to zero(here by doing this our bird gets stopped in air for whatever time we specified )
}
window.addEventListener("keydown", jump);
toJump.addEventListener("click", jump);
