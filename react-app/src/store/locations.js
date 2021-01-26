export const LOAD_LOCATIONS = './locations/LOAD_LOCATIONS';
export const LOAD_SINGLE_LOCATION = './locations/LOAD_SINGLE_LOCATION';

const loadAllLocations = locationlist => ({
    type: LOAD_LOCATIONS,
    locationlist,
  });

const loadSingleLocation = location => ({
    type: LOAD_SINGLE_LOCATION,
    location
})

export const getLocations = () => async dispatch => {
    const response = await fetch(`/api/location`);

    if (response.ok) {
        const locations = await response.json();
        dispatch(loadAllLocations(locations));
    }
  };

  export const getSingleLocation = (id) => async dispatch => {
      const response = await fetch(`/api/location/${id}`)

      if (response.ok) {
          const singleLocation = response.json();
          dispatch(loadSingleLocation(singleLocation));
      }
  }

  const initialState = {
    locationlist: []
  };

  const locationReducer= (state = initialState, action) => {
    switch (action.type) {
      case LOAD_LOCATIONS: {
          console.log('LOCATIONLIST LOCATIONS', action.locationlist.locations)
            const allLocations = [...action.locationlist.locations]
            return {
              ...allLocations,
              ...state,
              locationlist: action.locationlist,
            };
        }
        default:
          return state;
      }
    }

    export default locationReducer;
