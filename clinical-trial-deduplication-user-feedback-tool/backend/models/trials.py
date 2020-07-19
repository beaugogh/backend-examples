from db import db


class TrialsModel(db.Model):
    __tablename__ = 'trials'

    TrialID = db.Column(db.VARCHAR(255), nullable=False, primary_key=True)
    Primary_Register_text = db.Column(db.TEXT(255))

    Inclusion_agemin = db.Column(db.VARCHAR(255))
    Inclusion_agemax = db.Column(db.VARCHAR(255))
    Inclusion_sex = db.Column(db.VARCHAR(255))
    URL = db.Column(db.VARCHAR(255))
    Study_type = db.Column(db.VARCHAR(255))
    Acronym = db.Column(db.VARCHAR(255))
    Date_enrollement = db.Column(db.VARCHAR(255))
    Phase = db.Column(db.VARCHAR(255))
    child_flag = db.Column(db.VARCHAR(255))
    Country = db.Column(db.VARCHAR(255))
    Date_registration = db.Column(db.VARCHAR(255))
    lang = db.Column(db.VARCHAR(10))
    Primary_sponsor = db.Column(db.TEXT)
    Secondary_Sponsor = db.Column(db.TEXT)
    Public_title = db.Column(db.TEXT)
    Scientific_title = db.Column(db.TEXT)
    Study_design = db.Column(db.TEXT)
    Target_size = db.Column(db.TEXT)
    Recruitment_status = db.Column(db.TEXT)
    Contacts = db.Column(db.TEXT)
    Inclusion_criteria = db.Column(db.TEXT)
    Exclusion_criteria = db.Column(db.TEXT)
    Health_condition = db.Column(db.TEXT)
    Intervention = db.Column(db.TEXT)
    Primary_outcome = db.Column(db.TEXT)
    Secondary_outcome = db.Column(db.TEXT)
    Secondary_IDs = db.Column(db.TEXT)
    Source_support = db.Column(db.TEXT)

    def json(self):
        return {
            '0. Trial ID': self.TrialID,
            '1. Public Title': self.Public_title,
            '2. Scientific Title': self.Scientific_title,
            '3. Inclusion Criteria': self.Inclusion_criteria,
            '4. Exclusion Criteria': self.Exclusion_criteria,
            '5. Health Condition': self.Health_condition,
            '6. Intervention': self.Intervention,
            '7. Primary Outcome': self.Primary_outcome,
            '8. Secondary Outcome': self.Secondary_outcome
        }

    @staticmethod
    def get_by_id(trial_id):
        found = db.session.query(TrialsModel).filter(TrialsModel.TrialID == trial_id).first()
        if found:
            return found.json()
        else:
            return None
