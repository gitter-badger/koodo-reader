import React, { Component } from "react";
import "./header.css";
import Book from "../../model/Book";
import PropTypes from "prop-types";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
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
        book = new Book(name, author, content, description);
        this.props.handleAddBook(book);
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
// Header.propTypes = {
//   classes: PropTypes.object.isRequired
// };
export default Header;
