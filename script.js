/*
Axel Cazorla
06/26/2023
*/

window.onload = function () {
  let word = "example";
  let guessedLetters = [];
  let displayLetters = Array(word.length).fill("_");
  let mistakes = 0;
  let maxLives = 6;

  let canvas = document.getElementById("stickman");
  let context = canvas.getContext("2d");

  function fetchNewWord() {
    fetch("https://api.api-ninjas.com/v1/randomword", {
      method: "GET",
      headers: {
        "X-Api-Key": "ouOQtaUg+RNdU6TKwFhGNw==92CCvw9Oc73LdBf8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        word = data.word;
        console.log("Word:", word);
        guessedLetters = [];
        displayLetters = Array(word.length).fill("_");
        mistakes = 0;
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawBaseOfHangman();
        updateUI();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

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

  function drawBaseOfHangman() {
    drawLine(10, 140, 140, 140);
    drawLine(20, 140, 20, 20);
    drawLine(20, 20, 60, 20);
    drawLine(60, 20, 60, 35);
  }

  function handleLogout() {
    sessionStorage.removeItem("username");
    window.location.href = "login.html";
  }

  function displayUsername() {
    const username = sessionStorage.getItem("username");
    if (username) {
      document.getElementById("username").textContent = username;
    } else {
      document.getElementById("username").textContent = "Guest";
    }
  }

  function updateUI() {
    const wordContainer = document.getElementById("word");
    wordContainer.innerHTML = displayLetters.join(" ");

    const guessedLettersContainer = document.getElementById("guessed-letters");
    guessedLettersContainer.textContent = guessedLetters.join(", ");

    const livesContainer = document.getElementById("lives");
    livesContainer.textContent = `Lives: ${maxLives - mistakes}`;
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

      if (mistakes >= maxLives) {
        alert("You lost!" + "\n" + "The word was: " + word);
        fetchNewWord();
      }

      if (displayLetters.join("") === word) {
        alert("You won!");
        const username = sessionStorage.getItem("username");
        if (username) {
          saveScore(username, maxLives - mistakes);
        }
        fetchNewWord();
      }

      updateUI();
    }

    guessInput.value = "";
  }

  function fetchLeaderboard() {
    fetch("http://127.0.0.1:3000/api/leaderboard") // <-- Keep this endpoint
      .then((response) => response.json())
      .then((data) => {
        const leaderboardList = document.getElementById("leaderboard-list");
        data.forEach((item) => {
          const listItem = document.createElement("li");
          listItem.textContent = `${item.username}: ${item.score}`;
          leaderboardList.appendChild(listItem);
        });
      });
  }

  function saveScore(username, score) {
    fetch("http://localhost:3000/api/leaderboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, score }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Score saved:", data))
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  document
    .querySelector("#generate-word-button")
    .addEventListener("click", fetchNewWord);
  document
    .querySelector("#guess-button")
    .addEventListener("click", handleGuess);
  document
    .querySelector("#logout-button")
    .addEventListener("click", handleLogout);

  fetchNewWord();
  displayUsername();
  updateUI();
  fetchLeaderboard();
};
