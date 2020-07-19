from db import db
import datetime


class FeedbackModel(db.Model):
    __tablename__ = 'feedback'

    id = db.Column(db.BigInteger, primary_key=True)
    id_1 = db.Column(db.VARCHAR(255))
    id_2 = db.Column(db.VARCHAR(255))
    duplicated = db.Column(db.BOOLEAN)
    creator = db.Column(db.VARCHAR(255))
    create_date = db.Column(db.DATETIME)

    def __init__(self, id_1, id_2, duplicated, creator):
        self.id_1 = id_1
        self.id_2 = id_2
        self.duplicated = duplicated
        self.creator = creator
        self.create_date = datetime.datetime.now()

    def json(self):
        return {
            'id': self.id,
            'id_1': self.id_1,
            'id_2': self.id_2,
            'duplicated': self.duplicated,
            'creator': self.creator,
            'create_date': str(self.create_date)
        }

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @staticmethod
    def get_by_id(fid):
        return db.session.query(FeedbackModel).filter(FeedbackModel.id == fid).first()
