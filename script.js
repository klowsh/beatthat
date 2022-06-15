/* Project 2: Beat That

How many hours did you spend on this assignment?: 15 hours (at least 4-5 nights)

What part of the assignment did you spend the most time on?: 
- Initially, the part that took the most time was deciding on the logic to use for multiple players, and using "nested arrays" (or arrays within an array).
- After this part was completed/coded, I had a lot of trouble deciding on how to get the results for tied players (for example, more than a single player who got the same high score)

How comfortable did you feel with this assignment? (1-5): About 2, with 5 being most comfortable

Is there anything in this code that you feel pleased about?: 
I was glad that I learnt how to Google and find online resources for the code. For example, I am happy that I managed to use new syntax like .splice

What's one aspect of your code you would like specific, elaborate feedback on?:
- Similar to the previous code, I found difficulty in deciding what is the proper way to get around coding -- i.e.: deciding on the logic to implement the code. Would appreciate advice on this! And how do seasoned / more experienced programmers decide on a logic that works and is easy to implement.
- I also am finding it difficult to refactor my code to make there more helper functions. I am afraid if I do remove parts of the code, the "nested arrays" part of it would not be able to work.

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

var main = function (input) {
  var myOutputValue = "";
  var numberOfDiceRolls = 2;

  // GAME MODE 1: To set number of players
  if (currentGameMode == "input number of players") {
    // Input validation, to accept maximum 10 players
    if (input > 1 && input <= 10) {
      numberOfPlayers = Math.ceil(input); // To get an integer, do not accept real numbers as players
      myOutputValue = `You have selected ${numberOfPlayers} players. <br> <br> It is Player 1's turn. Player 1, please press submit to roll the dice.`;
      currentGameMode = "start to roll dice";
    } else {
      myOutputValue = `Please enter a valid number of players between 2 to 10 (inclusive). Thank you.`;
    }
    return myOutputValue;
  }

  // GAME MODE 2: Roll dice
  if (currentGameMode == "start to roll dice") {
    console.log("Player number is " + (playerNumber + 1));
    if (playerNumber == 0) {
      diceLogs.splice(playerNumber, 0, [rollDice(), rollDice()]); // Insert at top of the table
      diceLogs.pop(); // Remove initial variables that were added to make the table
      diceLogs.pop();
    } else {
      diceLogs.push([rollDice(), rollDice()]); // Insert at the bottom of the table
    }
    console.table(diceLogs); // To see the original dice roll

    // Typically, will proceed to ask to choose position

    // However, if Dice 1 and Dice 2 are the same, do not proceed to ask to choose position
    if (diceLogs[playerNumber][0] == diceLogs[playerNumber][1]) {
      // to continue game if not all players have played yet
      if (playerNumber + 1 == numberOfPlayers) {
        var combinedDiceNumber = Number(
          diceLogs[playerNumber][0] * 10 + diceLogs[playerNumber][1]
        );
        diceCombinedLogs.push(combinedDiceNumber);
        myOutputValue = `Player ${
          playerNumber + 1
        }, both dice returned the same value. Your number is ${combinedDiceNumber}. <br> <br> Press submit for next player's turn, or to see results if all players have rolled the dice.`;

        currentGameMode = "get winner";
        return myOutputValue;
      } else {
        var combinedDiceNumber = Number(
          diceLogs[playerNumber][0] * 10 + diceLogs[playerNumber][1]
        );
        diceCombinedLogs.push(combinedDiceNumber);

        myOutputValue = `Player ${
          playerNumber + 1
        }, both dice returned the same value. Your number is ${combinedDiceNumber}. <br> <br> Press submit for next player's turn, or to see results if all players have rolled the dice.`;

        playerNumber += 1;
      }
    }

    // If not the same dice roll, to proceed to NEXT game mode to ask to choose position
    else {
      myOutputValue = `Player ${playerNumber + 1}: 🎲
      <br> <br> You have rolled ${
        diceLogs[playerNumber][0]
      } for your Dice 1, and ${
        diceLogs[playerNumber][1]
      } for your Dice 2. <br> <br> Please choose if Dice 1 or Dice 2 should go first. <br> <br> Input either 1 or 2 only.`;

      // Change game mode to Game Mode 3
      currentGameMode = "choose position of dice";
    }

    // GAME MODE 3: For player to choose position of dice
  } else if (currentGameMode == "choose position of dice") {
    // Player wants to swap the position
    if (Number(input) == 2) {
      swapPositions(diceLogs, playerNumber, 0, 1);

      var combinedDiceNumber = Number(
        diceLogs[playerNumber][0] * 10 + diceLogs[playerNumber][1]
      );
      diceCombinedLogs.push(combinedDiceNumber); // Store in a different array
      myOutputValue = `Player ${
        playerNumber + 1
      }, you have chosen Dice 2 to go first. Your number is ${combinedDiceNumber}. <br> <br> Press submit for next player's turn, or to see results if all players have rolled the dice.`;
    }

    // Player does not want to swap the position
    else if (Number(input) == 1) {
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

    // Stop the loop once all players have played, proceed to find the winner
    if (playerNumber + 1 == numberOfPlayers) {
      currentGameMode = "get winner";
      myOutputValue = `Please press submit to get the winner.`;
    } else {
      // Increase player number
      playerNumber += 1;

      currentGameMode = "start to roll dice"; // Return to Game Mode 2 for next player
    }
  }

  // GAME MODE 4: Get winner mode
  else if (currentGameMode == "get winner") {
    var winnerPlayer = getWinners(diceCombinedLogs); // Need to +1 as array starts from 0
    myOutputValue = `The winner(s) is/are Player(s) ${winnerPlayer}, with the winning number of ${Math.max(
      ...diceCombinedLogs
    )}.`;
    return myOutputValue;
  }

  return myOutputValue;
};

// Define function to find the largest number in an array
var getWinners = function (arr) {
  var largestNo = arr[0];
  var arrOfLargestNumber = [];
  for (var index = 0; index < arr.length; index += 1) {
    if (arr[index] > largestNo) {
      largestNo = arr[index];
      arrOfLargestNumber = []; // to reset the array if there is a number larger than previous numbers, not able to use pop as there could be more than 1 player with a tied number
      arrOfLargestNumber.push(index);
    } else if (arr[index] == largestNo) {
      arrOfLargestNumber.push(index); // if tie to push into existing array
    }
  }
  var listOfWinners = arrOfLargestNumber.map((x) => x + 1); // need to add +1 as array starts from 0, while player numbers start from 1
  return listOfWinners;
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
