# Jaydin Freeman
# 06/27/2023

import random
import sqlite3


def get_random_word():
    words = ['python', 'java', 'hangman', 'javascript', 'html', 'css']
    return random.choice(words)


def create_database():
    conn = sqlite3.connect('store.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS hangman
                 (word text, guessed_letters text)''')
    conn.commit()
    conn.close()


def insert_word(word):
    conn = sqlite3.connect('store.db')
    c = conn.cursor()
    c.execute("INSERT INTO hangman VALUES (?, '')", (word,))
    conn.commit()
    conn.close()


def update_guessed_letters(word, guessed_letters):
    conn = sqlite3.connect('store.db')
    c = conn.cursor()
    c.execute("UPDATE hangman SET guessed_letters = ? WHERE word = ?",
              (guessed_letters, word))
    conn.commit()
    conn.close()


def get_guessed_letters(word):
    conn = sqlite3.connect('store.db')
    c = conn.cursor()
    c.execute("SELECT guessed_letters FROM hangman WHERE word = ?", (word,))
    guessed_letters = c.fetchone()[0]
    conn.close()
    return guessed_letters

# Added inputs for the players      Axel Cazorla 06/29/2023

def get_players(word):
    conn = sqlite3.connect('store.db')
    c = conn.cursor()
    c.execute("SELECT player1, player2 FROM hangman WHERE word = ?", (word,))
    players = c.fetchone()
    conn.close()
    return players

# Updated Main to Interact with the New Inputs      Axel Cazorla 06/29/2023

if __name__ == "__main__":
    create_database()
    player1 = input("Enter Player 1 name: ")
    player2 = input("Enter Player 2 name: ")
    word = get_random_word()
    insert_word(word, player1, player2)
