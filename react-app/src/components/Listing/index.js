import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Listing = () => {
    const [listing, setListing] = useState([])
    const { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:5000/api/location/${id}`);
            console.log(response);
            const { listing } = await response.json();
            setListing(listing);
        }
        fetchData();
      }, []);

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
