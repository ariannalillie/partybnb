from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Location

location_routes = Blueprint('location', __name__)


@location_routes.route('/')
# @login_required
def locations():
    return "locations"
    # locations = Location.query.all()
    # return {"locations": [location.to_dict() for location in locations]}
