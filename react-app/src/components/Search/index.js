import React, { useState, useEffect } from "react";
import './Search.css';
import {searchLocations} from "../../store/locations";
import { useSelector, useDispatch } from "react-redux";
import {  useHistory } from "react-router-dom";
import search from "../../media/search.svg";


// import Location from "../../../../app/models/";

const fakeData = {
  address: "52 Prentiss St, Watertown, MA 02472",
  venueType: "Warehouse",
  ammenities: "Skylight",
  maxGuests: "50",
  bookingPrice: "500",
};
const Search = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [locations, setLocations] = useState("")
  const [queryLocation, setQueryLocation] = useState("")

  let [checkInDate, setCheckInDate] = useState();
  let [checkOutDate, setCheckOutDate] = useState();
  let [numGuests, setNumGuests] = useState(1)

  const submitForm = async (e) => {
    e.preventDefault();

    let spaceRemover = queryLocation.split(" ").join("%20")
    if(numGuests == null || numGuests <1){
      numGuests = 1
    }
    const payload = {spaceRemover, checkInDate, checkOutDate, numGuests}
    dispatch(searchLocations(payload));
    history.push('/locations')
  };

  useEffect(() => {
    const fetchLocations = async () =>{
      const res = await fetch(`/api/location/`)
      const data = await res.json();
      setLocations(data)
    }
    fetchLocations();
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
          <button className="search-button"><img src={search} alt="Logo" className="search"/></button>
        </div>
      </form>
    </div>
  );
};

export default Search;
