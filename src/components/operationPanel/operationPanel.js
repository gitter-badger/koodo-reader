import React, { Component } from "react";
import "./operationPanel.css";
import Bookmark from "../../model/Bookmark";
import { connect } from "react-redux";
import { handleBookmarks } from "../../redux/reader.redux";
import { handleReadingState } from "../../redux/book.redux";
import localforage from "localforage";
import RecordLocation from "../../utils/recordLocation";
// @connect(state => state.book, { handleReadingState })
// @connect(state => state.reader, { handleBookmarks })
class OperationPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFullScreen: false, // 是否进入全屏模式
      isBookmark: false // 是否进入全屏模式
    };
  }
  // 点击切换全屏按钮触发
  handleScreen() {
    !this.state.isFullScreen
      ? this.handleFullScreen()
      : this.handleExitFullScreen();
  }
  handleFullScreen() {
    let de = document.documentElement;

    if (de.requestFullscreen) {
      de.requestFullscreen();
    } else if (de.mozRequestFullScreen) {
      de.mozRequestFullScreen();
    } else if (de.webkitRequestFullscreen) {
      de.webkitRequestFullscreen();
    } else if (de.msRequestFullscreen) {
      de.msRequestFullscreen();
    }

    this.setState({ isFullScreen: true });
  }

  // 退出全屏模式
  handleExitFullScreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }

    this.setState({ isFullScreen: false });
  }
  handleAddBookmark() {
    let bookKey = this.props.currentBook.key;
    let epub = this.props.currentEpub;
    let cfi = epub.getCurrentLocationCfi();
    let firstVisibleNode = epub.renderer.findFirstVisible();
    let label = firstVisibleNode.textContent;
    label = label && label.trim();
    label = label || cfi;
    let bookmark = new Bookmark(bookKey, cfi, label);
    let bookmarkArr = this.props.bookmarks;
    console.log(this.props.bookmarks, "dhdhdfah");
    bookmarkArr.push(bookmark);
    this.props.handleBookmarks(bookmarkArr);
    localforage.setItem("bookmarks", bookmarkArr);
    // this.props.toggleMessage(true);
    this.setState({ isBookmark: true });
  }

  // 点击退出按钮的处理程序
  handleExit() {
    this.props.handleReadingState(false);
    let cfi = this.props.currentEpub.getCurrentLocationCfi();
    let locations = this.props.currentEpub.locations;
    let percentage = locations.percentageFromCfi(cfi);
    // console.log(percentage, "sahafhfh");
    console.log(percentage, "dgafhdafha");
    RecordLocation.recordCfi(this.props.currentBook.key, cfi, percentage);
  }

  render() {
    return (
      <div className="book-operation-panel">
        <div
          className="exit-reading-button"
          onClick={() => {
            this.handleExit();
          }}
        >
          <span className="icon-exit exit-reading-icon"></span>
          <span className="exit-reading-text">退出阅读</span>
        </div>
        <div
          className="add-bookmark-button"
          onClick={() => {
            this.handleAddBookmark();
          }}
        >
          <span className="icon-add add-bookmark-icon"></span>
          {!this.state.isBookmark ? (
            <span className="add-bookmark-text">添加书签</span>
          ) : (
            <span className="add-bookmark-text">取消书签</span>
          )}
        </div>
        <div
          className="enter-fullscreen-button"
          onClick={() => {
            this.handleScreen();
          }}
        >
          <span className="icon-fullscreen enter-fullscreen-icon"></span>
          {!this.state.isFullScreen ? (
            <span className="enter-fullscreen-text">进入全屏</span>
          ) : (
            <span className="enter-fullscreen-text">退出全屏</span>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    currentEpub: state.book.currentEpub,
    currentBook: state.book.currentBook,
    bookmarks: state.manager.bookmarks
  };
};
const actionCreator = { handleBookmarks, handleReadingState };
OperationPanel = connect(mapStateToProps, actionCreator)(OperationPanel);
export default OperationPanel;
