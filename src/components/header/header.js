import React, { Component } from "react";
import "./header.css";
import { connect } from "react-redux";
import SearchBox from "../searchBox/searchBox";
import ImportLocal from "../importLocal/importLocal";
import {
  handleFetchBooks,
  handleSort,
  handleSortCode,
  handleSortDisplay,
  handleMessageBox,
  handleMessage
} from "../../redux/manager.redux";
import { handleChoose } from "../../redux/chooseDrive.redux";
// @connect(state => state.manager)
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSort: this.props.isSort,
      sortCode: this.props.sortCode,
      isSortDisplay: this.props.isSortDisplay
      // md5: null
    };
  }
  UNSAFE_componentWillReceiveProps = nextProps => {
    // console.log(nextProps);
    this.setState({
      isSort: nextProps.isSort,
      isSortDisplay: nextProps.isSortDisplay,
      sortCode: nextProps.sortCode
    });
  };

  handleSortBooks = () => {
    console.log(this.state.isSortDisplay, "ahdgslahg");
    if (this.state.isSortDisplay) {
      this.props.handleSortDisplay(false);
    } else {
      this.props.handleSortDisplay(true);
    }

    // this.props.handleSortDisplay(!this.state.isSortDisplay);
    // console.log(this.state.isSortDisplay);
  };
  handleChoose = () => {
    this.props.handleChoose(true);
  };
  render() {
    // const classes = this.props.classes;

    return (
      <div className="header">
        <SearchBox />
        <div
          className="header-sort-container"
          onClick={() => {
            this.handleSortBooks();
          }}
        >
          <span className="header-sort-text">排序</span>
          <span className="icon-sort header-sort-icon"></span>
        </div>
        {this.state.isSort}
        <div className="only-local-container">
          <span className="only-local-text">只显示本地图书</span>
          <div className="only-local-icon">
            <div className="only-local-slider"></div>
          </div>
        </div>
        <ImportLocal />

        <div
          className="import-from-cloud"
          onClick={() => {
            this.handleChoose();
          }}
        >
          从云端导入
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    books: state.manager.books,
    isSearch: state.manager.isSearch,
    isSortDisplay: state.manager.isSortDisplay
  };
};
const actionCreator = {
  handleFetchBooks,
  handleSort,
  handleSortCode,
  handleSortDisplay,
  handleMessageBox,
  handleMessage,
  handleChoose
};
Header = connect(mapStateToProps, actionCreator)(Header);
export default Header;
