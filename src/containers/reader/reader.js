import React, { Component } from "react";
// import styleConfig from "../../utils/styleConfig";
import ViewArea from "../../components/viewArea/viewArea";
import Background from "../../components/background/background";
import SettingPanel from "../../components/settingPanel/settingPanel";
import NavigationPanel from "../../components/navigationPanel/navigationPanel";
import OperationPanel from "../../components/operationPanel/operationPanel";
import MessageBox from "../../components/messageBox/messageBox";

import ProgressPanel from "../../components/progressPanel/progressPanel";
import {
  handleNotes,
  handleBookmarks,
  handleDigests,
  handleFetchNotes,
  handleFetchBookmarks,
  handleFetchDigests,
  handleFetchChapters,
  handleFetchHighlighters
  // handleLocations
} from "../../redux/reader.redux";
import { handleMessageBox } from "../../redux/manager.redux";
import "./reader.css";
import { connect } from "react-redux";
class Reader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenSettingPanel: false, // 打开设置面板
      isOpenOperationPanel: false, // 打开书签列表
      isOpenProgressPanel: false, // 打开笔记列表
      isOpenInfoPanel: false, // 打开消息通知
      isMessage: false
    };
  }
  componentWillMount() {
    this.props.handleFetchBookmarks();
    this.props.handleFetchNotes();
    this.props.handleFetchDigests();
    this.props.handleFetchHighlighters();
    this.props.handleFetchChapters(this.props.currentEpub);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    this.setState({
      isMessage: nextProps.isMessage
    });
    if (nextProps.isMessage) {
      setTimeout(() => {
        this.props.handleMessageBox(false);
        this.setState({ isMessage: false });
      }, 2000);
    }
    console.log(this.state.isMessage, "asdgsgjhf");
  }
  componentDidMount() {
    window.rangy.init(); // 初始化
  }

  // 为state的属性设置相应的值
  setConfig(key, value) {
    this.setState({ [key]: value });
    // styleConfig.set(key, value);
  }

  handleEnter = position => {
    console.log("enter");

    switch (position) {
      case "right":
        this.setState({
          isOpenSettingPanel: this.state.isOpenSettingPanel ? false : true
        });
        break;
      case "left":
        this.setState({
          isOpenInfoPanel: this.state.isOpenInfoPanel ? false : true
        });
        break;
      case "top":
        this.setState({
          isOpenOperationPanel: this.state.isOpenOperationPanel ? false : true
        });
        break;
      case "bottom":
        this.setState({
          isOpenProgressPanel: this.state.isOpenProgressPanel ? false : true
        });
        break;
      default:
        break;
    }
    // this.setState({ isOpenSettingPanel: true });
  };
  handleLeave = position => {
    console.log("leave");
    switch (position) {
      case "right":
        this.setState({ isOpenSettingPanel: false });
        break;
      case "left":
        this.setState({ isOpenInfoPanel: false });
        break;
      case "top":
        this.setState({ isOpenOperationPanel: false });
        break;
      case "bottom":
        this.setState({ isOpenProgressPanel: false });
        break;
      default:
        break;
    }
    // this.setState({ isOpenSettingPanel: false });
  };
  render() {
    return (
      <div className="viewer">
        {this.state.isMessage ? <MessageBox /> : null}

        <div
          className="left-panel"
          onMouseEnter={() => {
            this.handleEnter("left");
          }}
        ></div>
        <div
          className="right-panel"
          onMouseEnter={() => {
            this.handleEnter("right");
          }}
        ></div>
        <div
          className="top-panel"
          onMouseEnter={() => {
            this.handleEnter("top");
          }}
        ></div>
        <div
          className="bottom-panel"
          onMouseEnter={() => {
            this.handleEnter("bottom");
          }}
        ></div>
        <ViewArea className="view-area" />
        {this.state.isOpenSettingPanel ? (
          <div
            onMouseLeave={() => {
              this.handleLeave("right");
            }}
          >
            <SettingPanel className="setting-panel" />
          </div>
        ) : null}
        {this.state.isOpenInfoPanel ? (
          <div
            onMouseLeave={() => {
              this.handleLeave("left");
            }}
          >
            <NavigationPanel className="navigation-panel" />
          </div>
        ) : null}
        {this.state.isOpenProgressPanel ? (
          <div
            className="progress-panel-container"
            onMouseLeave={() => {
              this.handleLeave("bottom");
            }}
          >
            <ProgressPanel className="progress-panel" />
          </div>
        ) : null}
        {this.state.isOpenOperationPanel ? (
          <div
            className="operation-panel-container"
            onMouseLeave={() => {
              this.handleLeave("top");
            }}
          >
            <OperationPanel className="book-operation-panel" />
          </div>
        ) : null}

        <Background className="background" />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    currentEpub: state.book.currentEpub,
    currentBook: state.book.currentBook,
    isMessage: state.manager.isMessage
  };
};
const actionCreator = {
  handleNotes,
  handleBookmarks,
  handleDigests,
  handleFetchNotes,
  handleFetchBookmarks,
  handleFetchDigests,
  handleFetchChapters,
  handleFetchHighlighters,
  handleMessageBox
};
Reader = connect(mapStateToProps, actionCreator)(Reader);
export default Reader;
