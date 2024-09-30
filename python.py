from flask import Flask, request
import sqlite3
app = Flask(__name__)
# Vulnerable code with SQL injection risk
@app.route('/user', methods=['GET'])
def get_user():
    user_id = request.args.get('id')
    # Potential SQL injection vulnerability
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM users WHERE id = {user_id}")  # Vulnerable to SQL Injection
    user = cursor.fetchone()
    conn.close()
    if user:
        return {'id': user[0], 'name': user[1]}, 200
    else:
        return {'error': 'User not found'}, 404
if __name__ == '__main__':
    app.run(debug=True)
