import sqlite3
import random
import string

# Connect to the SQLite database
conn = sqlite3.connect('store.db')
c = conn.cursor()

# Generate random data and insert into the leaderboard table
for _ in range(10):
    username = ''.join(random.choices(
        string.ascii_lowercase + string.ascii_uppercase, k=5))
    score = random.randint(1, 10)
    c.execute(
        "INSERT INTO leaderboard (username, mistakes) VALUES (?, ?)", (username, score))

# Commit the changes and close the connection
conn.commit()
conn.close()
