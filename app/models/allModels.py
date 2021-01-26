from flask_sqlalchemy import SQLAlchemy
# from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

db = SQLAlchemy()


class User(db.Model, UserMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String)
    lastName = db.Column(db.String)
    username = db.Column(db.String)
    email = db.Column(db.String(255), nullable=False)
    hashed_password = db.Column(db.String(255), nullable = False)
    bookings = db.relationship("Booking", back_populates="user")
    locations = db.relationship("Location", back_populates="user")
    photos = db.relationship("Photo", back_populates="user")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email
        }


class Location(db.Model):
    __tablename__='locations'
    id = db.Column(db.Integer, primary_key = True)
    users_OwnerId = db.Column(db.Integer, ForeignKey('users.id'))
    latitude = db.Column(db.Integer)
    longitude = db.Column(db.Integer)
    venueType = db.Column(db.String(255))
    title = db.Column(db.String(255))
    description = db.Column(db.String)
    amenities = db.Column(db.String)
    maxGuests = db.Column(db.Integer)
    bookingPrice = db.Column(db.Integer)
    address = db.Column(db.String)
    city = db.Column(db.String)
    state = db.Column(db.String)
    zipcode = db.Column(db.String)

    user = db.relationship("User", back_populates="locations")
    bookings = db.relationship("Booking", back_populates="locations")
    reviews = db.relationship("Review", back_populates="locations")
    photos = db.relationship("Photo", back_populates="locations")

    def to_dict(self):
        return {
            "id": self.id,
            "latitude": self.latitude,
            "venueType": self.venueType,
            "description": self.description,
            "title": self.title,
            "amenities": self.amenities,
            "maxGuests": self.maxGuests,
            "bookingPrice": self.bookingPrice,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "zipcode": self.zipcode,
        }

class Booking(db.Model):
    __tablename__ = 'bookings'
    id = db.Column(db.Integer, primary_key = True)
    users_id = db.Column(db.Integer, ForeignKey('users.id'))
    locations_id = db.Column(db.Integer, ForeignKey('locations.id'))
    startDate = db.Column(db.Date)
    endDate = db.Column(db.Date)
    numGuests = db.Column(db.Integer)
    totalPrice = db.Column(db.Integer)
    additionalReq = db.Column(db.String)


    user = db.relationship("User", back_populates="bookings")
    locations = db.relationship("Location", back_populates="bookings")

class Review(db.Model):
    __tablename__ ='reviews'
    id = db.Column(db.Integer, primary_key = True)
    locations_id = db.Column(db.Integer, ForeignKey('locations.id'))
    stars = db.Column(db.Integer)
    review = db.Column(db.String)

    locations = db.relationship("Location", back_populates="reviews")

class Photo(db.Model):
    __tablename__ = 'photos'
    id = db.Column(db.Integer, primary_key = True)
    users_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    locations_id = db.Column(db.Integer, db.ForeignKey('locations.id'))
    photoUrl = db.Column(db.String)


    users = db.relationship("User", back_populates="photos")
    locations = db.relationship("Location", back_populates="photos")
