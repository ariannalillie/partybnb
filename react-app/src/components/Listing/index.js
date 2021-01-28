import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleLocation } from "../../store/locations";

const Listing = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const listing = useSelector(state => state.locations.location);
    // const listing = {}

    useEffect(() => {
        dispatch(getSingleLocation(id))
      }, [dispatch]);

    if (!listing.title) {
        return null;
    }

    return (
        <div className='location'>
                 <h1>{listing.title}</h1>
                 <div>
                    <p>Venue Type: {listing.venueType}</p>
                    <p>Max Guests: {listing.maxGuests}</p>
                    <p>Description: {listing.description}</p>
                    <p>Amenities: {listing.amenities}</p>
                    <p>Booking Price: {listing.bookingPrice}</p>
                    <p>Address: {listing.address}, {listing.city}, {listing.state} {listing.zipcode}</p>
                </div>
        </div>
    )
}

export default Listing;
