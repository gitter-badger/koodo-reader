import React, { Component } from "react";
import "./bookmarkList.css";
class BookmarkList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="book-bookmark-container">
        <ul className="book-bookmark">
          <li className="book-bookmark-list">
            <p className="book-bookmark-digest">
              “是的。”悉达多道，“我领悟到这个道理后，认出我的生活也是一条河。这条河用幻象，而非现实，隔开少年悉达多、成年悉达多和老年悉达多。悉达多的前世并非过去，死亡和重归梵天亦并非未来...
            </p>
            <span className="book-bookmark-index">第一章</span>
            <span className="book-bookmark-name">孙悟空大闹天宫</span>
            <span className="book-bookmark-progress">12%</span>
            <div className="book-bookmark-link">点击跳转</div>
          </li>
        </ul>
      </div>
    );
  }
}

export default BookmarkList;
