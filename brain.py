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


if __name__ == "__main__":
    create_database()
    word = get_random_word()
    insert_word(word)
