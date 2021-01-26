import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { getLocations } from "../../store/locations";

const Location = () => {
    const [locations, setLocations] = useState([])

    // const { locations } = useSelector(state => {
    //     return state.locationlist
    // })

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:5000/api/location');
            console.log(response);
            const { locations } = await response.json();
            setLocations(locations);
        }
        fetchData();
      }, []);

    // const dispatch = useDispatch();

    // const { location } = useSelector(state => {
    //     return state.locationlist
    // });

    // useEffect(() => {
    //         dispatch(getLocations());
    //   }, [dispatch]);

    console.log(locations)

    // const { deconstructedLocations } = locations;

    return (
        <div className='location'>
                {locations.map(location =>
                <>
                 <h1>{location.title}</h1>
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
