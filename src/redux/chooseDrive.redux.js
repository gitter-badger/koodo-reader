// import localforage from "localforage";
const initState = {
  isChoose:false
};
export function chooseDrive(state = initState, action) {
  switch (action.type) {
    case "HANDLE_CHOOSE":
      return {
        ...state,
        isChoose: action.payload
      };

    
    default:
      return state;
  }
}

export function handleChoose(mode) {
  return { type: "HANDLE_CHOOSE", payload: mode };
}


// export function handleFetchLocations(epub) {
//   return dispatch => {
//     console.log(epub);
//     if (epub.locations !== undefined) {
//       epub.locations.generate().then(result => {
//         let locations = epub.locations;
//         console.log("sfhafshfhafh");
//         dispatch(handleLocations(locations));
//       });
//     }
//   };
// }
