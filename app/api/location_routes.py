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

@location_routes.route('/<id>')
def individualListing(id):
    listing = Location.query.get(id)
    return {"listing": listing.to_dict() }

@location_routes.route('/<lat>/<lng>')
def closeProximity(lat, lng):
    latUpper = int(lat) + 0.08
    latLower = lat - 0.08
    lngUpper = lng + 0.08
    lngLower = lng - 0.08
    closeProximityLocations = Location.query.filter(Location.latitude.between[latLower, latUpper]).filter(Location.longitude.between[lngLower, lngUpper])
    return {"closeProximityLocations": [location.to_dict() for location in closeProximityLocations]}