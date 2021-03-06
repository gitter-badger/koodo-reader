//为空页面
import React, { Component } from "react";
import { connect } from "react-redux";
import "./emptyPage.css";
import { emptyList } from "../../utils/readerConfig";
class EmptyPage extends Component {
  constructor(props) {
    super(props);
    this.state = { mode: this.props.mode };
  }
  UNSAFE_componentWillReceiveProps = nextProps => {
    // console.log(nextProps);
    this.setState({
      mode: nextProps.mode
    });
  };
  render() {
    const renderEmptyList = () => {
      return emptyList.map(item => {
        return (
          <div
            className="empty-page-info-container"
            key={item.mode}
            style={
              this.state.mode === item.mode ? {} : { visibility: "hidden" }
            }
          >
            <div className="empty-page-info-main">{item.main}</div>
            <div className="empty-page-info-sub">{item.sub}</div>
          </div>
        );
      });
    };
    return (
      <div className="empty-page-container">
        <img
          src={
            process.env.NODE_ENV === "production"
              ? "%PUBLIC_URL%/assets/empty.jpg"
              : "../../assets/empty.jpg"
          }
          alt=""
          className="empty-page-illustration"
        />
        {renderEmptyList()}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    mode: state.sidebar.mode
  };
};
const actionCreator = {};
EmptyPage = connect(mapStateToProps, actionCreator)(EmptyPage);
export default EmptyPage;
