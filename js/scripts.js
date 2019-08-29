//Business logic
// User constructor
function User (diceNumber, scoreTotal, turnTotal, userNumber) {
  this.diceNumber = diceNumber,
  this.scoreTotal = scoreTotal,
  this.turnTotal = turnTotal,
  this.userNumber = userNumber
}

User.prototype.isOne = function(diceRoll) {
  this.diceNumber = diceRoll;
  if(this.diceNumber === 1) {
    $("input#throw-total").val("0");
    switchUser();
  } else {
    this.turnTotal += this.diceNumber;
    $("input#throw-total").val(this.turnTotal);
  }
}

User.prototype.sumScore = function() {
    this.scoreTotal += this.turnTotal;

  if(this.scoreTotal >= 100) {
    $(".modal").modal();
    $("#close").click(() => {
      $(".modal").modal('hide');
    });
  }

}

// Check through dice and update turn total, continue the user throw 1 or click hold

// if the user get 1, turn total will be cleared out and turn ends and
// if the user click hold, turn total will be added to sore total then turn ends
// every times turn ends turnNumber++

// Todo: When a user sore total becomes more than 100, the user wins.

// Get random dice number
function throwDice () {
  var diceRoll = Math.floor( Math.random() * 6 ) +1;
  $("input#dice").val(diceRoll);
  currentUser.isOne(diceRoll);
}

// User Interface logic
function clickHold() {
  $("input#dice").val("");
  $("input#throw-total").val("");
  currentUser.sumScore();
  if(currentUser === user1) {
    $("input#score1").val(currentUser.scoreTotal);
  } else {
    $("input#score2").val(currentUser.scoreTotal);
  }
}

function switchUser() {
  if (currentUser == user1){
    currentUser = user2;
  } else {
    currentUser = user1;
  }
  currentUser.turnTotal = 0;
  console.log("CurrentUser is ", currentUser.userNumber);
}

var user1 = new User(1, 0, 0, 1);
var user2 = new User(1, 0, 0, 2);

var currentUser = user1;


$(document).ready(function(){
  console.log("CurrentUser is ", currentUser.userNumber);
  $("button#hold").on("click", function (event){
    event.preventDefault();
    clickHold();
    switchUser();
  });

  $("button#throw").on("click", function(event){
    event.preventDefault();
    throwDice();
  });


});
