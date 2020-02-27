import React, { Component } from "react";
import "./header.css";
import BookModel from "../../model/Book";
import { connect } from "react-redux";
import localforage from "localforage";
import {
  handleFetchBooks,
  handleSearchBooks,
  handleSearch,
  handleSort,
  handleSortCode,
  handleSortDisplay,
  handleMessageBox,
  handleMessage
} from "../../redux/manager.redux";

import OtherUtil from "../../utils/otherUtil";
// @connect(state => state.manager)
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearch: this.props.isSearch,
      isSort: this.props.isSort,
      sortCode: this.props.sortCode,
      isSortDisplay: this.props.isSortDisplay
    };
    this.handleChange = this.handleChange.bind(this);
  }
  UNSAFE_componentWillReceiveProps = nextProps => {
    // console.log(nextProps);
    this.setState({
      isSearch: nextProps.isSearch,
      isSort: nextProps.isSort,
      isSortDisplay: nextProps.isSortDisplay,
      sortCode: nextProps.sortCode
    });
  };
  handleAddBook(book) {
    let bookArr = this.props.books;
    console.log(bookArr, "bookArr");
    if (bookArr == null) {
      bookArr = [];
    }
    bookArr.push(book);
    console.log(bookArr, "sghasfkh");
    localforage.setItem("books", bookArr).then(() => {
      console.log("hadfhafh");
      this.props.handleFetchBooks();
    });
    this.props.handleMessage("添加成功");
    this.props.handleMessageBox(true);
  }

  handleMouse = () => {
    let results = OtherUtil.MouseSearch(this.props.books);
    this.props.handleSearchBooks(results);
    this.props.handleSearch(true);
  };
  handleKey = event => {
    let results = OtherUtil.KeySearch(event, this.props.books);
    // console.log(results, "resultes");
    if (results !== undefined) {
      this.props.handleSearchBooks(results);
      this.props.handleSearch(true);
    }
  };

  handleCancel = () => {
    this.props.handleSearch(false);
    document.querySelector(".header-search-box").value = "";
  };
  handleChange(event) {
    event.preventDefault();
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = e => {
      // console.log(window.ePub);
      const epub = window.ePub({ bookPath: e.target.result });
      epub.getMetadata().then(metadata => {
        let name, author, content, description, book;
        [name, author, content, description] = [
          metadata.bookTitle,
          metadata.creator,
          metadata.description,
          e.target.result
        ];
        book = new BookModel(name, author, content, description);
        this.handleAddBook(book);
      });
    };
  }
  handleSortBooks = () => {
    console.log(this.state.isSortDisplay, "ahdgslahg");
    if (this.state.isSortDisplay) {
      this.props.handleSortDisplay(false);
    } else {
      this.props.handleSortDisplay(true);
    }

    // this.props.handleSortDisplay(!this.state.isSortDisplay);
    // console.log(this.state.isSortDisplay);
  };
  render() {
    // const classes = this.props.classes;

    return (
      <div className="header">
        <input
          type="text"
          placeholder="搜索我的书库"
          className="header-search-box header-search-container"
          onKeyDown={event => {
            this.handleKey(event);
          }}
        />
        {this.props.isSearch ? (
          <span
            className="header-search-text"
            onClick={() => {
              this.handleCancel();
            }}
          >
            取消
          </span>
        ) : (
          <span
            className="icon-search header-search-icon"
            onClick={() => {
              this.handleMouse();
            }}
          ></span>
        )}
        <div
          className="header-sort-container"
          onClick={() => {
            this.handleSortBooks();
          }}
        >
          <span className="header-sort-text">排序</span>
          <span className="icon-sort header-sort-icon"></span>
        </div>
        {this.state.isSort}
        <div className="only-local-container">
          <span className="only-local-text">只显示本地图书</span>
          <div className="only-local-icon">
            <div className="only-local-slider"></div>
          </div>
        </div>

        <div className="import-from-local">
          从本地导入
          <input
            type="file"
            id="import-book-box"
            accept="application/epub+zip"
            className="import-book-box"
            name="file"
            multiple="multiple"
            onChange={this.handleChange}
          />
        </div>

        <div className="import-from-cloud">从云端导入</div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    books: state.manager.books,
    isSearch: state.manager.isSearch,
    isSortDisplay: state.manager.isSortDisplay
  };
};
const actionCreator = {
  handleFetchBooks,
  handleSearchBooks,
  handleSearch,
  handleSort,
  handleSortCode,
  handleSortDisplay,
  handleMessageBox,
  handleMessage
};
Header = connect(mapStateToProps, actionCreator)(Header);
export default Header;
