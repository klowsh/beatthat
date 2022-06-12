/* Project 2: Beat That
 */

// Declare global variables
var currentGameMode = "input number of players";

let diceLogs = [
  [0, 0],
  [1, 1],
];

let diceCombinedLogs = [];

var playerNumber = 0;
var numberOfPlayers;

// For double arrays, index = player position (rows) and columns = dice rolled

// Player picks order for the dice they want - can use array to
// Highest combined number wins - can use array to iterate through and get combined number

var main = function (input) {
  var myOutputValue = "";
  var numberOfDiceRolls = 2;
  console.table(diceLogs);

  // Set number of players
  if (currentGameMode == "input number of players") {
    numberOfPlayers = input;
    console.log("Number of players is " + numberOfPlayers);

    myOutputValue = `You have selected ${numberOfPlayers} players. Please press submit to continue.`;
    currentGameMode = "start to roll dice";
    return myOutputValue;
  }

  // Game start
  if (currentGameMode == "start to roll dice") {
    console.log("Number of players is " + numberOfPlayers);
    console.log("Player number is " + playerNumber);
    if (playerNumber == 0) {
      diceLogs.splice(playerNumber, 0, [rollDice(), rollDice()]);
      diceLogs.pop();
      diceLogs.pop();
    } else {
      diceLogs.push([rollDice(), rollDice()]);
    }
    console.table(diceLogs);

    myOutputValue = `Player ${playerNumber + 1}: <br> <br> You have rolled ${
      diceLogs[playerNumber][0]
    } for your Dice 1, and ${
      diceLogs[playerNumber][1]
    } for your Dice 2. <br> <br> Please choose if Dice 1 or Dice 2 should go first. <br> <br> Input either 1 or 2 only.`;

    // Change game mode
    currentGameMode = "choose position of dice";
    console.log("currentGameMode is " + currentGameMode);

    // Game mode for player to choose position of dice
  } else if (currentGameMode == "choose position of dice") {
    if (Number(input) == 2) {
      console.log("Player number is " + playerNumber);
      swapPositions(diceLogs, playerNumber, 0, 1);
      console.table(diceLogs);
      var combinedDiceNumber = Number(
        diceLogs[playerNumber][0] * 10 + diceLogs[playerNumber][1]
      );
      diceCombinedLogs.push(combinedDiceNumber);
      myOutputValue = `You have chosen Dice 2 to go first. Your number is ${combinedDiceNumber}.`;
    } else if (Number(input) == 1) {
      var combinedDiceNumber = Number(
        diceLogs[playerNumber][0] * 10 + diceLogs[playerNumber][1]
      );
      diceCombinedLogs.push(combinedDiceNumber);
      myOutputValue = `You have chosen Dice 1 to go first. Your number is ${combinedDiceNumber}.`;
    }
    console.log(diceCombinedLogs);
    // Stop the loop once player number = number of players to display the
    if (playerNumber + 1 == numberOfPlayers) {
      console.log("A");
      var winnerPlayer = largestNumber(diceCombinedLogs) + 1;
      console.log("The winner player is " + winnerPlayer);
      myOutputValue = `The winner is Player ${winnerPlayer}, with the winning number of ${
        diceCombinedLogs[winnerPlayer - 1]
      }.`;
      return myOutputValue;
    } else {
      // Increase player number
      playerNumber += 1;
      console.log("Player number is " + playerNumber);

      currentGameMode = "start to roll dice";
    }
  }
  return myOutputValue;
};

// Defince function to find the largest number in an array
var largestNumber = function (arr) {
  var largestNo = arr[0];
  var j = 0;
  for (var i = 0; i < arr.length; i += 1) {
    if (arr[i] > largestNo) {
      largestNo = arr[i];
      j = i;
    }
  }
  return j;
};

// Define function to roll dice
var rollDice = function () {
  var randomDice = Math.ceil(Math.random() * 6);
  return randomDice;
};

// Define function to swap positions in array
var swapPositions = function (array, index, originalPosition, newPosition) {
  var temp = array[index][originalPosition];
  array[index][originalPosition] = array[index][newPosition];
  array[index][newPosition] = temp;
  return array, index, originalPosition, newPosition;
};

// if ((currentGameMode = "to input number of players")) {
//   var numberOfPlayers = input;

//   myOutputValue = `You have selected ${numberOfPlayers} players. Please select the number of dice(s) to be rolled.`;

//   currentGameMode = "to input number of dice rolls";
// } else if ((currentGameMode = "to input number of dice rolls")) {
//   var numberOfDiceRolls = input;

// }

// return myOutputValue;
