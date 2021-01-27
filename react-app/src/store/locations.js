export const LOAD_LOCATIONS = "./locations/LOAD_LOCATIONS";
export const LOAD_SINGLE_LOCATION = "./locations/LOAD_SINGLE_LOCATION";
export const LOAD_SEARCH = "./locations/LOAD_SEARCH";

const loadAllLocations = (locationlist) => ({
  type: LOAD_LOCATIONS,
  locationlist,
});

const loadSingleLocation = (location) => ({
  type: LOAD_SINGLE_LOCATION,
  location,
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
  location: {},
};

const locationReducer = (state = initialState, action) => {
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
    case LOAD_SEARCH: {
      return {
        ...state,
        locationlist: action.locationlist.closeProximityLocations,
      };
    }

    default:
      return state;
  }
};

export default locationReducer;
