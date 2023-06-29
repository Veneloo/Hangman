# Axel Cazorla
# 06/28/2023

import unittest
import sqlite3
from brain import (
    get_random_word,
    create_database,
    insert_word,
    update_guessed_letters,
    get_guessed_letters,
    clear_leaderboard,
    add_to_leaderboard,
    get_leaderboard,
)


class HangmanGameTestCase(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.connection = sqlite3.connect("store.db")
        cls.cursor = cls.connection.cursor()

    def setUp(self):
        self.cursor.execute("DELETE FROM hangman")
        self.cursor.execute("DELETE FROM leaderboard")
        self.connection.commit()

    def test_get_random_word(self):
        word = get_random_word()
        self.assertIsNotNone(word)
        self.assertIn(word, ["python", "java", "hangman", "javascript", "html", "css"])

    def test_create_database(self):
        create_database()
        self.cursor.execute(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='hangman'"
        )
        table_exists = self.cursor.fetchone()
        self.assertIsNotNone(table_exists)

    def test_insert_word(self):
        word = "python"
        insert_word(word)
        self.cursor.execute("SELECT word FROM hangman")
        result = self.cursor.fetchone()
        self.assertEqual(result[0], word)

    def test_update_guessed_letters(self):
        word = "python"
        guessed_letters = "p___o_"
        insert_word(word)
        update_guessed_letters(word, guessed_letters)
        self.cursor.execute("SELECT guessed_letters FROM hangman WHERE word=?", (word,))
        result = self.cursor.fetchone()
        self.assertEqual(result[0], guessed_letters)

    def test_get_guessed_letters(self):
        word = "python"
        guessed_letters = "p___o_"
        insert_word(word)
        update_guessed_letters(word, guessed_letters)
        result = get_guessed_letters(word)
        self.assertEqual(result, guessed_letters)

    def test_clear_leaderboard(self):
        player_name = "John Doe"
        score = 30.5
        insert_word("python")
        add_to_leaderboard(player_name, score)
        clear_leaderboard()
        self.cursor.execute("SELECT * FROM leaderboard")
        result = self.cursor.fetchall()
        self.assertEqual(len(result), 0)

    def test_get_leaderboard(self):
        player_name = "Alice"
        score = 45.2
        add_to_leaderboard(player_name, score)
        leaderboard = get_leaderboard()
        self.assertEqual(len(leaderboard), 1)
        self.assertEqual(leaderboard[0][0], player_name)
        self.assertAlmostEqual(leaderboard[0][1], score)


if __name__ == "__main__":
    unittest.main()
