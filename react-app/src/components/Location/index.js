import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Search from "../Search";
import { useSelector, useDispatch } from 'react-redux';
import { getLocations } from "../../store/locations";

const Location = () => {
    const dispatch = useDispatch();
    const locationlist = useSelector(state => state.locations.locationlist);
    const [locations, setLocations] = useState([])
    useEffect(() => {
        // async function fetchData() {
        //     const response = await fetch('http://localhost:5000/api/location');
        //     console.log(response);
        //     const { locations } = await response.json();
        //     setLocations(locations);
        // }
        // fetchData();

        dispatch(getLocations())
      }, [dispatch]);

      console.log('LOCATIONLIST', locationlist)

      if (!locationlist.locations) {
          return null;
      }

    return (
        <div className='location'>
                <Search />
                {locationlist.locations.map(location =>
                <>
                 <h1><Link to={`/locations/${location.id}`}>{location.title}</Link></h1>
                 <div>
                    <p>Venue Type: {location.venueType}</p>
                    <p>Max Guests: {location.maxGuests}</p>
                    <p>Description: {location.description}</p>
                    <p>Amenities: {location.amenities}</p>
                    <p>Booking Price: {location.bookingPrice}</p>
                    <p>Address: {location.address}, {location.city}, {location.state} {location.zipcode}</p>
                </div>
                </>
             )}
        </div>
    )
}

export default Location;
