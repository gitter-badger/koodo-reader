import localforage from "localforage";
const initState = {
  books: [],
  epubs: [],
  covers: []
};
export function manager(state = initState, action) {
  switch (action.type) {
    case "HANDLE_BOOKS":
      return {
        ...state,
        books: action.payload
      };
    case "HANDLE_NOTES":
      return {
        ...state,
        notes: action.payload
      };
    case "HANDLE_BOOKMARKS":
      return {
        ...state,
        bookmarks: action.payload
      };
    case "HANDLE_EPUBS":
      return {
        ...state,
        epubs: action.payload
      };
    case "HANDLE_COVERS":
      return {
        ...state,
        covers: action.payload
      };

    default:
      return state;
  }
}
export function handleNotes(notes) {
  return { type: "HANDLE_NOTES", payload: notes };
}
export function handleBooks(books) {
  return { type: "HANDLE_BOOKS", payload: books };
}
export function handleEpubs(epubs) {
  return { type: "HANDLE_EPUBS", payload: epubs };
}
export function handleCovers(covers) {
  return { type: "HANDLE_COVERS", payload: covers };
}
export function handleBookmarks(bookmarks) {
  return { type: "HANDLE_COVERS", payload: bookmarks };
}
export function handleFetchBooks() {
  return dispatch => {
    localforage.getItem("books", (err, value) => {
      let bookArr = value;
      dispatch(handleBooks(bookArr));
      let epubArr = [];
      if (bookArr === null) {
        epubArr = [];
      } else {
        bookArr.forEach(item => {
          // console.log(item, "sgash");

          let epub = window.ePub({
            bookPath: item.content,
            restore: false
          });
          // console.log(epub, "eashah");
          epubArr.push(epub);
        });
      }

      // console.log(epubArr, "epubArr");
      dispatch(handleEpubs(epubArr));
      let coverArr = [];
      // async function getCovers(epubArr) {
      epubArr.forEach(async (item, index) => {
        await item.coverUrl().then(url => {
          // console.log(url, "urlsagasf");
          coverArr.push(url);
          if (coverArr.length === bookArr.length) {
            // console.log(coverArr, "coverArr");

            dispatch(handleCovers(coverArr));
          }
        });
      });
      // }
      // getCovers(epubArr);
    });
  };
}
