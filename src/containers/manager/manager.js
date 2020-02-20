import React, { Component } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Header from "../../components/header/header";
import BookList from "../../components/bookList/booklist";
import { connect } from "react-redux";
import { handleFetchBooks } from "../../redux/manager.redux";
// import {
//   handleNotes,
//   handleBookmarks,
//   handleDigests,
//   handleFetchNotes,
//   handleFetchBookmarks,
//   handleFetchDigests
// } from "../../redux/reader.redux";
import "./manager.css";
// @connect(state => state.manager, { handleFetchBooks })
// @connect(state => state.reader, {
//   handleNotes,
//   handleBookmarks,
//   handleDigests,
//   handleFetchNotes,
//   handleFetchBookmarks,
//   handleFetchDigests
// })
class Manager extends Component {
  //从indexdb里读取书籍
  componentWillMount() {
    this.props.handleFetchBooks();
    // this.props.handlFetchBookmarks();
    // this.props.handleFetchDigests();
    // this.props.handleFetchNotes();
  }
  componentDidMount() {}

  render() {
    // console.log(this.props.books === [], this.props.books, "sfhafhh");
    return (
      <div className="manager">
        <Sidebar />
        <Header />

        {this.props.books === null ? null : <BookList />}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { books: state.manager.books, isReading: state.book.isReading };
};
const actionCreator = {
  handleFetchBooks
};
Manager = connect(mapStateToProps, actionCreator)(Manager);
export default Manager;
