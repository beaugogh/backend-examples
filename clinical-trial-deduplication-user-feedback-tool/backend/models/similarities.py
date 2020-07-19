from db import db
from models.feedback import FeedbackModel


class SimilaritiesModel(db.Model):
    __tablename__ = 'similarities'
    __table_args__ = (
        db.PrimaryKeyConstraint('id_1', 'id_2'),
    )

    id_1 = db.Column(db.VARCHAR(255), primary_key=True)
    id_2 = db.Column(db.VARCHAR(255), primary_key=True)
    jaccard = db.Column(db.FLOAT)
    dice = db.Column(db.FLOAT)
    cosine = db.Column(db.FLOAT)
    wmd = db.Column(db.FLOAT)
    duplicated = db.Column(db.BOOLEAN)

    def json(self):
        return {
            'id_1': self.parse_id(self.id_1),
            'id_2': self.parse_id(self.id_2),
            'jaccard': self.jaccard,
            'dice': self.dice,
            'consine': self.cosine,
            'wmd': self.wmd,
            'duplicated': self.duplicated
        }

    @staticmethod
    def filter(min_cosine, max_cosine, duplicated, user):
        # the user has already given his feedback on these pairs of trials
        existing_pairs = [
            x.json() for x in
            db.session.query(FeedbackModel)
                .filter(FeedbackModel.creator == user)
                .all()
        ]

        all_pairs = [
            x.json() for x in
            db.session.query(SimilaritiesModel)
                .filter(SimilaritiesModel.cosine >= min_cosine)
                .filter(SimilaritiesModel.cosine <= max_cosine)
                .filter(SimilaritiesModel.duplicated == duplicated)
                .limit(100)
                .all()
        ]

        new_pairs = []
        for p in all_pairs:
            is_valid = True
            for ep in existing_pairs:
                if p['id_1'] == ep['id_1'] and p['id_2'] == ep['id_2']:
                    is_valid = False
                    break
            if is_valid:
                new_pairs.append(p)

        return new_pairs

    def parse_id(self, id_val):
        if 'CTRI' in id_val:
            return id_val.replace('-', '/')
        elif 'Outside-EU-EEA' in id_val:
            return id_val.replace('Outside-EU-EEA', 'Outside-EU/EEA')
        else:
            return id_val
