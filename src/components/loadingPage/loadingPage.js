import React, { Component } from "react";
import "./loadingPage.css";
import { connect } from "react-redux";
class LoadingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const renderLoadingPage = () => {
      let arr = [];
      for (let i = 0; i < localStorage.getItem("totalBooks"); i++) {
        arr.push({});
      }
      return arr.map((item, index) => {
        return (
          <div className="loading-page-book" key={index}>
            <div
              className="loading-page-cover"
              style={{ opacity: `${(index % 8) * 0.2 + 0.2}` }}
            ></div>
          </div>
        );
      });
    };
    return <div className="loading-page-container">{renderLoadingPage()}</div>;
  }
}
const mapStateToProps = state => {
  return {
    books: state.manager.books
  };
};
const actionCreator = {};
LoadingPage = connect(mapStateToProps, actionCreator)(LoadingPage);
export default LoadingPage;
