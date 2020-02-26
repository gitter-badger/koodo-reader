import React, { Component } from "react";
import "./navigationPanel.css";
import { connect } from "react-redux";
import ContentList from "../contentList/contentList";
import BookmarkList from "../bookmarkList/boomarkList";
import { handleFetchBookmarks } from "../../redux/reader.redux";
import SearchPanel from "../searchPanel/searchPanel";
// @connect(state => state.book)
class NavigationPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isContentShow: true,
      chapters: [],
      cover: "",
      isSearch: false,
      searchList: null
    };
    this.epub = null;
    this.handleSearch = this.handleSearch.bind(this);
    this.doSearch = this.doSearch.bind(this);
  }
  componentDidMount() {
    // console.log(this.props.currentBook.cover, "fhadhgdah");
    this.props.currentEpub.coverUrl().then(url => {
      // console.log(url, "url");
      this.setState({ cover: url });
    });
    this.props.handleFetchBookmarks();
  }
  handleClick = state => {
    this.setState({ isContentShow: state });
  };
  handleSearch(event) {
    if (event && event.keyCode === 13) {
      let searchText = event.target.value;
      this.doSearch(searchText).then(result => {
        let searchList = result.map(item => {
          item.excerpt = item.excerpt.replace(
            searchText,
            `<span class="content-search-text">${searchText}</span>`
          );
          return item;
        });
        console.log(searchList, "fhadadgj");
        this.setState({ searchList });
      });
    }
  }
  doSearch(q) {
    let book = this.props.currentEpub;
    console.log(book.spine, "hajaja");
    return Promise.all(
      book.spine.map(item =>
        item
          .load(book.load.bind(book))
          .then(item.find.bind(item, q))
          .finally(item.unload.bind(item))
      )
    ).then(results => Promise.resolve([].concat.apply([], results)));
  }
  render() {
    return (
      <div className="navigation-panel">
        {this.state.isSearch ? (
          <SearchPanel searchList={this.state.searchList} />
        ) : (
          <React.Fragment>
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
                placeholder="搜索全书"
                onKeyDown={this.handleSearch}
              />
              <span className="icon-search book-search-icon"></span>

              <div className="navigation-navigation">
                <span
                  className="book-content-title"
                  onClick={() => {
                    this.handleClick(true);
                  }}
                  style={
                    this.state.isContentShow
                      ? { color: "rgba(112, 112, 112, 1)" }
                      : { color: "rgba(217, 217, 217, 1)" }
                  }
                >
                  目录
                </span>
                <span
                  className="book-bookmark-title"
                  style={
                    this.state.isContentShow
                      ? { color: "rgba(217, 217, 217, 1)" }
                      : { color: "rgba(112, 112, 112, 1)" }
                  }
                  onClick={() => {
                    this.handleClick(false);
                  }}
                >
                  书签
                </span>
              </div>
            </div>
            <div className="navigation-body">
              {this.state.isContentShow ? <ContentList /> : <BookmarkList />}
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    currentEpub: state.book.currentEpub,
    currentBook: state.book.currentBook,
    bookmarks: state.reader.bookmarks
  };
};
const actionCreator = { handleFetchBookmarks };
NavigationPanel = connect(mapStateToProps, actionCreator)(NavigationPanel);
export default NavigationPanel;
