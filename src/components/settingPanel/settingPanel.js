import React, { Component } from "react";
import "./settingPanel.css";
import { connect } from "react-redux";
import ThemeList from "../themeList/themeList";
import FontSizeList from "../fontSizeList/fontSizeList";
import DropdownList from "../dropdownList/dropdownList";
// @connect(state => state.settingPanel)
class SettingPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // 改变主题

  // 改变高亮的颜色

  // 改变可阅读区域列数

  // 改变gutter的值

  // 改变padding的值

  // 改变与字体相关的配置

  // 导入用户自定义样式

  // 重置为默认样式

  // 禁用 popup menu

  render() {
    return (
      <div className="setting-panel">
        <div className="setting-panel-title">阅读选项</div>
        <ThemeList />
        <FontSizeList />
        <DropdownList />
        {
          //
          //
        }
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { books: state.manager.books };
};
const actionCreator = {};
SettingPanel = connect(mapStateToProps, actionCreator)(SettingPanel);
export default SettingPanel;
