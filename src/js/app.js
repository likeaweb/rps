// console.log('Gloria In Excelsis Deo!');

// ESLint run command /* $ `./node_modules/.bin/eslint --fix src/js/app.js` */

/* declare and initialize const variables => always const before let */
// get DOM elements by id
const userChoiceDisplay = document.getElementById('userChoiceDisplay');
const computerChoiceDisplay = document.getElementById('computerChoiceDisplay');
const resultDisplay = document.getElementById('resultDisplay');
const dataScoreSpanUser = document.querySelector('[data-user-score]');
const dataScoreSpanComputer = document.querySelector('[data-computer-score]');

const roundsSelections = document.getElementById('roundsSelections');
// select all buttons with class of buttonChoice
const btnPossibleChoices = document.querySelectorAll('.buttonChoice'); // console.dir(btnPossibleChoices);
const delayResetGameTimeoutDuration = Number(3000); /* 3 seconds */

/* set btnPossibleChoices.length when !type: "traditional" */
// choices array to store all possible choices
const choices = [
  {
    name: 'rock',
    gameType: ['twoPlayer'],
    image: '✊',
    index: 0,
    key: 'a',
    type: 'traditional',
    value: 'rock',
  },
  {
    name: 'paper',
    gameType: ['twoPlayer'],
    image: '✋',
    index: 1,
    key: 's',
    type: 'traditional',
    value: 'paper',
  },
  {
    name: 'scissors',
    gameType: ['twoPlayer'],
    image: '✌️',
    index: 2,
    key: 'd',
    type: 'traditional',
    value: 'scissors',
  },
];

// set result statement
const tieAllImage = '🤝'; /* https://emojipedia.org/heart-hands/ */
const winUserImage = '✨';
const winComputerImage = '🔥';
const winAll = `${tieAllImage} It's a Tie!`;
const winUser = `${winUserImage} You Won!`;
const winComputer = `${winComputerImage} Bot Won!`;

// * array of possible result statements
// const resultStatements = [
//   {
//     name: winUser,
//     beats: [1, 2],
//     class: 'win',
//     gameType: 'twoPlayer',
//     image: '<img src="images/win.png" alt="win">',
//     index: 0,
//     type: ['traditional'],
//     value: 1,
//     who: 'user',
//   },
//   {
//     name: winComputer,
//     beats: [0, 2],
//     class: 'lose',
//     gameType: 'twoPlayer',
//     image: '<img src="images/lose.png" alt="lose">',
//     index: 1,
//     type: ['traditional'],
//     value: -1,
//     who: 'computer',
//   },
//   {
//     name: winAll,
//     beats: [0, 1, 2],
//     class: 'tie',
//     gameType: 'twoPlayer',
//     image: '<img src="images/tie.png" alt="tie">',
//     index: 2,
//     type: ['traditional'],
//     value: 0,
//     who: 'tie',
//   },
// ];

// declare `let` variables
let userChoice; /* "temporal dead zone" (TDZ) */
let userChoiceValue;
let userChoiceResults;

// 'a' = rock, 's' = paper, 'd' = scissors
let keydownPossibleChoicesKey;

// -----------------------------------------------------------------------------

/* 3 buttons, Math.floor() returns Math.random() to the nearest +ve integer */
// * Function to generate computer's random integer => 0<= i <=2
const computerChoice = () => {
  const randomNumber = Math.random();
  const numberOfButtons = btnPossibleChoices.length;
  const randomChoiceNumber = randomNumber * numberOfButtons;
  const randomChoice = Math.floor(randomChoiceNumber);

  return randomChoice;
};

// Function to fetch keydown event
// function fetchKeydownEvent(event) {
//   // add window event listener for keydown
//   window.addEventListener('keydown', (event) => {
//     const keydownKey = event.key;
//     const keydownCode = event.code;

//     return {
//       keydownKey,
//       keydownCode,
//     };
//   });
// }
// fetchKeydownEvent();

const choicesKeydowns = [
  {
    name: 'rock',
    key: 'a',
  },
  {
    name: 'paper',
    key: 's',
  },
  {
    name: 'scissors',
    key: 'd',
  },
];

// * Function to Filter choicesKeydowns array by user's keydown keyboard presses
const fetchUserChoiceKeydown = () => {
  choicesKeydowns.forEach((choicesKeydown) => {
    setTimeout(() => ({ choicesKeydown }), 3000);
  });
};

// * Function to Filter choices array by user's choice
const fetchUserChoice = () => {
  choices.forEach((choice) => {
    if (userChoiceValue.includes(choice.name || choice.key)) {
      userChoice = choice.image;
      const userChoiceIndex = choice.index;
      userChoiceResults = [userChoice, userChoiceIndex];
      return userChoiceResults;
    }
    return userChoiceResults;
  });
};

// * Updates score with each win
const addScoreUpdate = (dataScoreSpan) => {
  const addScoreUpdateProperty = dataScoreSpan;
  addScoreUpdateProperty.textContent = parseInt(dataScoreSpan.textContent, 10) + 1;
};

// adds new paragraph choice emoji to DOM /* this can go at the top */
const roundResultInsert = document.createElement('p'); // create a new <p> element

// convert to function
/* const insertRoundResult = (roundResultInsert) => {
  roundResultInsert.textContent = userChoice;
  roundResultInsert.textContent = winAll;
  resultDisplay.appendChild(roundResultInsert);
}; */

// * Declare result of a single round
const roundResult = (userChoiceIndex, computerChoiceIndex) => {
  const choicesArrayLength = choices.length;
  const choiceIndexIsSame = userChoiceIndex === computerChoiceIndex;
  const choiceIndexUserModulo = (userChoiceIndex + 1) % choicesArrayLength;
  const choiceIndexComputerWins = choiceIndexUserModulo === computerChoiceIndex;

  if (choiceIndexIsSame) {
    roundResultInsert.textContent = winAll;
    resultDisplay.appendChild(roundResultInsert);
    return 'tie';
  }
  if (choiceIndexComputerWins) {
    roundResultInsert.textContent = winComputer;
    resultDisplay.appendChild(roundResultInsert);
    addScoreUpdate(dataScoreSpanComputer);
    return 'computer';
  }
  if (!choiceIndexComputerWins) {
    roundResultInsert.textContent = winUser;
    resultDisplay.appendChild(roundResultInsert);
    addScoreUpdate(dataScoreSpanUser);
    return 'user';
  }
  return 'error';
};

// * Function => Adds a new round result to the DOM
const playRound = () => {
  const userChoicePara = document.createElement('p');
  const computerChoicePara = document.createElement('p');
  // Run the random computer choice generator ONLY ONCE HERE
  const computerChoices = choices[computerChoice()];
  // Retrieve results & map to computer's random number with choices[] array
  const computerChoiceResults = [computerChoices.image, computerChoices.index];
  // Define the computer results image and index with choices[] array
  const computerChoiceIndex = computerChoiceResults[1];
  userChoicePara.textContent = userChoice;
  userChoicePara.classList.add('card__choice-result__choice');
  // add text content & classList 'card__choice-result__choice'
  computerChoicePara.textContent = choices[computerChoiceIndex].image;
  computerChoicePara.classList.add('card__choice-result__choice');
  // Insert DOM result elements content <p> before the last <p>
  userChoiceDisplay.insertBefore(userChoicePara, userChoiceDisplay.firstChild);
  computerChoiceDisplay.insertBefore(
    computerChoicePara,
    computerChoiceDisplay.firstChild,
  );
  resultDisplay.textContent = `${userChoiceResults[0]} vs ${computerChoiceResults[0]}`;

  return roundResult(userChoiceResults[1], computerChoiceResults[1]);
};

// function to disable buttons when game is over
function btnDisableBtnPossibleChoices() {
  btnPossibleChoices.forEach((btnPossibleChoice) => {
    const btnToDisable = btnPossibleChoice;
    btnToDisable.disabled = true;
  });
}

// function enables buttons after resetGame()
function btnEnableBtnPossibleChoices() {
  btnPossibleChoices.forEach((btnPossibleChoice) => {
    const btnToEnable = btnPossibleChoice;
    btnToEnable.disabled = false;
  });
}

// Function displays the user when the next game will begin
// It enables the disabled button choices again (avoids spamming)
const countdownTimer = () => {
  const countdownTimerStartGame = document.createElement('p');
  countdownTimerStartGame.textContent = '3';
  countdownTimerStartGame.classList.add('countdownTimerStartGame');
  resultDisplay.appendChild(countdownTimerStartGame);
  setTimeout(() => {
    countdownTimerStartGame.textContent = '2';
  }, 1000);
  setTimeout(() => {
    countdownTimerStartGame.textContent = '1';
  }, 2000);
  setTimeout(() => {
    countdownTimerStartGame.textContent = 'GO!';
  }, 3000);
  setTimeout(() => {
    countdownTimerStartGame.textContent = '';
  }, 4000);
  setTimeout(() => {
    btnEnableBtnPossibleChoices(); // enables the disabled button choices again
  }, 5000);
};

// * reset the game when <select> element roundSelections is changed
const resetGame = () => {
  [
    userChoiceDisplay.textContent,
    computerChoiceDisplay.textContent,
    resultDisplay.textContent,
  ] = ''; // reset the appended <p> elements content
  dataScoreSpanUser.textContent = '0';
  dataScoreSpanComputer.textContent = '0';
  // add a countdown countdownTimerStartGame
  // Count as the Game restarts again
  roundResultInsert.textContent = '';
  // countdownTimerToResetGame();
  countdownTimer();
};

// * scoreToWin for game to end
let scoreToWin = Number(roundsSelections.value);

// get rounds value set by the user (default is 5)
roundsSelections.addEventListener('change', (e) => {
  scoreToWin = Number(e.target.value);

  resetGame();
  return scoreToWin;
});

// Function to set timeout to resetGame()
function delayResetGameTimeOut() {
  setTimeout(() => {
    resetGame();
  }, delayResetGameTimeoutDuration);
}

// Function to insert result when user wins
function roundResultInsertWinGameUser() {
  roundResultInsert.textContent = winUser;
}

// Function to insert result when computer wins
function roundResultInsertWinGameComputer() {
  roundResultInsert.textContent = winComputer;
}

// ---

// Functions listense to keydown or keyboard key presses
const keydownPossibleChoices = window.addEventListener('keydown', (event) => {
  keydownPossibleChoicesKey = event.key;
  fetchUserChoiceKeydown();
  // console.log({ keydownPossibleChoicesKey });
  return keydownPossibleChoicesKey;
});
keydownPossibleChoices();

// ---

// * Function => grab the buttons & for each choice - listen to event
btnPossibleChoices.forEach((btnPossibleChoice) => btnPossibleChoice.addEventListener('click', (e) => {
  userChoiceValue = e.target.value; /* value || key */
  fetchUserChoice(); /* filters the userChoice to match the choices array */
  playRound(); /* creates DOM elements after fetching */

  // game win conditions
  const dataScoreSpanInnerTextUser = dataScoreSpanUser.innerText;
  const dataScoreSpanInnerTextComputer = dataScoreSpanComputer.innerText;
  const scoreFinalUser = Number(dataScoreSpanInnerTextUser);
  const scoreFinalComputer = Number(dataScoreSpanInnerTextComputer);
  const winGameUser = scoreFinalUser === scoreToWin;
  const winGameComputer = scoreFinalComputer === scoreToWin;

  // * final winner — if conditionals
  if (winGameUser) {
    roundResultInsertWinGameUser();
    btnDisableBtnPossibleChoices();
    // resultDisplay.textContent = winUser;
    delayResetGameTimeOut();
  } else if (winGameComputer) {
    roundResultInsertWinGameComputer();
    btnDisableBtnPossibleChoices();
    // resultDisplay.textContent = winComputer;
    roundResultInsert.textContent = winComputer;
    delayResetGameTimeOut();
  }
}));
