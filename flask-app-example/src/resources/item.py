from flask_restplus import Resource, Namespace
from flask import request
from flask_jwt import jwt_required
from src.models.item import ItemModel

item_ns = Namespace('item')

item_ns_parser = item_ns.parser()
item_ns_parser.add_argument('name',
                            type=str,
                            location='args',
                            required=False,
                            default=None,
                            help='The name of the item')
item_ns_parser.add_argument('store_id',
                            type=int,
                            location='args',
                            required=False,
                            default=None,
                            help='The store id of the item')


@item_ns.expect(item_ns_parser)
@item_ns.route('', methods=['GET', 'POST', 'PUT', 'DELETE'])
class ItemResource(Resource):

    @staticmethod
    def parse_item_post_request():
        data = request.json
        if request and data and data['name'] and data['price']:
            return {'name': data['name'], 'price': data['price']}
        else:
            return None

    @jwt_required()
    def get(self):
        args = item_ns_parser.parse_args()
        name = args.get('name', None)
        item = ItemModel.find_by_name(name)
        if item:
            return item.json()
        return {'message': 'item not found'}, 404

    @jwt_required()
    def post(self):
        data = request.json
        name = data['name']
        if ItemModel.find_by_name(name):
            return {'message': 'An item with name {} already exists.'.format(name)}

        item = ItemModel(data['name'], data['price'], data['store_id'])
        try:
            item.save_to_db()
        except:
            return 500

    @jwt_required()
    def delete(self):
        args = item_ns_parser.parse_args()
        name = args.get('name', None)
        item = ItemModel.find_by_name(name)
        if item:
            item.delete_from_db()
            return {'message': 'Item deleted'}
        else:
            return {'message': 'Item not found'}

    @jwt_required()
    def put(self):
        data = request.json
        item = ItemModel.find_by_name(data['name'])

        if item is None:
            item = ItemModel(data['name'], data['price'], data['store_id'])
        else:
            item.price = data['price']

        item.save_to_db()

        return item.json()


items_ns = Namespace('items')


@items_ns.route('', methods=['GET'])
class ItemsResource(Resource):

    def get(self):
        return [x.json() for x in ItemModel.query.all()]
