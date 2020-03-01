import React, { Component } from "react";
import { connect } from "react-redux";
import "./deleteDialog.css";
import {
  handleFetchBooks,
  handleMessageBox,
  handleMessage
} from "../../redux/manager.redux";
import { handleDeleteDialog } from "../../redux/book.redux";
import {
  handleFetchBookmarks,
  handleFetchNotes,
  handleFetchDigests,
  handleFetchHighlighters
} from "../../redux/reader.redux";
import DeleteUtil from "../../utils/deleteUtil";
import localforage from "localforage";
import ShelfUtil from "../../utils/shelfUtil";
class DeleteDialog extends Component {
  constructor(props) {
    super(props);
    this.state = { isCheck: false };
  }
  handleCancel = () => {
    this.props.handleDeleteDialog(false);
  };
  handleDeleteOther = () => {
    this.props.bookmarks !== null &&
      localforage
        .setItem(
          "bookmarks",
          DeleteUtil.deleteBookmarks(
            this.props.bookmarks,
            this.props.currentBook.key
          )
        )
        .then(() => {
          this.props.handleFetchBookmarks();
        });
    console.log(this.props.notes, "notes");

    this.props.notes !== null &&
      localforage
        .setItem(
          "notes",
          DeleteUtil.deleteNotes(this.props.notes, this.props.currentBook.key)
        )
        .then(() => {
          this.props.handleFetchNotes();
        });
    console.log(this.props.digests, "digests");
    this.props.digests !== null &&
      localforage
        .setItem(
          "digests",
          DeleteUtil.deleteDigests(
            this.props.digests,
            this.props.currentBook.key
          )
        )
        .then(() => {
          this.props.handleFetchDigests();
        });
    // console.log(this.props.highlighters, "highlighters");
    this.props.highlighters !== null &&
      localforage
        .setItem(
          "highlighters",
          DeleteUtil.deleteHighlighters(
            this.props.highlighters,
            this.props.currentBook.key
          )
        )
        .then(() => {
          this.props.handleFetchHighlighters();
        });
  };
  handleComfirm = () => {
    if (this.props.mode === "shelf") {
      ShelfUtil.clearShelf(this.props.shelfIndex, this.props.currentBook.key);
      this.props.handleDeleteDialog(false);
    } else {
      this.props.books !== null &&
        localforage
          .setItem(
            "books",
            DeleteUtil.deleteBook(this.props.books, this.props.currentBook.key)
          )
          .then(() => {
            this.props.handleDeleteDialog(false);
            this.props.handleFetchBooks();
          });
      console.log(this.props.bookmarks, "bookmarks");
      ShelfUtil.deletefromAllShelf(this.props.currentBook.key);
      if (this.state.isCheck) {
        this.handleDeleteOther();
      }
    }

    this.props.handleMessage("删除成功");
    this.props.handleMessageBox(true);
  };
  handleCheck = mode => {
    this.setState({ isCheck: mode });
  };

  render() {
    return (
      <div className="delete-dialog-container">
        {this.props.mode !== "shelf" ? (
          <div className="delete-dialog-title">是否删除本图书</div>
        ) : (
          <div className="delete-dialog-title">从书架删除本书</div>
        )}

        <div className="delete-dialog-book">
          <div className="delete-dialog-book-title">
            {this.props.currentBook.name}
          </div>
        </div>
        {this.props.mode !== "shelf" ? (
          <div className="delete-dialog-other-option">
            同时删除本书所有的书签，笔记，书摘
          </div>
        ) : (
          <div className="delete-dialog-other-option">
            仅从此书架中删除本书，原图书不受影响
          </div>
        )}

        {this.props.mode !== "shelf" &&
          (this.state.isCheck ? (
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
          ))}
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
    highlighters: state.reader.highlighters,
    mode: state.sidebar.mode,
    shelfIndex: state.sidebar.shelfIndex
  };
};
const actionCreator = {
  handleFetchBooks,
  handleDeleteDialog,
  handleFetchBookmarks,
  handleFetchNotes,
  handleFetchDigests,
  handleFetchHighlighters,
  handleMessageBox,
  handleMessage
};
DeleteDialog = connect(mapStateToProps, actionCreator)(DeleteDialog);
export default DeleteDialog;
