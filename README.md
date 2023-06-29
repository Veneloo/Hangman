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

1. Enter your name on the prompt in order to start the game.
2. Once you enter your first letter guess a timer will start running to show how long you take to guess the word.
3. Each letter you use will be added into a box so you keep your progress.
4. If you guess a letter incorrectly it will start drawing a body part of a hangman each time you guess incorrectly.
5. If you guess correcly the word will start to form, the faster you guess the letter the farther up you are able to place in the leaderboard.
6. Once the letter is guessed your time will be stored and will determine your position on the leaderboard.

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