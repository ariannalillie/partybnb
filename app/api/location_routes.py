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
