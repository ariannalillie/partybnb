import React, { useEffect, useState } from 'react';
import { createListing } from '../../store/locations';
import { Link } from "react-router-dom";
import Search from "../Search";
import { useSelector, useDispatch } from 'react-redux';


const CreateListing = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [amenities, setAmenities] = useState('');
    const [maxGuests, setMaxGuests] = useState(0);
    const [bookingPrice, setBookingPrice] = useState(0);
    const [address, setAddress] = useState('');
    const [venueType, setVenueType] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');

    const updateTitle = (e) => setTitle(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updateAmenities = (e) => setAmenities(e.target.value);
    const updateMaxGuests = (e) => setMaxGuests(e.target.value);
    const updateBookingPrice = (e) => setBookingPrice(e.target.value);
    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateZipcode = (e) => setZipcode(e.target.value);
    const updateVenueType = (e) => setVenueType(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
           title, description, amenities, venueType, maxGuests, bookingPrice, address, city, state, zipcode
        }
        console.log('PAYLOAD', payload)
        dispatch(createListing(payload));
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input type="text" name="title" value={title} onChange={updateTitle}></input>
            <label htmlFor="description">Description:</label>
            <input type="text" name="description" value={description} onChange={updateDescription}></input>
            <label htmlFor="amenities">Amenities:</label>
            <input type="text" name="amenities" value={amenities} onChange={updateAmenities}></input>
            <label htmlFor="maxGuests">Max Guests:</label>
            <input type="text" name="maxGuests" value={maxGuests} onChange={updateMaxGuests}></input>
            <label htmlFor="bookingPrice">Booking Price:</label>
            <input type="text" name="bookingPrice" value={bookingPrice} onChange={updateBookingPrice}></input>
            <label htmlFor="address">Address:</label>
            <input type="text" name="address" value={address} onChange={updateAddress}></input>
            <label htmlFor="venueType">Venue Type:</label>
            <input type="text" name="venueType" value={venueType} onChange={updateVenueType}></input>
            <label htmlFor="city">City:</label>
            <input type="text" name="city" value={city} onChange={updateCity}></input>
            <label htmlFor="state">State:</label>
            <input type="text" name="state" value={state} onChange={updateState}></input>
            <label htmlFor="zipcode">Zip Code:</label>
            <input type="text" name="zipcode" value={zipcode} onChange={updateZipcode}></input>
            <button type="submit">Add Listing</button>
            </form>
        </div>
    )
}

export default CreateListing;
