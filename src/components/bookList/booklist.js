import React, { Component } from "react";
import "./booklist.css";
import { BookData } from "../../utils/booklist.data";
import Book from "../book/book";
import { connect } from "react-redux";

// @connect(state => state.book)
// @connect(state => state.manager)
class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    // console.log(this.props.covers, "sadgsghs");
    // console.log(this.props.epubs, "sadgsghs");
    // console.log(this.props.books, "afhafhf");
    // console.log(this.props.epubs, "fhadggj");
    // console.log(this.props.covers, "fhaghhkhkdggj");
    const renderBookList = () => {
      return this.props.books.map((item, index) => {
        return (
          <Book
            key={item.key}
            book={item}
            epub={this.props.epubs === null ? {} : this.props.epubs[index]}
            bookCover={
              // BookData[index].cover
              this.props.covers === null
                ? BookData[index].cover
                : this.props.covers[index]
            }
          />
        );
      });
    };
    return <div className="book-list-container">{renderBookList()}</div>;
  }
}
const mapStateToProps = state => {
  return {
    books: state.manager.books,
    covers: state.manager.covers,
    epubs: state.manager.epubs
  };
};
BookList = connect(mapStateToProps)(BookList);
export default BookList;
