var s;
var m;
var intervalID;
var condition;

function startTimer(param){
  s=0;
  m=0;
  condition=param;
intervalID=setInterval(startTime, 1000);
}

function startTime() {
document.getElementById('output').innerHTML =
checkTime(m) + ":" + checkTime(s);
s=s+1;
if(s>condition){
  clearInterval(intervalID);
  var score = 0
  var message = "Message";

  // document.getElementById('memory--end-game-message').textContent = message;
  // document.getElementById('memory--end-game-score').textContent =
  //     'Score: ' + score + ' / 100';

  document.getElementById("memory--end-game-modal").classList.toggle('show');
}

}
function checkTime(i) {
if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
return i;
}
