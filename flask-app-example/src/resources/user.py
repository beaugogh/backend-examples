from flask_restplus import Resource, Namespace
from flask import request, abort
from src.models.user import UserModel

user_ns = Namespace('user')

user_ns_parser = user_ns.parser()
user_ns_parser.add_argument('username',
                            type=str,
                            location='args',
                            required=True,
                            default=None,
                            help='The username of the user')
user_ns_parser.add_argument('password',
                            type=str,
                            location='args',
                            required=True,
                            default=None,
                            help='The password of the user')


@user_ns.expect(user_ns_parser)
@user_ns.route('/register', methods=['POST'])
class UserRegisterResource(Resource):

    def post(self):
        data = request.json
        if UserModel.find_by_username(data['username']):
            return {'message': 'A user with that username already exists'}, 400

        user = UserModel(data['username'], data['password'])
        user.save_to_db()

        return 201
