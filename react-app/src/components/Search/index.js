import React, { useState, useEffect } from "react";
import './Search.css';
// import Location from "../../../../app/models/";



const fakeData = {
  address: "52 Prentiss St, Watertown, MA 02472",
  venueType: "Warehouse",
  ammenities: "Skylight",
  maxGuests: "50",
  bookingPrice: "500",
};
const Search = () => {
  const [locations, setLocations] = useState("")
  const [queryLocation, setQueryLocation] = useState("")
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [numGuests, setNumGuests] = useState(1)
  const submitForm = async (e) => {
    e.preventDefalt();

  };

  useEffect(async () => {
    const res = await fetch(`http://localhost:5000/api/location`)
    const data = await res.json();
    setLocations(data)
  }, []);

  return (
    <div className="location">
      <form onSubmit={submitForm}>
        <div className="search-bar-container">
          <input
            className="search-bar"
            placeholder="Location"
            value={queryLocation}
            onChange={(e) => setQueryLocation(e.target.value)}
          ></input>
          <input
            type="date"
            className="search-bar"
            placeholder="Check in"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          ></input>
          <input
            type="date"
            className="search-bar"
            placeholder="Check out"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
          ></input>
          <input
            className="search-bar"
            placeholder="Guests"
            value={numGuests}
            onChange={(e) => setNumGuests(e.target.value)}
          ></input>
          <button className="search-button"></button>
        </div>
      </form>
    </div>
  );
};

export default Search;
