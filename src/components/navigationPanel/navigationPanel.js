import React, { Component } from "react";
import "./navigationPanel.css";
import { connect } from "react-redux";
import ContentList from "../contentList/contentList";
import BookmarkList from "../bookmarkList/boomarkList";
// @connect(state => state.book)
class NavigationPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { isContentShow: true, chapters: [], cover: "" };
    this.epub = null;
  }
  componentDidMount() {
    // console.log(this.props.currentBook.cover, "fhadhgdah");
    this.props.currentEpub.coverUrl().then(url => {
      // console.log(url, "url");
      this.setState({ cover: url });
    });
  }

  render() {
    return (
      <div className="navigation-panel">
        <div className="navigation-header">
          <img className="book-cover" src={this.state.cover} alt="" />
          <p className="book-title">{this.props.currentBook.name}</p>
          <p className="book-arthur">
            作者:{" "}
            {this.props.currentBook.arthur
              ? this.props.currentBook.arthur
              : "未知"}
          </p>
          <span className="reading-duration">用时: 37分钟</span>
          <input
            type="text"
            className="book-search-box"
            placeholder="    搜索全书"
          />
          <span className="icon-search book-search-icon"></span>

          <div className="navigation-navigation">
            <span className="book-content-title">目录</span>
            <span className="book-bookmark-title">书签</span>
          </div>
        </div>
        <div className="navigation-body">
          {this.state.isContentShow ? <ContentList /> : <BookmarkList />}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    currentEpub: state.book.currentEpub,
    currentBook: state.book.currentBook
  };
};
const actionCreator = {};
NavigationPanel = connect(mapStateToProps, actionCreator)(NavigationPanel);
export default NavigationPanel;
