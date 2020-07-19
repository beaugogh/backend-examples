from flask import Flask, Blueprint
from flask_restplus import Api
from flask_cors import CORS
import logging
import random
from db import get_mysql_connection, db
from resources.feedback import feedback_ns
from resources.similarities import similarities_ns
from resources.trials import trials_ns

logging.basicConfig(level='DEBUG')

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = get_mysql_connection()
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

try:
    db.init_app(app)
    print('db initialized')
except Exception as e:
    raise Exception('Unable to initialise SqlAlchemy connection')

blueprint = Blueprint('resources', __name__)

api = Api(blueprint,
          title='User feedback tool API',
          version=1.0,
          doc='/doc/')

api.add_namespace(feedback_ns)
api.add_namespace(similarities_ns)
api.add_namespace(trials_ns)
app.register_blueprint(blueprint)


@app.route('/hello', methods=['GET'])
def hello():
    return 'hello from Server {}'.format(random.randint(0, 1000))


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
