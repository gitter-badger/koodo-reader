import React, { Component } from "react";
import { connect } from "react-redux";
import {
  handleEditDialog,
  handleDeleteDialog,
  handleAddToShelfDialog,
  handleReadingState,
  handleReadingBook,
  handleReadingEpub
} from "../../redux/book.redux";

import "./book.css";
// import Config from "../../utils/Config";

// @connect(state => state.book, {
//   handleEditDialog,
//   handleDeleteDialog,
//   handleAddToShelfDialog,
//   handleReadingState,
//   handleReadingBook,
//   handleReadingEpub,
//   handleRedirect
// })
class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleOpenBook = this.handleOpenBook.bind(this);
  }

  handleOpenBook() {
    this.props.handleReadingBook(this.props.book);
    // this.props.epub.locations.generate().then(() => {
    this.props.handleReadingEpub(this.props.epub);
    // });
    // this.props.handleReadingEpub(this.props.epub);
    this.props.handleReadingState(true);
    // console.log("asfhfdhfh");
    // this.props.handleRedirect();
    // console.log(this.props.book, "hello");
  }

  render() {
    // console.log(this.props.isReading, "agsffh");
    return (
      <div className="book-list-item">
        <img
          className="book-item-cover"
          src={this.props.bookCover}
          alt=""
          onClick={() => {
            this.handleOpenBook();
          }}
        />
        <div className="book-item-config">
          <span
            className="icon-add icon"
            onClick={this.props.handleAddToShelfDialog}
          ></span>
          <span
            className="icon-delete icon"
            onClick={this.props.handleDeleteDialog}
          ></span>
          <span
            className="icon-edit icon"
            onClick={this.props.handleEditDialog}
          ></span>
        </div>
        <p className="book-item-title">{this.props.book.name}</p>
      </div>
    );
  }
}
// const mapStateToProps = state => {
//   return { isReading: state };
// };
// const mapDispatchToProps = dispatch => ({
//   handleReadingState: state => dispatch(handleReadingState(state)),
//   handleReadingBook: book => dispatch(handleReadingBook(book)),
//   handleReadingEpub: epub => dispatch(handleReadingEpub(epub))
// });
const mapStateToProps = state => {
  return { isReading: state.book.isReading };
};
const actionCreator = {
  handleReadingState,
  handleReadingBook,
  handleReadingEpub
};
Book = connect(mapStateToProps, actionCreator)(Book);
export default Book;
