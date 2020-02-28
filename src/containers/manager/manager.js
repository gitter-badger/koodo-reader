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
import SortDialog from "../../components/sortDialog/sortDialog";
import MessageBox from "../../components/messageBox/messageBox";
import LoadingPage from "../../components/loadingPage/loadingPage";
import { connect } from "react-redux";
import {
  handleFetchBooks,
  handleFetchSortCode,
  handleFetchList,
  handleList,
  handleMessageBox
} from "../../redux/manager.redux";
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
      covers: this.props.covers,
      bookmarks: this.props.bookmarks,
      isOpenEditDialog: this.props.isOpenEditDialog,
      isOpenDeleteDialog: this.props.isOpenDeleteDialog,
      isOpenAddDialog: this.props.isOpenAddDialog,
      isSort: this.props.isSort,
      isSortDisplay: this.props.isSortDisplay,
      isMessage: false
    };
  }
  //从indexdb里读取书籍
  UNSAFE_componentWillMount() {
    this.props.handleFetchBooks();
    this.props.handleFetchNotes();
    this.props.handleFetchDigests();
    this.props.handleFetchBookmarks();
    this.props.handleFetchHighlighters();
    this.props.handleFetchSortCode();
    this.props.handleList(localStorage.getItem("isList") || false);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    this.setState({
      mode: nextProps.mode,
      shelfIndex: nextProps.shelfIndex,
      books: nextProps.books,
      notes: nextProps.notes,
      covers: nextProps.covers,
      digests: nextProps.digests,
      bookmarks: nextProps.bookmarks,
      isOpenDeleteDialog: nextProps.isOpenDeleteDialog,
      isOpenEditDialog: nextProps.isOpenEditDialog,
      isOpenAddDialog: nextProps.isOpenAddDialog,
      isSort: nextProps.isSort,
      isSortDisplay: nextProps.isSortDisplay,
      isMessage: nextProps.isMessage
    });
    if (nextProps.isMessage) {
      setTimeout(() => {
        this.props.handleMessageBox(false);
        this.setState({ isMessage: false });
      }, 2000);
    }
  }
  componentWillUnmount() {
  }

  render() {
    let { mode, notes, digests, bookmarks, covers, books, epubs } = this.state;
    console.log(this.state.isMessage, "message");
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
        {this.state.isMessage ? <MessageBox /> : null}
        {this.state.isSortDisplay ? <SortDialog /> : null}

        {covers !== null ? (
          mode === "home" || mode === "recent" || mode === "shelf" ? (
            <BookList />
          ) : bookmarks !== null && mode === "bookmark" ? (
            <BookmarkPage />
          ) : notes !== null && notes !== undefined && mode === "note" ? (
            <NoteList />
          ) : digests !== null && mode === "digest" ? (
            <DigestList />
          ) : (
            <div>hello</div>
          )
        ) : (
          <LoadingPage />
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    books: state.manager.books,
    covers: state.manager.covers,
    notes: state.reader.notes,
    digests: state.reader.digests,
    bookmarks: state.reader.bookmarks,
    isReading: state.book.isReading,
    mode: state.sidebar.mode,
    shelfIndex: state.sidebar.shelfIndex,
    isOpenEditDialog: state.book.isOpenEditDialog,
    isOpenDeleteDialog: state.book.isOpenDeleteDialog,
    isOpenAddDialog: state.book.isOpenAddDialog,
    isSort: state.manager.isSort,
    isSortDisplay: state.manager.isSortDisplay,
    isMessage: state.manager.isMessage
  };
};
const actionCreator = {
  handleFetchBooks,
  handleFetchNotes,
  handleFetchDigests,
  handleFetchBookmarks,
  handleFetchHighlighters,
  handleFetchSortCode,
  handleFetchList,
  handleList,
  handleMessageBox
};
Manager = connect(mapStateToProps, actionCreator)(Manager);
export default Manager;
