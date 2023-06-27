let word = ""; // This should be fetched from your Python backend
let guessedLetters = ""; // This should be fetched from your Python backend

function makeGuess() {
    let guess = document.getElementById('guess').value;
    if (word.includes(guess)) {
        guessedLetters += guess;
        // Update guessed letters in your Python backend
    }
    displayWord();
}

function displayWord() {
    let display = "";
    for (let i = 0; i < word.length; i++) {
        if (guessedLetters.includes(word[i])) {
            display += word[i];
        } else {
            display += "_";
        }
    }
    document.getElementById('word').innerHTML = display;
}

// Call
