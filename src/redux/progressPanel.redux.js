// import localforage from "localforage";
// import RecordLocation from "../utils/recordLocation";
const initState = {
  locations: null
};
export function progressPanel(state = initState, action) {
  switch (action.type) {
    case "HANDLE_PERCENTAGE":
      return {
        ...state,
        percentage: action.payload
      };

    case "HANDLE_SECTION":
      return {
        ...state,
        section: action.payload
      };
    case "HANDLE_LOCATIONS":
      return {
        ...state,
        locations: action.payload
      };
    default:
      return state;
  }
}

export function handleLocations(locations) {
  return { type: "HANDLE_LOCATIONS", payload: locations };
}

export function handleFetchLocations(epub) {
  return dispatch => {
    epub.locations.generate().then(result => {
      let locations = epub.locations;
      console.log("sfhafshfhafh");
      dispatch(handleLocations(locations));
    });
  };
}
