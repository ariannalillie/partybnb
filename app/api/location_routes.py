from flask_login import login_required, current_user
from sqlalchemy import or_
from flask import Blueprint, jsonify, request, redirect
from app.models import db, Location, User, Booking
from datetime import date


location_routes = Blueprint('location', __name__)


@location_routes.route('/')
def locations():
    locations = Location.query.all()
    return {"locations": [location.to_dict() for location in locations]}


@location_routes.route('/proximity/<lat>/<lng>/<chkin>/<chkout>/<guests>')
def closeProximity(lat, lng, chkin, chkout, guests):
    latUpper = float(lat) + 10
    latLower = float(lat) - 10
    lngUpper = float(lng) + 10
    lngLower = float(lng) - 10
    # closeProximityLocations = Location.query.join(Booking).filter(or_(Booking.id == None, Booking.id == 2, Booking.id ==1))
    closeProximityLocations = Location.query.filter(Location.latitude.between(latLower, latUpper)).filter(Location.longitude.between(lngLower, lngUpper)). \
            filter(or_(Booking.startDate < chkin, Booking.endDate > chkout, Booking.startDate == None)). \
                filter(or_(Booking.endDate < chkin, Booking.endDate > chkout, Booking.startDate == None)). \
                    filter(or_(Location.maxGuests >= guests, Location.maxGuests == None))
    # closeProximityLocations = Location.query.filter(Location.latitude.between(31, 34))
    # closeProximityLocations = Location.query.all()
    return {"closeProximityLocations": [location.to_dict() for location in closeProximityLocations]}
    # return closeProximityLocations


@location_routes.route('/createlisting', methods=["POST"])
@login_required
def addListing():
    form_data = request.get_json(force=True)
    print('FORM DATA', form_data)
    print('USER ID', current_user.id)
    new_listing = Location(users_OwnerId=current_user.id,title=form_data["title"],venueType=form_data["venueType"], description=form_data["description"], amenities=form_data["amenities"], maxGuests=form_data["maxGuests"], bookingPrice=form_data["bookingPrice"], address=form_data["address"], city=form_data["city"], state=form_data["state"], zipcode=form_data["zipcode"])
    db.session.add(new_listing)
    db.session.commit()
    return redirect('/')


@location_routes.route('/<id>')
def individualListing(id):
    listing = Location.query.get(id)
    return {"listing": listing.to_dict() }
