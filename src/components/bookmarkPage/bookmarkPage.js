import React, { Component } from "react";
import "./bookmarkPage.css";
import { connect } from "react-redux";
import { BookData } from "../../utils/booklist.data";
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
    // for(let i=0;i<epubs.length;i++){
    //   if([i].)
    // }
    // let epub = window.ePub({
    //   bookPath: book.content,
    //   restore: false
    // });
    // console.log(epub);
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
    // console.log(bookmarkObj, "bookmarkObj");
    // bookKeyArr.map(item => {});
    const renderBookmarkPageItem = (item, index, isShowMore) => {
      return (
        <li className="bookmark-page-item" key={item.key}>
          <img
            style={
              isShowMore
                ? {
                    width: "105px",
                    height: "137px",
                    position: "fixed",
                    margin: "25px"
                  }
                : {}
            }
            className="bookmark-page-cover"
            src={coverObj[item.key]}
            alt=""
          />
          <p
            style={
              isShowMore
                ? {
                    fontSize: "16px",
                    position: "fixed",
                    marginLeft: "24px",
                    marginTop: "200px"
                  }
                : {}
            }
            className="bookmark-page-name"
          >
            {bookArr[index].name}
          </p>

          <ul
            className="bookmark-page-bookmark-container"
            style={
              isShowMore
                ? { marginLeft: "170px", marginTop: "20px" }
                : { overflow: "hidden" }
            }
          >
            {bookmarkObj[item.key].map(item => (
              <li className="bookmark-page-list-item" key={item.key}>
                <div className="bookmark-page-list-item-title">
                  {item.chapter}
                </div>
                <span className="bookmark-page-progress">
                  {parseInt(item.percentage * 100)}%
                </span>
                <div
                  className="bookmark-page-list-item-link"
                  onClick={() => {
                    this.handleRedirect(
                      item.bookKey,
                      item.cfi,
                      item.percentage
                    );
                  }}
                >
                  <span className="bookmark-page-list-item-link-text">
                    点击跳转
                  </span>
                </div>
              </li>
            ))}
          </ul>
          {bookmarkObj[item.key].length > 3 ? (
            <div
              className="bookmark-show-more"
              onClick={() => {
                this.handlePopup(index);
              }}
              style={isShowMore ? { display: "none" } : {}}
            >
              显示更多
            </div>
          ) : null}
        </li>
      );
    };
    const renderBookmarkPage = () => {
      return bookArr.map((item, index) => {
        return (
          <div key={index}>
            {renderBookmarkPageItem(item, index, false)}
            {this.state.renderIndex === index ? (
              <div className="bookmark-show-more-container">
                {renderBookmarkPageItem(item, index, true)}
                <span
                  className="icon-close"
                  onClick={() => {
                    this.handleClose();
                  }}
                ></span>
              </div>
            ) : null}
          </div>
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
    // state: state,
    // currentBook: state.book.currentBook,
    // currentEpub: state.book.currentEpub,
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
