# Jaydin Freeman
# 06/27/2023

import random
import sqlite3
import time


def get_random_word():
    words = ['python', 'java', 'hangman', 'javascript', 'html', 'css']
    return random.choice(words)


def create_database():
    conn = sqlite3.connect('store.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS hangman
                 (word text, guessed_letters text, player_name text, score integer)''')
    c.execute('''CREATE TABLE IF NOT EXISTS leaderboard
                 (player_name text, score real)''')
    conn.commit()
    conn.close()


def insert_word(word):
    conn = sqlite3.connect('store.db')
    c = conn.cursor()
    c.execute("INSERT INTO hangman (word, guessed_letters, player_name, score) VALUES (?, '', '', 0)", (word,))
    conn.commit()
    conn.close()


def update_guessed_letters(word, guessed_letters):
    conn = sqlite3.connect('store.db')
    c = conn.cursor()
    c.execute("UPDATE hangman SET guessed_letters = ? WHERE word = ?", (guessed_letters, word))
    conn.commit()
    conn.close()


def get_guessed_letters(word):
    conn = sqlite3.connect('store.db')
    c = conn.cursor()
    c.execute("SELECT guessed_letters FROM hangman WHERE word = ?", (word,))
    guessed_letters = c.fetchone()[0]
    conn.close()
    return guessed_letters


# Added Leaderboard Features - Axel Cazorla 06/29/2023

def update_score(word, player_name, score):
    conn = sqlite3.connect('store.db')
    c = conn.cursor()
    c.execute("UPDATE hangman SET player_name = ?, score = ? WHERE word = ?", (player_name, score, word))
    conn.commit()
    conn.close()


def add_to_leaderboard(player_name, score):
    conn = sqlite3.connect('store.db')
    c = conn.cursor()

    # Retrieve the current number of rows in the leaderboard table
    c.execute("SELECT COUNT(*) FROM leaderboard")
    count = c.fetchone()[0]

    if count < 10:
        c.execute("INSERT INTO leaderboard (player_name, score) VALUES (?, ?)", (player_name, score))
    else:
        # Find the player with the highest score in the current leaderboard
        c.execute("SELECT player_name, score FROM leaderboard ORDER BY score DESC LIMIT 1")
        highest_score_player = c.fetchone()

        # Compare the current player's score with the highest score in the leaderboard
        if score < highest_score_player[1]:
            # Remove the player with the highest score
            c.execute("DELETE FROM leaderboard WHERE player_name = ?", (highest_score_player[0],))
            # Insert the current player's score
            c.execute("INSERT INTO leaderboard (player_name, score) VALUES (?, ?)", (player_name, score))

    conn.commit()
    conn.close()


def get_leaderboard():
    conn = sqlite3.connect('store.db')
    c = conn.cursor()
    c.execute("SELECT player_name, score FROM leaderboard ORDER BY score ASC")
    leaderboard = c.fetchall()
    conn.close()
    return leaderboard


def clear_leaderboard():
    conn = sqlite3.connect('store.db')
    c = conn.cursor()
    c.execute("DELETE FROM leaderboard")
    conn.commit()
    conn.close()


# Updated Main to Interact with the New Inputs - Axel Cazorla 06/29/2023

if __name__ == "__main__":
    create_database()
    word = get_random_word()
    insert_word(word)

    player_name = input("Enter your name: ")
    start_time = time.time()  # Start timer

    # Game logic to resolve the word
    guessed_letters = ['_'] * len(word)
    attempts = 0

    while '_' in guessed_letters:
        print("Word:", ' '.join(guessed_letters))
        guess = input("Guess a letter: ").lower()

        if guess in guessed_letters:
            print("You already guessed that letter. Try again.")
            continue

        found = False
        for i, letter in enumerate(word):
            if letter == guess:
                guessed_letters[i] = letter
                found = True

        if not found:
            print("Incorrect guess!")
            attempts += 1

        update_guessed_letters(word, ''.join(guessed_letters))

    end_time = time.time()  # Stop timer
    elapsed_time = end_time - start_time
    score = elapsed_time + (attempts * 5)  # Adjusted score considering elapsed time and attempts

    # Update the score for the player
    update_score(word, player_name, score)

    # Add player to leaderboard
    add_to_leaderboard(player_name, score)

    # Retrieve updated leaderboard
    leaderboard = get_leaderboard()
    print("Leaderboard:")
    for position, (player, score) in enumerate(leaderboard, start=1):
        print(f"{position}. {player}: {score:.2f} seconds")

    # Additional menu option to clear leaderboard

    print("\nMenu:")
    print("1. Clear Leaderboard")
    print("2. Keep Leaderboard")
    choice = input("Enter your choice: ")

    if choice == "1":
        clear_leaderboard()
        print("Leaderboard cleared.")
    elif choice == "2":
        print("Leaderboard Remains\nQuitting the Program.")
        exit()
    else:
        print("Invalid choice. Try again.")
