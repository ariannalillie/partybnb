from app.models.allModels import db,Photo

# Adds a demo user, you can add other users here if you want
def seed_photos():


    seed = [
       Photo(users_id=1, locations_id=1, photoUrl='https://i.imgur.com/cdSH48L.jpeg'),

       Photo(users_id=2, locations_id=2, photoUrl='https://i.imgur.com/Vgae9Rg.jpg'),

       Photo(users_id=3, locations_id=3, photoUrl='https://www.americamagazine.org/sites/default/files/styles/article_image_750_x_503_/public/main_image/joshua-eckstein-nkUioaswtvM-unsplash.jpg.png?itok=Fk8z6L_W'),

       Photo(users_id=4, locations_id=4, photoUrl='https://www.staplescenter.com/assets/img/Member_Hero_3-569baecb3f.jpg'),

       Photo(users_id=5, locations_id=5, photoUrl='https://www.air-and-space.com/20100516%20Cabazon/20100516%20Claude%20Bells%20Dinosaurs%20xl.jpg')
    ]

    db.session.add_all(seed)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_photos():
    db.session.execute('TRUNCATE photos CASCADE;')
    db.session.commit()
