import React, { Component } from "react";
import { connect } from "react-redux";
import "./deleteDialog.css";
import { handleFetchBooks } from "../../redux/manager.redux";
import { handleDeleteDialog } from "../../redux/book.redux";
import {
  handleFetchBookmarks,
  handleFetchNotes,
  handleFetchDigests,
  handleFetchHighlighters
} from "../../redux/reader.redux";
import DeleteUtil from "../../utils/deleteUtil";
import localforage from "localforage";
class DeleteDialog extends Component {
  constructor(props) {
    super(props);
    this.state = { isCheck: false };
  }
  handleCancel = () => {
    this.props.handleDeleteDialog(false);
  };
  handleComfirm = () => {
    let bookArr = DeleteUtil.deleteBook(
      this.props.books,
      this.props.currentBook.key
    );
    localforage.setItem("books", bookArr).then(() => {
      this.props.handleDeleteDialog(false);
      this.props.handleFetchBooks();
    });
    if (this.state.isCheck) {
      let bookmarkArr = DeleteUtil.deleteBookmarks(
        this.props.bookmarks,
        this.props.currentBook.key
      );
      localforage.setItem("bookmarks", bookmarkArr).then(() => {
        this.props.handleFetchBookmarks();
      });
      let noteArr = DeleteUtil.deleteNotes(
        this.props.bookmarks,
        this.props.currentBook.key
      );
      localforage.setItem("notes", noteArr).then(() => {
        this.props.handleFetchNotes();
      });
      console.log(this.props.digests, "digests");
      let digestArr = DeleteUtil.deleteDigests(
        this.props.digests,
        this.props.currentBook.key
      );
      localforage.setItem("digests", digestArr).then(() => {
        this.props.handleFetchDigests();
      });
      let highlighterArr = DeleteUtil.deleteDigests(
        this.props.highlighters,
        this.props.currentBook.key
      );
      localforage.setItem("highlighters", highlighterArr).then(() => {
        this.props.handleFetchHighlighters();
      });
    }
  };
  handleCheck = mode => {
    this.setState({ isCheck: mode });
  };
  render() {
    return (
      <div className="delete-dialog-container">
        <div className="delete-dialog-title">是否删除本图书</div>
        <div className="delete-dialog-book">
          <div className="delete-dialog-book-title">
            {this.props.currentBook.name}
          </div>
        </div>

        <div className="delete-dialog-other-option">
          同时删除本书所有的书签，笔记，书摘
        </div>
        {this.state.isCheck ? (
          <span
            className="icon-check"
            onClick={() => {
              this.handleCheck(false);
            }}
          ></span>
        ) : (
          <span
            className="delete-dialog-uncheck-icon"
            onClick={() => {
              this.handleCheck(true);
            }}
          ></span>
        )}
        <div
          className="delete-dialog-cancel"
          onClick={() => {
            this.handleCancel();
          }}
        >
          取消
        </div>
        <div
          className="delete-dialog-comfirm"
          onClick={() => {
            this.handleComfirm();
          }}
        >
          删除
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    books: state.manager.books,
    isOpenDeleteDialog: state.book.isOpenDeleteDialog,
    currentBook: state.book.currentBook,
    bookmarks: state.reader.bookmarks,
    notes: state.reader.notes,
    digests: state.reader.digests,
    highlighters: state.reader.hightlighters
  };
};
const actionCreator = {
  handleFetchBooks,
  handleDeleteDialog,
  handleFetchBookmarks,
  handleFetchNotes,
  handleFetchDigests,
  handleFetchHighlighters
};
DeleteDialog = connect(mapStateToProps, actionCreator)(DeleteDialog);
export default DeleteDialog;
