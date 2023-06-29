# Hangman Game

Welcome to Hangman! This is a classic 2-player word guessing game where one player thinks of a word and the other player tries to guess it by suggesting letters. This README file will guide you through the game and provide instructions on how to set it up and play.

## Table of Contents

- [Hangman Game](#hangman-game)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Game Rules](#game-rules)
  - [Files](#files)
  - [Todo](#todo)


## Getting Started

To get started with the Hangman game, you'll need the following:

- Python 3 installed on your system.
- Basic knowledge of running Python scripts from the command line.

## Game Rules

1. Player 1 chooses a word from the word bank that is provided without revealing it the word to Player 2.
2. Player 2 starts guessing letters one at a time.
3. If Player 2 guesses a letter that is present in the word, Player 1 reveals all occurrences of that letter in the word.
4. If Player 2 guesses a letter that is not in the word, Player 1 marks it as a wrong guess.
5. Player 2 continues guessing letters until they can either successfully guess the entire word or make a maximum number of wrong guesses.
6. If Player 2 guesses the entire word correctly, they win. Otherwise, Player 1 wins.

This is a simple hangman game implemented in Python and JavaScript.

## Files

- `brain.py`: This is the backend of the game, implemented in Python.
- `index.html`: This is the frontend of the game, implemented in HTML.
- `script.js`: This is the frontend logic of the game, implemented in JavaScript.
- `style.css`: This is the styling for the frontend, implemented in CSS.
- `store.db`: This is the database file where the game data is stored.
- `unit_test.py`: This is the file that tests a case making sure it runs properly. 


## Todo
* Leaderboard
* Lives
* Pages