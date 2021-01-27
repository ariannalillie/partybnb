from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Location, db

location_routes = Blueprint('location', __name__)


@location_routes.route('/')
# @login_required
def locations():
    locations = Location.query.all()
    print(locations)
    return {"locations": [location.to_dict() for location in locations]}



@location_routes.route('/proximity/<lat>/<lng>')
def closeProximity(lat, lng):

    latUpper = float(lat) + 10
    latLower = float(lat) - 10
    lngUpper = float(lng) + 10
    lngLower = float(lng) - 10
    closeProximityLocations = Location.query.filter(Location.latitude.between(latLower, latUpper)).filter(Location.longitude.between(lngLower, lngUpper))
    # closeProximityLocations = Location.query.filter(Location.latitude.between(31, 34))
    # closeProximityLocations = Location.query.all()
    return {"closeProximityLocations": [location.to_dict() for location in closeProximityLocations]}
    # return closeProximityLocations

@location_routes.route('/<id>')
def individualListing(id):
    listing = Location.query.get(id)
    return {"listing": listing.to_dict() }

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
