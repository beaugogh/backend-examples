from flask_restplus import Resource, Namespace
from models.feedback import FeedbackModel
from flask import request

feedback_ns = Namespace('feedback')
feedback_ns_parser = feedback_ns.parser()
feedback_ns_parser.add_argument('id',
                                type=str,
                                location='args',
                                required=False,
                                default=None,
                                help='The id of the feedback')


@feedback_ns.expect(feedback_ns_parser)
@feedback_ns.route('', methods=['GET', 'POST'])
class FeedbackResource(Resource):
    def get(self):
        args = feedback_ns_parser.parse_args()
        arg_id = args.get('id', None)
        found = FeedbackModel.get_by_id(arg_id)
        if found:
            return found.json()
        return {'message': 'feedback not found'}, 404

    def post(self):
        json = request.json
        id_1 = json['id_1']
        id_2 = json['id_2']
        duplicated = json['duplicated']
        creator = json['creator']
        feedback = FeedbackModel(id_1, id_2, duplicated, creator)

        try:
            feedback.save_to_db()
            return 'success', 200
        except:
            return 'fail', 500
