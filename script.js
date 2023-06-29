/*
Axel Cazorla
06/26/2023
*/

// Global variables
let word = "";
let guessedLetters = [];
let displayLetters = [];

// API endpoint for retrieving a random word
const API_URL = "https://api.example.com/random-word";

// Function to fetch a random word from the API
async function getRandomWord() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    word = data.word.toLowerCase();
    displayLetters = Array(word.length).fill("_");
    updateUI();
  } catch (error) {
    console.error("Error:", error);
  }
}

// Function to update the UI with the current game state
function updateUI() {
  const wordContainer = document.getElementById("word");
  wordContainer.innerHTML = displayLetters.join(" ");

  const guessedLettersContainer = document.getElementById("guessed-letters");
  guessedLettersContainer.textContent = guessedLetters.join(", ");
}

// Function to handle letter guesses
function handleGuess() {
  const guessInput = document.getElementById("guess");
  const letter = guessInput.value.toLowerCase();

  // Check if the input is exactly one character
  if (letter.length !== 1) {
    alert("Please enter only one character.");
    return;
  }

  // Add to guessed letters if not already guessed
  if (!guessedLetters.includes(letter)) {
    guessedLetters.push(letter);

    // Update display letters
    let found = false;
    for (let i = 0; i < word.length; i++) {
      if (word[i] === letter) {
        displayLetters[i] = letter;
        found = true;
      }
    }

    if (!found) {
      // You may handle incorrect guesses here
    }

    updateUI();
  }

  // Clear the input
  guessInput.value = "";
}

// Assign handleGuess function to button onclick
document.querySelector("button").addEventListener("click", handleGuess);

// Start a new game
getRandomWord();
