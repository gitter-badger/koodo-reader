import React, { Component } from "react";
import "./header.css";
import BookModel from "../../model/Book";
import { connect } from "react-redux";
import localforage from "localforage";
import { handleFetchBooks } from "../../redux/manager.redux";
// @connect(state => state.manager)
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }
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
        <div className="header-search-container">
          <input
            type="text"
            placeholder="   搜索我的书库"
            className="header-search-box"
          />
          <span className="icon-search header-search-icon"></span>
        </div>
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
  return { books: state.manager.books };
};
const actionCreator = { handleFetchBooks };
Header = connect(mapStateToProps, actionCreator)(Header);
export default Header;
