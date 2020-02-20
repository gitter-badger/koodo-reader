import React, { Component } from "react";
// import styleConfig from "../../utils/styleConfig";
import ViewArea from "../../components/viewArea/viewArea";
import Background from "../../components/background/background";
import SettingPanel from "../../components/settingPanel/settingPanel";
import NavigationPanel from "../../components/navigationPanel/navigationPanel";
import OperationPanel from "../../components/operationPanel/operationPanel";
import ProgressPanel from "../../components/progressPanel/progressPanel";
import {
  handleNotes,
  handleBookmarks,
  handleDigests,
  handleFetchNotes,
  handleFetchBookmarks,
  handleFetchDigests
  // handleLocations
} from "../../redux/reader.redux";
import "./reader.css";
import { connect } from "react-redux";

// @connect(state => state.book, {
//   handleNotes,
//   handleBookmarks,
//   handleDigests,
//   handleFetchNotes,
//   handleFetchBookmarks,
//   handleFetchDigests
//   // handleLocations
// })
class Viewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenSettingPanel: false, // 打开设置面板
      isOpenOperationPanel: false, // 打开书签列表
      isOpenProgressPanel: false, // 打开笔记列表
      isOpenInfoPanel: false // 打开消息通知
    };
  }
  componentWillMount() {
    this.props.handleFetchBookmarks();
    // this.props.currentEpub.locations.generate().then(() => {
    //   this.props.handleLocations(this.props.currentEpub.locations);
    // });
    // console.log("gashglshg");
  }
  componentDidMount() {
    window.rangy.init(); // 初始化
  }

  // 为state的属性设置相应的值
  setConfig(key, value) {
    this.setState({ [key]: value });
    // styleConfig.set(key, value);
  }

  // 添加书签

  // 删除书签

  // 更新书签内容

  // 添加note

  // 删除note

  // 更新note内容

  // 获取指定key的note

  // 获取指定章节的note

  render() {
    return (
      <div className="viewer">
        <ViewArea className="view-area" />
        <SettingPanel className="setting-panel" />
        <NavigationPanel className="navigation-panel" />
        <OperationPanel className="book-operation-panel" />
        <ProgressPanel className="progress-panel" />
        <Background className="background" />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {};
};
const actionCreator = {
  handleNotes,
  handleBookmarks,
  handleDigests,
  handleFetchNotes,
  handleFetchBookmarks,
  handleFetchDigests
};
Viewer = connect(mapStateToProps, actionCreator)(Viewer);
export default Viewer;
