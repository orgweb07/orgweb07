var computer = [];
var human = [];
var num = 0;
var game = false;

var fis = 0;
$(document).keypress(function (e) {
  if(e.key === "r" || e.key === "R") {
    startOver();
    begin();
  }
});

$(".btn").click(function () {
  var hum = Number($(this).attr("id"));
  human.push(hum);

  playsound(hum);
  animatePress(hum);

  console.log("human from button press:" + human);
  if (human.length === computer.length) {
    var chck = check(human.length - 1);
    console.log(chck)
    if (chck === 0) {
      begin();
    }
    else {
      playsound("wrong");
      $("h1").text("Game Over, Press R to Restart");

      startOver();
    }
    console.log("computer from button press:" + computer);
  }
});

function check(currentLevel) {
  let flag = 0;
  for (let i = 0; i <= currentLevel; i++) {
    if (human[i] === computer[i]) {
      flag = 0;
    } else {
      flag = 1;      
      break;
    }
  }
  return flag;
}

function begin() {
  num++;
  $("h1").text(`level ${num}`);
  human = [];

  fis = Math.floor(Math.random() * 4 + 1);
  computer.push(fis);

  $(`#${fis}`).fadeIn(100).fadeOut(100).fadeIn(100);
  computerPlaysound();
  console.log("computer from begin:" + computer);
  console.log("human from begin:" + human);
}

function animatePress(hum) {
  $(`#${hum}`).toggleClass("pressed");
  setTimeout(function () {
    $(`#${hum}`).toggleClass("pressed");
  }, 100);
}

function playsound(temp) {
  var audio = new Audio(`sounds/${temp}.mp3`);
  audio.play();
}

function computerPlaysound() {
  var index = 0;

  var audio = new Audio(`sounds/${computer[index]}.mp3`);
  audio.play();
  //animatePress(computer[index]);
  index++;
  audio.onended = function () {
    if (index <= computer.length - 1) {
      audio.src = `sounds/${computer[index]}.mp3`;
      audio.play();
      animatePress(computer[index]);
      index++;
    }
  };
}

function startOver() {
  computer = [];
  game = 0;
  num = false;
  // begin();
}
