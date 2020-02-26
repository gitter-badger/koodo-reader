import React, { Component } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Header from "../../components/header/header";
import BookList from "../../components/bookList/booklist";
import BookmarkPage from "../../components/bookmarkPage/bookmarkPage";
import NoteList from "../../components/noteList/noteList";
import DigestList from "../../components/digestList/digestList";
import DeleteDialog from "../../components/deleteDialog/deleteDialog";
import EditDialog from "../../components/editDialog/editDialog";
import AddDialog from "../../components/addDialog/addDialog";
import { connect } from "react-redux";
import { handleFetchBooks } from "../../redux/manager.redux";
import {
  handleFetchNotes,
  handleFetchDigests,
  handleFetchBookmarks,
  handleFetchHighlighters
} from "../../redux/reader.redux";
import "./manager.css";

class Manager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: this.props.mode,
      shelfIndex: this.props.shelfIndex,
      books: this.props.books,
      notes: this.props.notes,
      digests: this.props.digests,
      bookmarks: this.props.bookmarks,
      // dialog: null
      isOpenEditDialog: this.props.isOpenEditDialog,
      isOpenDeleteDialog: this.props.isOpenDeleteDialog,
      isOpenAddDialog: this.props.isOpenAddDialog
    };
  }
  //从indexdb里读取书籍
  UNSAFE_componentWillMount() {
    this.props.handleFetchBooks();
    this.props.handleFetchNotes();
    this.props.handleFetchDigests();
    this.props.handleFetchBookmarks();
    this.props.handleFetchHighlighters();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({
      mode: nextProps.mode,
      shelfIndex: nextProps.shelfIndex,
      books: nextProps.books,
      notes: nextProps.notes,
      digests: nextProps.digests,
      bookmarks: nextProps.bookmarks,
      isOpenDeleteDialog: nextProps.isOpenDeleteDialog,
      isOpenEditDialog: nextProps.isOpenEditDialog,
      isOpenAddDialog: nextProps.isOpenAddDialog
    });
    // console.log(this.state.isOpenDeleteDialog);
  }
  componentDidMount() {}

  render() {
    let { mode, books, notes, digests, bookmarks } = this.state;
    console.log(mode, "manager");
    // console.log(this.state.isOpenDeleteDialog, "hajagjf");
    // console.log(this.props.books === [], this.props.books, "sfhafhh");
    // console.log(mode, books, notes, digests, bookmarks);
    return (
      <div className="manager">
        <Sidebar />
        <Header />
        <div className="manager-dialog-container">
          {this.state.isOpenDeleteDialog ? (
            <DeleteDialog />
          ) : this.state.isOpenEditDialog ? (
            <EditDialog />
          ) : this.state.isOpenAddDialog ? (
            <AddDialog />
          ) : null}
        </div>

        {books !== null &&
        (mode === "home" || mode === "recent" || mode === "shelf") ? (
          <BookList />
        ) : bookmarks !== null && mode === "bookmark" ? (
          <BookmarkPage />
        ) : notes !== null && mode === "note" ? (
          <NoteList />
        ) : digests !== null && mode === "digest" ? (
          <DigestList />
        ) : (
          <div>hello</div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    books: state.manager.books,
    notes: state.reader.notes,
    digests: state.reader.digests,
    bookmarks: state.reader.bookmarks,
    isReading: state.book.isReading,
    mode: state.sidebar.mode,
    shelfIndex: state.sidebar.shelfIndex,
    isOpenEditDialog: state.book.isOpenEditDialog,
    isOpenDeleteDialog: state.book.isOpenDeleteDialog,
    isOpenAddDialog: state.book.isOpenAddDialog
  };
};
const actionCreator = {
  handleFetchBooks,
  handleFetchNotes,
  handleFetchDigests,
  handleFetchBookmarks,
  handleFetchHighlighters
};
Manager = connect(mapStateToProps, actionCreator)(Manager);
export default Manager;
