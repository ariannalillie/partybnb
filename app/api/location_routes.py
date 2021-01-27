from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Location

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