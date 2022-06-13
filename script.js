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

  // Game Mode 1: To set number of players
  if (currentGameMode == "input number of players") {
    // Input validation, to accept maximum 10 players
    if (input > 0 && input <= 10) {
      numberOfPlayers = Math.ceil(input); // To get an integer, do not accept real numbers as players
      console.log("Number of players is " + numberOfPlayers);

      myOutputValue = `You have selected ${numberOfPlayers} players. <br> <br> It is Player 1's turn. Player 1, please press submit to roll the dice.`;
      currentGameMode = "start to roll dice";
    } else {
      myOutputValue = `Please enter a valid number of players between 1 to 10 (inclusive). Thank you.`;
    }
    return myOutputValue;
  }

  // Game Mode 2: Roll dice
  if (currentGameMode == "start to roll dice") {
    console.log("Number of players is " + numberOfPlayers);
    console.log("Player number is " + playerNumber);
    if (playerNumber == 0) {
      diceLogs.splice(playerNumber, 0, [rollDice(), rollDice()]); // Insert at top of the table
      diceLogs.pop(); // Remove initial variables that were added to make the table
      diceLogs.pop();
    } else {
      diceLogs.push([rollDice(), rollDice()]); // Insert at the bottom of the table
    }
    console.table(diceLogs);

    myOutputValue = `Player ${playerNumber + 1}: 🎲
      <br> <br> You have rolled ${
        diceLogs[playerNumber][0]
      } for your Dice 1, and ${
      diceLogs[playerNumber][1]
    } for your Dice 2. <br> <br> Please choose if Dice 1 or Dice 2 should go first. <br> <br> Input either 1 or 2 only.`;

    // Do not ask to choose position if Dice 1 and Dice 2 are the same
    // if (diceLogs[playerNumber][0] == diceLogs[playerNumber][1]) {
    //   console.log(diceLogs[playerNumber][0]);
    //   console.log(diceLogs[playerNumber][1]);
    //   console.log("C");
    //   var combinedDiceNumber = Number(
    //     diceLogs[playerNumber][0] * 10 + diceLogs[playerNumber][1]
    //   );
    //   diceCombinedLogs.push(combinedDiceNumber);
    //   console.log(diceCombinedLogs);
    //   myOutputValue = `Both dice returned the same value. Your number is ${combinedDiceNumber}.`;
    //   playerNumber += 1;
    //   currentGameMode = "start to roll dice";

    //   return myOutputValue;
    // }

    // Change game mode
    currentGameMode = "choose position of dice";
    console.log("currentGameMode is " + currentGameMode);

    // Game Mode 3: For player to choose position of dice
  } else if (currentGameMode == "choose position of dice") {
    // Player wants to swap the position
    if (Number(input) == 2) {
      console.log("Player number is " + playerNumber);
      swapPositions(diceLogs, playerNumber, 0, 1);
      console.table(diceLogs);
      var combinedDiceNumber = Number(
        diceLogs[playerNumber][0] * 10 + diceLogs[playerNumber][1]
      );
      diceCombinedLogs.push(combinedDiceNumber); // Store in a different array
      myOutputValue = `Player ${
        playerNumber + 1
      }, you have chosen Dice 2 to go first. Your number is ${combinedDiceNumber}. <br> <br> Press submit for next player's turn, or to see results if all players have rolled the dice.`;
    } else if (Number(input) == 1) {
      var combinedDiceNumber = Number(
        diceLogs[playerNumber][0] * 10 + diceLogs[playerNumber][1]
      );
      diceCombinedLogs.push(combinedDiceNumber);
      myOutputValue = `Player ${
        playerNumber + 1
      }, you have chosen Dice 1 to go first. Your number is ${combinedDiceNumber}.  <br> <br> Press submit for next player's turn, or to see results if all players have rolled the dice.`;
    }
    // Input validation
    else {
      myOutputValue = `Invalid entry. Please enter only either Dice 1 or 2 to go first.  <br> <br> Press submit for next player's turn, or to see results if all players have rolled the dice.`;
      return myOutputValue;
    }
    console.log(diceCombinedLogs);

    // Stop the loop once all players have played, proceed to find the winner
    if (playerNumber + 1 == numberOfPlayers) {
      console.log("A");
      var winnerPlayer = largestNumber(diceCombinedLogs) + 1; // Need to +1 as array starts from 0
      console.log("The winner player is " + winnerPlayer);
      myOutputValue = `The winner is Player ${winnerPlayer}, with the winning number of ${
        diceCombinedLogs[winnerPlayer - 1]
      }.`;
      return myOutputValue;
    } else {
      // Increase player number
      playerNumber += 1;
      console.log("Player number is " + playerNumber);

      currentGameMode = "start to roll dice"; // Return to Game Mode 2 for next player
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
// Potential area to work on: how to return if there is the tie

// Define function to roll dice
var rollDice = function () {
  var randomDice = Math.ceil(Math.random() * 6);
  return 1;
};

// Define function to swap positions in array
var swapPositions = function (array, index, originalPosition, newPosition) {
  var temp = array[index][originalPosition];
  array[index][originalPosition] = array[index][newPosition];
  array[index][newPosition] = temp;
  return array, index, originalPosition, newPosition;
};
