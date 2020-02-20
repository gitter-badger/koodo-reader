import localforage from "localforage";
const initState = {
  bookmarks: [],
  notes: [],
  digests: [],
  locations: {},
  section: 4
};
export function reader(state = initState, action) {
  switch (action.type) {
    case "HANDLE_BOOKMARKS":
      return {
        ...state,
        bookmarks: action.payload
      };
    case "HANDLE_NOTES":
      return {
        ...state,
        notes: action.payload
      };
    case "HANDLE_DIGESTS":
      return {
        ...state,
        digests: action.payload
      };
    case "HANDLE_LOCATIONS":
      return {
        ...state,
        locations: action.payload
      };
    case "HANDLE_SECTION":
      return {
        ...state,
        section: action.payload
      };
    default:
      return state;
  }
}
export function handleNotes(notes) {
  return { type: "HANDLE_NOTES", payload: notes };
}
export function handleBookmarks(bookmarks) {
  return { type: "HANDLE_BOOKMARKS", payload: bookmarks };
}
export function handleDigests(digests) {
  return { type: "HANDLE_DIGESTS", payload: digests };
}
export function handleLocations(locations) {
  return { type: "HANDLE_LOCATIONS", payload: locations };
}
export function handleSection(section) {
  return { type: "HANDLE_SECTION", payload: section };
}
export function handleFetchNotes() {
  return dispatch => {
    localforage.getItem("notes", (err, value) => {
      let noteArr;
      if (value === null || value === []) {
        noteArr = [];
      } else {
        noteArr = value;
      }

      dispatch(handleNotes(noteArr));
    });
  };
}

export function handleFetchBookmarks() {
  return dispatch => {
    localforage.getItem("bookmarks", (err, value) => {
      let bookmarkArr;
      if (value === null || value === []) {
        bookmarkArr = [];
      } else {
        bookmarkArr = value;
      }
      // console.log(value, "dgaskgskgr");
      dispatch(handleBookmarks(bookmarkArr));
    });
  };
}
export function handleFetchDigests() {
  return dispatch => {
    localforage.getItem("digests", (err, value) => {
      let digestArr;
      if (value === null || value === []) {
        digestArr = [];
      } else {
        digestArr = value;
      }
      dispatch(handleDigests(digestArr));
    });
  };
}
