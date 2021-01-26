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
    const response = await fetch(`/api/locations`);

    if (response.ok) {
        const locations = response.json();
        dispatch(loadAllLocations(locations));
    }
  };

  export const getSingleLocation = (id) => async dispatch => {
      const response = await fetch(`/api/locations/${id}`)

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

        };
      }
    }
