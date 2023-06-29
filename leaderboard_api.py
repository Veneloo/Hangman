from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
# This will allow all origins. For more control, use CORS(app, origins=['http://127.0.0.1:3001'])
CORS(app)


@app.route('/api/leaderboard', methods=['GET'])
def get_leaderboard():
    conn = sqlite3.connect('store.db')
    cursor = conn.cursor()

    # Changed DESC to ASC
    cursor.execute("SELECT * FROM leaderboard ORDER BY mistakes ASC")
    leaderboard = cursor.fetchall()

    conn.close()

    # Convert the leaderboard data into a list of dictionaries so it can be converted to JSON
    leaderboard = [{'username': row[0], 'score': row[1]}
                   for row in leaderboard]

    return jsonify(leaderboard)


@app.route('/api/leaderboard', methods=['POST'])
def add_score():
    data = request.get_json()

    username = data.get('username')
    score = data.get('score')

    conn = sqlite3.connect('store.db')
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO leaderboard (username, score) VALUES (?, ?)", (username, score))

    conn.commit()
    conn.close()

    return jsonify({'status': 'success'})


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=3000)
