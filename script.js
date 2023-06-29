/* 
Axel Cazorla
06/26/2023
*/
// Global variables
let word = '';
let guessedLetters = [];

// API endpoint for retrieving a random word
const API_URL = 'https://api.example.com/random-word'; // needs to be updated with the API that is going to be implemented in project.

// Function to fetch a random word from the API
async function getRandomWord() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    word = data.word.toLowerCase();
    guessedLetters = Array(word.length).fill('_');
    updateUI();
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to update the UI with the current game state
function updateUI() {
  const wordContainer = document.getElementById('word-container');
  wordContainer.innerHTML = guessedLetters.join(' ');

  const guessedLettersContainer = document.getElementById('guessed-letters');
  guessedLettersContainer.textContent = guessedLetters.filter((letter) => letter !== '_').join(', ');
}

// Function to handle letter guesses
function handleGuess(event) {
  const letter = event.target.textContent.toLowerCase();
  if (!guessedLetters.includes(letter)) {
    guessedLetters.forEach((guessedLetter, index) => {
      if (word[index] === letter) {
        guessedLetters[index] = letter;
      }
    });
    updateUI();
  }
}

// Event listener for letter buttons
const letterButtons = document.querySelectorAll('.letter-button');
letterButtons.forEach((button) => {
  button.addEventListener('click', handleGuess);
});

// Start a new game
getRandomWord();
