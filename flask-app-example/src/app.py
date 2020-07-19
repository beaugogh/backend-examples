from flask import Flask, Blueprint
from flask_restplus import Api
from src.resources.item import item_ns, items_ns
from src.resources.store import store_ns, stores_ns
from src.resources.user import user_ns
from flask_jwt import JWT
from src.auth.security import authenticate, identity

app = Flask(__name__)

# ------ db config ------
# host = 'localhost'
# username = 'bo'
# password = '1234qwer'
# schema = 'flask_app'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://{}:{}@{}/{}'.format(username, password, host, schema)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # turn off the flask sqlachemy tracker


@app.before_first_request
def create_tables():
    db.create_all()


# ------ api config ------
blueprint = Blueprint('resources', __name__)

api = Api(blueprint,
          title='Flask Restplus API',
          version=1.0,
          description='foo bar description',
          doc='/doc/')

api.add_namespace(item_ns)
api.add_namespace(items_ns)
api.add_namespace(store_ns)
api.add_namespace(stores_ns)
api.add_namespace(user_ns)

app.register_blueprint(blueprint)

# ------ jwt config ------
app.secret_key = 'jose'
jwt = JWT(app, authenticate, identity)  # /auth

# ------ run ------
if __name__ == '__main__':
    from src.db import db

    db.init_app(app)
    app.run(port=5001, debug=True)
