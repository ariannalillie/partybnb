export const LOAD_LOCATIONS = './locations/LOAD_LOCATIONS';
export const LOAD_SINGLE_LOCATION = './locations/LOAD_SINGLE_LOCATION';
export const ADD_LISTING = './locations/ADD_LISTING';
export const LOAD_SEARCH = "./locations/LOAD_SEARCH";


const loadAllLocations = (locationlist) => ({
  type: LOAD_LOCATIONS,
  locationlist,
});

const loadSingleLocation = (location) => ({
  type: LOAD_SINGLE_LOCATION,
  location,
});


const addLocation = location => ({
    type: ADD_LISTING,
    location
});

const loadSearch = (locationlist) => ({
  type: LOAD_SEARCH,
  locationlist,
});
  
export const getLocations = () => async (dispatch) => {
  const response = await fetch(`/api/location`);

  if (response.ok) {
    const locations = await response.json();
    console.log("this is the locations:   ",locations)
    dispatch(loadAllLocations(locations));
  }
};

export const getSingleLocation = (id) => async (dispatch) => {
  const response = await fetch(`/api/location/${id}`);
  if (response.ok) {
    const locations = await response.json();
    dispatch(loadSingleLocation(locations));
  }
};


//   export const searchLocations = () => async dispatch => {
//       const response = await fetch(`/api/location`, {
//         method: 'POST',
//         body: JSON.stringify({

//         }),
//       });
//   }

  export const createListing = (payload) => async dispatch => {
      console.log('PAYLOAD 2', payload)
      const { title, description, venueType, amenities, maxGuests, bookingPrice, address, city, state, zipcode } = payload;
      const response = await fetch(`/api/location/createlisting`, {
        method: 'POST',
        body: JSON.stringify({
            title, description, venueType, amenities, maxGuests, bookingPrice, address, city, state, zipcode
        }),
      });
      if (response.ok) {
        const location = await response.json();
        debugger
        dispatch(addLocation(location));
    }

export const searchLocations = (payload) => async (dispatch) => {
  const {spaceRemover} = payload
  const res = await fetch(
    `https://google-maps-geocoding.p.rapidapi.com/geocode/json?address=${spaceRemover}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "20dde32ademsha97b6dc9dd8189bp1973e4jsnbc1294ead8c1",
        "x-rapidapi-host": "google-maps-geocoding.p.rapidapi.com",
      },
    }
  );
  const googleResponse = await res.json();
  let searchLat = await googleResponse.results[0].geometry.location.lat;
  let searchLng = await googleResponse.results[0].geometry.location.lng;
  const response = await fetch(
    `http://localhost:5000/api/location/proximity/${searchLat}/${searchLng}`
  );
  
  if (response.ok) {
    const locationsNearSearchArea = await response.json()
    console.log("This is the locations search area.     ",locationsNearSearchArea.closeProximityLocations)
    dispatch(loadSearch(locationsNearSearchArea));
  }
};

  const initialState = {
    locationlist: [],
    location: {}
  };

  const locationReducer = (state = initialState, action) => {
    // debugger;
    switch (action.type) {
      case LOAD_LOCATIONS: {
            return {
              ...state,
              locationlist: action.locationlist.locations,
            };
        }
        case LOAD_SINGLE_LOCATION: {
            return {
              ...state,
              location: action.location.listing,
            };
        }
        case ADD_LISTING: {
            if (!state[action.locationlist.id]) {
                const newState = {
                  ...state,
                  [action.locationlist.id]: action.locationlist
                };
                const locationList = newState.locationlist.map(location => newState[location.id]);
                locationList.push(action.shelf);
                newState.shelf = locationList;
                return newState;
              }
              return {
                ...state,
                [action.locationlist.id]: {
                  ...state[action.locationlist.id],
                  ...action.locationlist,
                }
              };
            }
           case LOAD_SEARCH: {
      return {
        ...state,
        locationlist: action.locationlist.closeProximityLocations,
      };
    }
        default:
          return state;
      }


export default locationReducer;
