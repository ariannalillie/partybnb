from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want
def seed_users():

    seed = [
        User(username='george_steinbrenner', email='george@email.com',
        password='password', firstName='george', lastName='steinbrenner'),
        
        User(username='john_smith', email='john@email.com',
        password='password', firstName='john', lastName='smith'),
        
        User(username='mitchell_rozanski', email='mitchell@email.com',
        password='password', firstName='mitchell', lastName='rozanski'),
        
        User(username='jeanie_buss', email='jeanie@email.com',
        password='password', firstName='jeanie', lastName='buss'),
        
        User(username='claude_bell', email='claude@email.com',
        password='password', firstName='claude', lastName='bell'),
    ]

    db.session.add_all(seed)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users CASCADE;')
    db.session.commit()
