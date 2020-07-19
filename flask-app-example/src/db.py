import sqlite3
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


# def execute(query):
#     print(query)
#     connection = sqlite3.connect('src/data.db')
#     cursor = connection.cursor()
#     result = cursor.execute(query)
#     connection.commit()
#
#     return result
