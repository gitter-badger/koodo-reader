import React, { Component } from "react";
import "./chooseDrive.css";
import { driveList } from "../../utils/readerConfig";
import { handleChoose } from "../../redux/chooseDrive.redux";
import { connect } from "react-redux";
import { handleMessageBox, handleMessage } from "../../redux/manager.redux";
class ChooseDrive extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleClose = () => {
    this.props.handleChoose(false);
  };
  handleChoose = () => {
    this.props.handleMessage("下载客户端体验完整功能");
    this.props.handleMessageBox(true);
  };
  render() {
    const renderDrivePage = () => {
      return driveList.map((item, index) => {
        return (
          <li
            key={item.id}
            className="choose-drive-list-item"
            onClick={() => {
              this.handleChoose(item.icon, index);
            }}
          >
            <div className="choose-drive-list-item-container">
              <span
                className={`icon-${item.icon} choose-drive-list-icon`}
              ></span>
              <div className="choose-drive-list-title">{item.name}</div>
            </div>
          </li>
        );
      });
    };

    return (
      <div className="choose-drive-container-parent">
        <div className="choose-drive-container">
          <div className="choose-drive-title">绑定您的网盘账号</div>
          <span
            className="icon-close choose-drive-close-icon"
            onClick={() => {
              this.handleClose();
            }}
          ></span>
          <div className="choose-drive-drive-container">
            <div>{renderDrivePage()}</div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {};
};
const actionCreator = {
  handleChoose,
  handleMessageBox,
  handleMessage
};
ChooseDrive = connect(mapStateToProps, actionCreator)(ChooseDrive);
export default ChooseDrive;
