from flask_restplus import Resource, Namespace
from models.similarities import SimilaritiesModel

similarities_ns = Namespace('similarities')
similarities_ns_parser = similarities_ns.parser()
similarities_ns_parser.add_argument('min_cosine',
                                    type=str,
                                    location='args',
                                    required=False,
                                    default=0,
                                    help='The min cosine value')
similarities_ns_parser.add_argument('max_cosine',
                                    type=str,
                                    location='args',
                                    required=False,
                                    default=1,
                                    help='The max cosine value')
similarities_ns_parser.add_argument('duplicated',
                                    type=str,
                                    location='args',
                                    required=False,
                                    default=1,
                                    help='is ground-truth duplicated or not')
similarities_ns_parser.add_argument('user',
                                    type=str,
                                    location='args',
                                    required=False,
                                    default='bo',
                                    help='the user who queries the pairs')


@similarities_ns.expect(similarities_ns_parser)
@similarities_ns.route('', methods=['GET'])
class SimilaritiesResource(Resource):
    def get(self):
        args = similarities_ns_parser.parse_args()
        min_cos = args.get('min_cosine', 0)
        max_vos = args.get('max_cosine', 1)
        duplicated = args.get('duplicated', 1)
        user = args.get('user', 'bo')
        found = SimilaritiesModel.filter(min_cos, max_vos, duplicated, user)
        if found:
            return found
        return {'message': 'similarities not found'}, 404

