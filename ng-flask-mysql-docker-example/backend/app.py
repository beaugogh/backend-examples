from flask import Flask, request
from flask_cors import CORS
from typing import List, Dict
import mysql.connector
import logging
import json

logging.basicConfig(level='DEBUG')

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def index():
    return 'server works!'


@app.route('/hello', methods=['GET'])
def hello():
    return 'hello from Server'


@app.route('/hello', methods=['POST'])
def hello_post():
    return 'hello ' + request.data.decode("utf-8")

def favorite_colors() -> List[Dict]:
    config = {
        'user': 'root',
        'password': 'root',
        'host': 'db',
        'port': '3306',
        'database': 'knights'
    }
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM favorite_colors')
    results = [{name: color} for (name, color) in cursor]
    cursor.close()
    connection.close()

    return results

@app.route('/db_test', methods=['GET'])
def db_test():
	return json.dumps({'favorite_colors': favorite_colors()})

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
