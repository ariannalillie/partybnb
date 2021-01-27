from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required
from app.models import db, Location

location_routes = Blueprint('location', __name__)


@location_routes.route('/')
def locations():
    locations = Location.query.all()
    return {"locations": [location.to_dict() for location in locations]}

@location_routes.route('/<id>')
def individualListing(id):
    listing = Location.query.get(id)
    return {"listing": listing.to_dict() }

@location_routes.route('/createlisting', methods=["POST"])
@login_required
def addListing():
    form_data = request.get_json(force=True)
    print('FORM DATA', form_data)
    new_listing = Location(users_OwnerId=1,title=form_data["title"],venueType=form_data["venueType"], description=form_data["description"], amenities=form_data["amenities"], maxGuests=form_data["maxGuests"], bookingPrice=form_data["bookingPrice"], address=form_data["address"], city=form_data["city"], state=form_data["state"], zipcode=form_data["zipcode"])
    db.session.add(new_listing)
    db.session.commit()
    return redirect('/')
