from flask_restplus import Resource, Namespace
from flask import request
from flask_jwt import jwt_required
from src.models.store import StoreModel

store_ns = Namespace('store')

store_ns_parser = store_ns.parser()
store_ns_parser.add_argument('name',
                             type=str,
                             location='args',
                             required=False,
                             default=None,
                             help='The name of the store')


@store_ns.expect(store_ns_parser)
@store_ns.route('', methods=['GET', 'POST', 'DELETE'])
class StoreResource(Resource):

    @jwt_required()
    def get(self):
        args = store_ns_parser.parse_args()
        name = args.get('name', None)
        store = StoreModel.find_by_name(name)
        if store:
            return store.json()
        return {'message': 'Store not found'}, 404

    @jwt_required()
    def post(self):
        data = request.json
        name = data['name']
        if StoreModel.find_by_name(name):
            return {'message': 'An store with name {} already exists.'.format(name)}

        store = StoreModel(data['name'])
        try:
            store.save_to_db()
        except:
            return 500

    @jwt_required()
    def delete(self):
        args = store_ns_parser.parse_args()
        name = args.get('name', None)
        item = StoreModel.find_by_name(name)
        if item:
            item.delete_from_db()
            return {'message': 'Store deleted'}
        else:
            return {'message': 'Store not found'}


stores_ns = Namespace('stores')


@stores_ns.route('', methods=['GET'])
class StoresResource(Resource):

    def get(self):
        return [x.json() for x in StoreModel.query.all()]
