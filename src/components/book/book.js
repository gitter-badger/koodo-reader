import React, { Component } from "react";
import PropTypes from "prop-types";
import "./book.css";
import ReaderConfig from "../../utils/readerConfig";

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleEditBook = this.handleEditBook.bind(this);
    this.handleDeleteBook = this.handleDeleteBook.bind(this);
    this.handleOpenBook = this.handleOpenBook.bind(this);
  }
  handleEditBook() {
    console.log("clicked edit button");
    this.props.handleEdit(this.props.book);
  }

  handleDeleteBook() {
    console.log("clicked delete button");
    this.props.handleDelete(this.props.book.key);
  }

  handleOpenBook() {
    console.log(this.props.book);
    this.props.handleReadingBook(this.props.book);
    this.props.handleReading(true);
  }

  render() {
    console.log("afgafhf");
    return (
      <div className="book-list-item">
        <img
          className="book-item-cover"
          src={this.props.bookCover}
          alt=""
          onClick={this.handleOpenBook}
        />
        <div className="book-item-config">
          <span className="icon-add icon"></span>
          <span
            className="icon-delete icon"
            onClick={this.handleDeleteBook}
          ></span>
          <span className="icon-edit icon" onClick={this.handleEditBook}></span>
        </div>
        <p className="book-item-title">{this.props.book.name}</p>
      </div>
    );
  }
}

export default Book;
