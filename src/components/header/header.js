import React, { Component } from "react";
import "./header.css";
import BookModel from "../../model/Book";
import { connect } from "react-redux";
import localforage from "localforage";
import {
  handleFetchBooks,
  handleSearchBooks,
  handleSearch
} from "../../redux/manager.redux";
// @connect(state => state.manager)
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { isSearch: this.props.isSearch };
    this.handleChange = this.handleChange.bind(this);
  }
  UNSAFE_componentWillReceiveProps = nextProps => {
    // console.log(nextProps);
    this.setState({
      isSearch: nextProps.isSearch
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
  }
  fuzzyQuery = (list, keyWord) => {
    var arr = [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].match(keyWord) != null) {
        arr.push(i);
      }
    }
    return arr;
  };
  MergeArray = (arr1, arr2) => {
    var _arr = [];
    for (let i = 0; i < arr1.length; i++) {
      _arr.push(arr1[i]);
    }
    for (let i = 0; i < arr2.length; i++) {
      var flag = true;
      for (let j = 0; j < arr1.length; j++) {
        if (arr2[i] === arr1[j]) {
          flag = false;
          break;
        }
      }
      if (flag) {
        _arr.push(arr2[i]);
      }
    }
    return _arr;
  };
  handleSearch = (event, keyMode) => {
    if (keyMode === "key") {
      if (event && event.keyCode === 13) {
        let bookNameArr = [];
        let AuthorNameArr = [];
        this.props.books.forEach(item => {
          bookNameArr.push(item.name);
          AuthorNameArr.push(item.author);
        });
        let bookResults = this.fuzzyQuery(bookNameArr, event.target.value);
        let authorResults = this.fuzzyQuery(AuthorNameArr, event.target.value);
        let results = this.MergeArray(bookResults, authorResults);
        console.log(results.sort());

        this.props.handleSearchBooks(results);
        this.props.handleSearch(true);
      }
    } else if (keyMode === "mouse") {
      let keyword = document.querySelector(".header-search-box").value;
      let bookNameArr = [];
      let AuthorNameArr = [];
      this.props.books.forEach(item => {
        bookNameArr.push(item.name);
        AuthorNameArr.push(item.author);
      });
      let bookResults = this.fuzzyQuery(bookNameArr, keyword);
      let authorResults = this.fuzzyQuery(AuthorNameArr, keyword);
      let results = this.MergeArray(bookResults, authorResults);
      console.log(results.sort());

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

    reader.onerror = () => {
      alert("Σ(っ °Д °;)っ Some error occurred, please try again!");
    };
  }
  render() {
    // const classes = this.props.classes;

    return (
      <div className="header">
        <input
          type="text"
          placeholder="搜索我的书库"
          className="header-search-box header-search-container"
          onKeyDown={event => {
            this.handleSearch(event, "key");
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
              this.handleSearch(null, "mouse");
            }}
          ></span>
        )}
        <div className="header-sort-container">
          <span className="header-sort-text">排序</span>
          <span className="icon-sort header-sort-icon"></span>
        </div>
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
  return { books: state.manager.books, isSearch: state.manager.isSearch };
};
const actionCreator = { handleFetchBooks, handleSearchBooks, handleSearch };
Header = connect(mapStateToProps, actionCreator)(Header);
export default Header;
