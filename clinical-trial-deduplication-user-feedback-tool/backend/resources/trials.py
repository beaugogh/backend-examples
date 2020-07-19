from flask_restplus import Resource, Namespace
from models.trials import TrialsModel

trials_ns = Namespace('trials')
trials_ns_parser = trials_ns.parser()
trials_ns_parser.add_argument('id',
                              type=str,
                              location='args',
                              required=False,
                              default=None,
                              help='The trial id')


@trials_ns.expect(trials_ns_parser)
@trials_ns.route('', methods=['GET'])
class TrialsResource(Resource):
    def get(self):
        args = trials_ns_parser.parse_args()
        arg_id = args.get('id', None)
        found = TrialsModel.get_by_id(arg_id)
        if found:
            return found
        return {'message': 'trial not found'}, 404
