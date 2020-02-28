import React, { Component } from "react";
import "./bookmarkPage.css";
import { connect } from "react-redux";
import { handleFetchBookmarks } from "../../redux/reader.redux";
import {
  handleReadingState,
  handleReadingBook,
  handleReadingEpub
} from "../../redux/book.redux";
import RecentBooks from "../../utils/recordRecent";
import RecordLocation from "../../utils/recordLocation";
class BookmarkPage extends Component {
  constructor(props) {
    super(props);
    this.state = { renderIndex: null };
  }
  UNSAFE_componentWillMount() {
    this.props.handleFetchBookmarks();
  }

  handleRedirect = (key, cfi, percentage) => {
    let { books, epubs } = this.props;
    let book = {};
    let epub = {};
    for (let i = 0; i < books.length; i++) {
      console.log(books[i].key, key, "key");
      if (books[i].key === key) {
        console.log("sdghasghgh");
        book = books[i];
        epub = epubs[i];
        break;
      }
    }
    // let epub = {};
    console.log(this.props.books, book);

    this.props.handleReadingBook(book);
    this.props.handleReadingEpub(epub);
    this.props.handleReadingState(true);
    RecentBooks.setRecent(key);
    RecordLocation.recordCfi(key, cfi, percentage);
  };
  handlePopup = index => {
    this.setState({ renderIndex: index });
  };
  handleClose = () => {
    // console.log("hello");
    this.setState({ renderIndex: null });
  };
  render() {
    let { bookmarks, books, covers } = this.props;
    // console.log(this.props.state, "bookmarks");
    let bookKeyArr = [];
    bookmarks.forEach(item => {
      if (bookKeyArr.indexOf(item.bookKey) === -1) {
        bookKeyArr.push(item.bookKey);
        return false;
      }
    });
    // console.log(bookKeyArr, "bookArr");

    let bookArr = books.filter(item => {
      // console.log(item.key, bookKeyArr, "haslghakfg");
      return bookKeyArr.indexOf(item.key) > -1;
    });
    // console.log(bookArr);
    let coverArr = covers.filter(item => {
      // console.log(item.key, bookKeyArr, "asgalsgh");
      return bookKeyArr.indexOf(item.key) > -1;
    });
    let coverObj = {};
    coverArr.forEach(item => {
      coverObj[item.key] = item.url;
    });
    // console.log(coverObj, "arr");
    let bookmarkObj = {};
    bookmarks.forEach(item => {
      if (!bookmarkObj[item.bookKey] && bookKeyArr.indexOf(item.bookKey) > -1) {
        bookmarkObj[item.bookKey] = [];
      }
      if (bookKeyArr.indexOf(item.bookKey) > -1) {
        bookmarkObj[item.bookKey].push(item);
      }
      return false;
    });
    console.log(bookmarkObj, "bookmarkObj");
    // bookKeyArr.map(item => {});
    const renderBookmarklistItem = item => {
      return bookmarkObj[item.key].map(item => (
        <li className="bookmark-page-list-item" key={item.key}>
          <div className="bookmark-page-list-item-title">{item.chapter}</div>
          <div className="bookmark-page-progress">
            {parseInt(item.percentage * 100)}%
          </div>
          <div
            className="bookmark-page-list-item-link"
            onClick={() => {
              this.handleRedirect(item.bookKey, item.cfi, item.percentage);
            }}
          >
            <div className="bookmark-page-list-item-link-text">点击跳转</div>
          </div>
        </li>
      ));
    };
    const renderBookmarkPageItem = (item, index, isShowMore) => {
      console.log(bookmarkObj[item.key].length, "fhfjhfjhfk");
      return (
        <li className="bookmark-page-item" key={item.key}>
          <img
            className="bookmark-page-cover"
            src={coverObj[item.key]}
            alt=""
          />
          <p className="bookmark-page-name">{bookArr[index].name}</p>

          <ul className="bookmark-page-bookmark-container">
            {renderBookmarklistItem(item)}
          </ul>
        </li>
      );
    };
    const renderBookmarkPage = () => {
      return bookArr.map((item, index) => {
        return (
          <div key={index}>{renderBookmarkPageItem(item, index, false)}</div>
        );
      });
    };
    return (
      <div className="bookmark-page-container">{renderBookmarkPage()}</div>
    );
  }
}
const mapStateToProps = state => {
  return {
    state: state,
    bookmarks: state.reader.bookmarks,
    covers: state.manager.covers,
    books: state.manager.books,
    epubs: state.manager.epubs
  };
};
const actionCreator = {
  handleFetchBookmarks,
  handleReadingState,
  handleReadingBook,
  handleReadingEpub
};
BookmarkPage = connect(mapStateToProps, actionCreator)(BookmarkPage);
export default BookmarkPage;
