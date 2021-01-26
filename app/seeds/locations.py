from app.models.allModels import db, Location

# Adds a demo user, you can add other users here if you want
def seed_locations():


    seed = [
        Location(users_OwnerId=1, latitude='41', longitude='-74', venueType='Stadium', 
        title='Yankee Stadium', description='Whole Ball Park', amenities='Yes', maxGuests=50000, 
        bookingPrice=2000000, address='1 East 161st Street', city='New York', state='New York',
        zipcode='10451'),

        Location(users_OwnerId=2, latitude='48', longitude='-122', venueType='Warehouse', 
        title='Loft', description='Cozy', amenities='Sauna, Steam', maxGuests=500, 
        bookingPrice=20000, address='69th Pl W', city='Lynnwood', state='Washington',
        zipcode='98036'),
        
        Location(users_OwnerId=3, latitude='38', longitude='-90', venueType='Church', 
        title='Church', description='Party', amenities='Yes', maxGuests=500, 
        bookingPrice=20000, address='4431 Lindell Blvd', city='St. Louis', state='Missouri',
        zipcode='63108'),
        
        Location(users_OwnerId=4, latitude='34', longitude='-118', venueType='Arena', 
        title='Staples Center', description='Party', amenities='Yes', maxGuests=19000, 
        bookingPrice=300000, address='1111 South Figueroa St', city='Los Angeles', state='California',
        zipcode='90015'),
        
        Location(users_OwnerId=5, latitude='33', longitude='-116', venueType='Amusement Park', 
        title='Claude Bell Dinosaurs', description='Party', amenities='Yes', maxGuests=100000, 
        bookingPrice=599999, address='50770 Seminole Drive', city='Cabazon', state='California',
        zipcode='92230')
    ]

    db.session.add_all(seed)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_locations():
    db.session.execute('TRUNCATE locations CASCADE;')
    db.session.commit()
