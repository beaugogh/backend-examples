import os
from flask_sqlalchemy import SQLAlchemy

OLTP_CONFIG = {
    'username': os.getenv('DB_USERNAME', 'search_app'),  # search_app
    'password': os.getenv('DB_PASSWORD', 'mt17Piloten'),  # mt17Piloten
    'host': os.getenv('DB_OLTP_HOST', 'rds.oltp.mytomorrows.com'),
    'port': os.getenv('DB_OLTP_PORT', '3301'),
    'schema': os.getenv('DB_OLTP_SCHEMA', 'deduplication_feedback')
}

db = SQLAlchemy()


def get_mysql_connection():
    return "mysql+pymysql://{0}:{1}@{2}:{3}/{4}".format(OLTP_CONFIG['username'],
                                                        OLTP_CONFIG['password'],
                                                        OLTP_CONFIG['host'],
                                                        OLTP_CONFIG['port'],
                                                        OLTP_CONFIG['schema'])
