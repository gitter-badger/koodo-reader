import React, { Component } from "react";
import "./searchPanel.css";

class SearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const renderSearchResultList = () => {
      return this.props.results.map(item => {
        return (
          <li className="search-result-item">
            <p className="search-result-excerpt">
              “是的。”悉达多道，“我领悟到这个道理后，认出我的生活也是一条河。这条河用幻象，而非现实，隔开少年悉达多、成年悉达多和老年悉达多。悉达多的前世并非过去，死亡和重归梵天亦并非未来...
            </p>
          </li>
        );
      });
    };
    return (
      <div className="search-panel">
        <div className="search-input-container"></div>
        <input
          type="text"
          className="search-input-box"
          placeholder="搜索全书"
        />
        <span className="icon-search search-input-icon"></span>

        <ul className="search-result-list">
          <li className="search-result-item">
            <p className="search-result-excerpt">
              “是的。”悉达多道，“我领悟到这个道理后，认出我的生活也是一条河。这条河用幻象，而非现实，隔开少年悉达多、成年悉达多和老年悉达多。悉达多的前世并非过去，死亡和重归梵天亦并非未来...
            </p>
          </li>
        </ul>
      </div>
    );
  }
}

export default SearchPanel;
