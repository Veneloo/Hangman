/*
Axel Cazorla
06/26/2023
*/

window.onload = function() {
  let word = "example"; // Default word in case the API request fails
  let guessedLetters = [];
  let displayLetters = Array(word.length).fill("_");
  let mistakes = 0;

  fetch('https://api.api-ninjas.com/v1/randomword', {
    method: 'GET',
    headers: {
      'X-Api-Key': 'ouOQtaUg+RNdU6TKwFhGNw==92CCvw9Oc73LdBf8'
    },
  })
  .then(response => response.json())
  .then(data => {
    word = data.word; // This is the random word from the API
    displayLetters = Array(word.length).fill("_"); // Reset the display letters
    updateUI();
  })
  .catch((error) => {
    console.error('Error:', error);
  });

  let canvas = document.getElementById("stickman");
  let context = canvas.getContext("2d");

  function drawLine(fromX, fromY, toX, toY) {
    context.beginPath();
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  }

  const drawFunctions = [
    function drawHead() {
      context.beginPath();
      context.arc(60, 45, 10, 0, Math.PI * 2);
      context.stroke();
    },
    function drawTorso() {
      drawLine(60, 55, 60, 85);
    },
    function drawLeftArm() {
      drawLine(60, 60, 50, 70);
    },
    function drawRightArm() {
      drawLine(60, 60, 70, 70);
    },
    function drawLeftLeg() {
      drawLine(60, 85, 50, 100);
    },
    function drawRightLeg() {
      drawLine(60, 85, 70, 100);
    },
  ];

  function updateUI() {
    const wordContainer = document.getElementById("word");
    wordContainer.innerHTML = displayLetters.join(" ");

    const guessedLettersContainer = document.getElementById("guessed-letters");
    guessedLettersContainer.textContent = guessedLetters.join(", ");
  }

  function handleGuess() {
    const guessInput = document.getElementById("guess");
    const letter = guessInput.value.toLowerCase();

    if (letter.length !== 1) {
      alert("Please enter a single letter.");
      return;
    }

    if (!guessedLetters.includes(letter)) {
      guessedLetters.push(letter);

      if (word.includes(letter)) {
        for (let i = 0; i < word.length; i++) {
          if (word[i] === letter) {
            displayLetters[i] = letter;
          }
        }
      } else {
        if (mistakes < drawFunctions.length) {
          drawFunctions[mistakes]();
          mistakes++;
        }
      }

      updateUI();
    }

    guessInput.value = "";
  }

  document.querySelector("button").addEventListener("click", handleGuess);

  // Drawing base of the hangman
  drawLine(10, 140, 140, 140);
  drawLine(20, 140, 20, 20);
  drawLine(20, 20, 60, 20);
  drawLine(60, 20, 60, 35);

  updateUI();
};
