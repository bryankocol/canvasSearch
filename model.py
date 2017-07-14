from flask_sqlalchemy import SQLAlchemy
#python World Time Zone
import pytz 
#for onupdate
import datetime
import os

db = SQLAlchemy()

def connect_to_db(app, url = 'postgresql:///daily'):
    """ Connect the database to our Flask app. """

    if 'DATABASE_URL' in os.environ:
        url = os.environ['DATABASE_URL']

    app.config['SQLALCHEMY_DATABASE_URI'] = url
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = app
    db.init_app(app)
    app.config['SQLALCHEMY_ECHO'] = True

class AwareDateTime(db.TypeDecorator):
    """ Results returned as aware datetimes, not naive ones.
    sourced from: 
    http://stackoverflow.com/questions/23316083/sqlalchemy-how-to-load-dates-with-timezone-utc-dates-stored-without-timezone
    """
    impl = db.DateTime
    def process_result_value(self, value, dialect):
        return value.replace(tzinfo=pytz.utc)

class DrugSearch(db.Model):
    __tablename__ ="drugSearches"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    physcian_id = db.Column(db.Integer, nullable=False)
    patient_id = db.Column(db.Integer, nullable=True)
    drugName = db.Column(db.String(400), nullable=False)
    searched_at = db.Column(AwareDateTime, default=db.func.now(), nullable=False)


if __name__ == '_main_':
    from server import app

    connect_to_db(app)
    db.create_all()
    print "Connected to DB."
