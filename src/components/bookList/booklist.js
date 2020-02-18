import React, { Component } from "react";
import "./booklist.css";
import { BookData } from "../../service/booklist.data";

import Book from "../book/book";

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log("gasgsakjgslg");
    const renderBookList = () => {
      return this.props.books.map((item, index) => {
        return (
          <Book
            className="book"
            key={item.key}
            book={item}
            bookCover={BookData[index].cover}
            handleEdit={this.props.handleEdit}
            handleDelete={this.props.handleDelete}
            handleReading={this.props.handleReading}
            handleReadingBook={this.props.handleReadingBook}
            theme={this.props.theme}
          />
        );
      });
    };
    return <div className="book-list-container">{renderBookList()}</div>;
  }
}

export default BookList;
