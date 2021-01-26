import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLocations } from "../../store/locations";

const Location = () => {

    // const { location } = useSelector(state => {
    //     return state.selectedLocation
    // })

    // const dispatch = useDispatch();

    // const { location } = useSelector(state => {
    //     return state.locationlist
    // });

    // useEffect(() => {
    //         dispatch(getLocations());
    //   }, [dispatch]);

    const location = {
        title: 'Wrigley Field',
        description: 'Large stadium in Chicago',
        venueType: 'Stadium',
        amenities: 'Lots of seats, hot dog stand',
        maxGuests: 50000,
        bookingPrice: 20000,
        address: '1060 W Addison St',
        city: 'Chicago',
        state: 'Illinois',
        zipcode: '60613'
    }

    return (
        <div className='location'>
                <h1>{location.title}</h1>
                <div>
                    <p>Venue Type: {location.venueType}</p>
                    <p>Max Guests: {location.maxGuests}</p>
                    <p>Description: {location.description}</p>
                    <p>Amenities: {location.amenities}</p>
                    <p>Booking Price: {location.bookingPrice}</p>
                    <p>Address: {location.address}, {location.city}, {location.state} {location.zipcode}</p>
                </div>
        </div>
    )
}

export default Location;
