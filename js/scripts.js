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
  $("input#dice").val("");
  $("input#throw-total").val("");
  if (currentUser == user1){
    currentUser = user2;
    $(".user1").removeAttr("id");
    $(".user2").attr("id", "user2");
  } else {
    currentUser = user1;
    $(".user2").removeAttr("id");
    $(".user1").attr("id", "user1");
  }
  currentUser.turnTotal = 0;
}

var user1 = new User(1, 0, 0, 1);
var user2 = new User(1, 0, 0, 2);

var currentUser = user1;


$(document).ready(function(){
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
