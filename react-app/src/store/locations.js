export const LOAD_LOCATIONS = './locations/LOAD_LOCATIONS';
export const LOAD_SINGLE_LOCATION = './locations/LOAD_SINGLE_LOCATION';
export const ADD_LISTING = './locations/ADD_LISTING';

const loadAllLocations = locationlist => ({
    type: LOAD_LOCATIONS,
    locationlist,
  });

const loadSingleLocation = location => ({
    type: LOAD_SINGLE_LOCATION,
    location
});

const addLocation = location => ({
    type: ADD_LISTING,
    location
});

export const getLocations = () => async dispatch => {
    const response = await fetch(`/api/location`);

    if (response.ok) {
        const locations = await response.json();
        dispatch(loadAllLocations(locations));
    }
  };

  export const getSingleLocation = (id) => async dispatch => {
    const response = await fetch(`/api/location/${id}`);
    if (response.ok) {
        const locations = await response.json();
        dispatch(loadSingleLocation(locations));
    }
  }

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
  }

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
        default:
          return state;
      }
    }

    export default locationReducer;
