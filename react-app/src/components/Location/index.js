import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Search from "../Search";
import SimpleMap from "../SimpleMap";
import { useSelector, useDispatch } from 'react-redux';
import { getLocations } from "../../store/locations";
import CreateListing from "../CreateListing"
import "./Location.css";

const Location = () => {
    // const dispatch = useDispatch();
    const locationlist = useSelector(state => state.locations.locationlist);
    // useEffect(() => {
    //     dispatch(getLocations())
    //   }, [dispatch]);

      if (!locationlist) {
          return (
              <div>
              <p>Please go back to the home page to search for an eventspace.</p>
              </div>
          );
      }

    return (
        <div className='location'>
                <CreateListing />
                <Search />
                <div>
                {locationlist.map(location =>
                <div class="eventspace-container">
                 <h1><Link to={`/locations/${location.id}`}>{location.title}</Link></h1>
                 <div>
                    <img class="eventspacephoto" src={location.photos.photoUrl} alt="eventspace" />
                    <p>Venue Type: {location.venueType}</p>
                    <p>Max Guests: {location.maxGuests}</p>
                    <p>Description: {location.description}</p>
                    <p>Amenities: {location.amenities}</p>
                    <p>Booking Price: {location.bookingPrice}</p>
                    <p>Address: {location.address}, {location.city}, {location.state} {location.zipcode}</p>
                </div>
                <div class="map">
            <SimpleMap />
          </div>
              </div>
            )}

          </div>
          <div>
          </div>

        </div>

    );
}

export default Location;
