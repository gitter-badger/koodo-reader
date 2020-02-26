import React, { Component } from "react";
import "./booklist.css";
import { BookData } from "../../utils/booklist.data";
import Book from "../book/book";
import BookItem from "../bookItem/bookItem";
import { connect } from "react-redux";
import RecordRecent from "../../utils/recordRecent";
import ShelfUtil from "../../utils/shelfUtil";

// @connect(state => state.book)
// @connect(state => state.manager)
class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: this.props.books,
      covers: this.props.covers,
      shelfIndex: this.props.shelfIndex,
      isList: false,
      isSearch: this.props.isSearch,
      searchBooks: this.props.searchBooks
    };
  }
  UNSAFE_componentWillReceiveProps = nextProps => {
    // console.log(nextProps);
    this.setState({
      books: nextProps.books,
      covers: nextProps.covers,
      shelfIndex: nextProps.shelfIndex,
      isSearch: nextProps.isSearch,
      searchBooks: nextProps.searchBooks
    });
  };
  handleRecent = items => {
    let recentArr = [];
    for (let i in RecordRecent.getRecent()) {
      recentArr.push(RecordRecent.getRecent()[i].bookKey);
    }
    console.log(items);
    // RecordRecent.getRecent();
    let recentItems = items.filter(item => {
      console.log(item.key, recentArr.indexOf(item.key));

      return recentArr.indexOf(item.key) > -1;
    });
    // console.log(recentBooks);
    return recentItems;
  };
  handleShelf(items, index) {
    let shelfTitle = Object.keys(ShelfUtil.getShelf());
    console.log(shelfTitle, index, "shelfTitle");
    let currentShelfTitle = shelfTitle[index + 1];
    let currentShelfList = ShelfUtil.getShelf()[currentShelfTitle];
    console.log(currentShelfList);
    let shelfItems = items.filter(item => {
      console.log(item.key, currentShelfList.indexOf(item.key));

      return currentShelfList.indexOf(item.key) > -1;
    });
    // console.log(recentBooks);
    return shelfItems;
  }
  handleChange = mode => {
    this.setState({ isList: mode });
  };
  handleSearch = (items, arr) => {
    let itemArr = [];
    arr.forEach(item => {
      itemArr.push(items[item]);
    });
    return itemArr;
  };
  render() {
    const renderBookList = () => {
      let books =
        this.props.mode === "recent"
          ? this.handleRecent(this.state.books)
          : this.state.shelfIndex !== null
          ? this.handleShelf(this.state.books, this.state.shelfIndex)
          : this.state.isSearch
          ? this.handleSearch(this.state.books, this.props.searchBooks)
          : this.props.books;
      // console.log(this.props.covers);
      let covers =
        this.props.mode === "recent"
          ? this.handleRecent(this.state.covers)
          : this.state.shelfIndex !== null
          ? this.handleShelf(this.state.covers, this.state.shelfIndex)
          : this.state.isSearch
          ? this.handleSearch(this.state.covers, this.props.searchBooks)
          : this.props.covers;
      return books.map((item, index) => {
        // console.log(covers, "djhdhdfh");
        return this.state.isList ? (
          <BookItem
            key={item.key}
            book={item}
            epub={this.props.epubs === null ? {} : this.props.epubs[index]}
            bookCover={
              // BookData[index].cover
              covers === null ||
              covers[index] === null ||
              covers[index] === undefined
                ? BookData[index].cover
                : covers[index].url
            }
          />
        ) : (
          <Book
            key={item.key}
            book={item}
            epub={this.props.epubs === null ? {} : this.props.epubs[index]}
            bookCover={
              // BookData[index].cover
              covers === null ||
              covers[index] === null ||
              covers[index] === undefined
                ? BookData[index].cover
                : covers[index].url
            }
          />
        );
      });
    };
    return (
      <div className="book-list-container">
        <div className="book-list-view">
          <div
            className="card-list-mode"
            onClick={() => {
              this.handleChange(false);
            }}
            style={this.state.isList ? { color: "rgba(75,75,75,0.5)" } : {}}
          >
            <span className="icon-grid"></span> 卡片模式
          </div>
          <div
            className="list-view-mode"
            onClick={() => {
              this.handleChange(true);
            }}
            style={this.state.isList ? {} : { color: "rgba(75,75,75,0.5)" }}
          >
            <span className="icon-list"></span> 列表模式
          </div>
        </div>
        <div className="book-list-item-box">{renderBookList()}</div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    books: state.manager.books,
    covers: state.manager.covers,
    epubs: state.manager.epubs,
    mode: state.sidebar.mode,
    shelfIndex: state.sidebar.shelfIndex,
    searchBooks: state.manager.searchBooks,
    isSearch: state.manager.isSearch
  };
};
BookList = connect(mapStateToProps)(BookList);
export default BookList;
