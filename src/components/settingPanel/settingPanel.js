import React, { Component } from "react";
import Config from "../../service/Config";
import Util from "../../service/Util";
import "./settingPanel.css";

const fontSizeDescription = [
  { id: 1, size: "小", num: 15 },
  { id: 2, size: "中", num: 17 },
  { id: 3, size: "大", num: 20 },
  { id: 4, size: "特大", num: 23 },
  { id: 5, size: "超大", num: 26 }
];
const paragraphCharacterConfig = [
  {
    id: 1,
    title: "字体",
    defaultId: 3,

    option: [
      { id: 1, name: "楷体" },
      { id: 2, name: "宋体" },
      { id: 3, name: "微软雅黑" },
      { id: 4, name: "黑体" },
      { id: 5, name: "思源黑体" }
    ]
  },
  {
    id: 2,
    title: "字体粗细",
    defaultId: 2,

    option: [
      { id: 1, name: "细" },
      { id: 2, name: "中等" },
      { id: 3, name: "粗" }
    ]
  },
  {
    id: 3,
    title: "行间距",
    defaultId: 3,

    option: [
      { id: 1, name: "0倍" },
      { id: 2, name: "0.5倍" },
      { id: 3, name: "1倍" },
      { id: 4, name: "1.5倍" },
      { id: 5, name: "2倍" }
    ]
  },
  {
    id: 4,
    title: "页边距",
    defaultId: 3,

    option: [
      { id: 1, name: "超窄" },
      { id: 2, name: "窄" },
      { id: 3, name: "中等" },
      { id: 4, name: "宽" },
      { id: 5, name: "超宽" }
    ]
  },
  {
    id: 5,
    title: "字间距",
    defaultId: 2,
    option: [
      { id: 1, name: "窄" },
      { id: 2, name: "中等" },
      { id: 3, name: "宽" }
    ]
  }
];
class SettingPanel extends Component {
  constructor(props) {
    super(props);

    let {
      colors,
      background,
      gutter,
      padding,
      fontSize,
      lineHeight,
      letterSpacing,
      wordSpacing,
      column,
      disablePopup
    } = this.props;
    this.state = {
      colors: colors,
      background: background,
      gutter: gutter,
      padding: padding,
      fontSize: fontSize,
      lineHeight: lineHeight,
      letterSpacing: letterSpacing,
      wordSpacing: wordSpacing,
      column: column,
      disablePopup: disablePopup,
      currentFontSizeIndex: 2,
      currentColorIndex: 3
    };
    // console.log(this.state.colors);
    this.handleClose = this.handleClose.bind(this);
    this.changeTheme = this.changeTheme.bind(this);
    this.changeColors = this.changeColors.bind(this);
    this.changeColumn = this.changeColumn.bind(this);
    this.changeGutter = this.changeGutter.bind(this);
    this.changePadding = this.changePadding.bind(this);
    this.changeFontConfig = this.changeFontConfig.bind(this);
    this.changeUserStyle = this.changeUserStyle.bind(this);
    this.resetUserStyle = this.resetUserStyle.bind(this);
    this.disablePopup = this.disablePopup.bind(this);
    this.handleColorsChange = this.handleColorsChange.bind(this);
    this.handleOtherChange = this.handleOtherChange.bind(this);
  }
  componentWillMount() {}

  componentWillReceiveProps(nextProps) {
    let {
      colors,
      background,
      gutter,
      padding,
      fontSize,
      lineHeight,
      letterSpacing,
      wordSpacing,
      column,
      disablePopup
    } = nextProps;
    this.setState({
      colors: colors,
      background: background,
      gutter: gutter,
      padding: padding,
      fontSize: fontSize,
      lineHeight: lineHeight,
      letterSpacing: letterSpacing,
      wordSpacing: wordSpacing,
      column: column,
      disablePopup: disablePopup
    });
  }

  handleClose() {
    this.props.toggleSettingsDialog(false);
  }

  handleColorsChange(event) {
    let index = parseInt(event.target.dataset.color);
    let colors = this.state.colors;
    colors[index] = event.target.value;
    this.setState({ colors });
  }

  handleOtherChange(event) {
    let name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
  }
  findIndexOfFontSize(fontSize) {
    fontSizeDescription.filter();
  }
  handleChangeFontSize(index, num) {
    this.props.setConfig("fontSize", num);
    this.setState({ currentFontSizeIndex: index });
    Util.addDefaultCss();
  }
  // 改变主题
  changeTheme(theme) {
    this.props.toggleTheme(theme);
    let colors1 = Config.getDefaultConfigObj().colors;
    let colors2 = ["#F44336", "#F57F17", "#8BC34A", "#2196F3"];
    let colors = theme ? colors1 : colors2;
    this.props.setConfig("colors", colors);
    Util.addDefaultCss(); // 改变了设置，需要为当前页重新应用样式
  }

  // 改变高亮的颜色
  changeColors(event) {
    let colors = Config.get().colors;
    let value = event.target.value;
    let i = parseInt(event.target.dataset.color);
    colors[i] = value;
    this.props.setConfig("colors", colors);
    console.log(`change highlight color ${i} to ${value}`);
    Util.addDefaultCss(); // 改变了颜色，需要为当前页重新应用样式
  }

  // 改变可阅读区域列数
  changeColumn(event, value) {
    value = value ? 1 : 2;
    this.props.setConfig("column", value);
    console.log(`change column to ${value}`);
    // TODO: 为单双列模式设置合适的gutter值
  }

  // 改变gutter的值
  changeGutter(event) {
    let value = parseInt(event.target.value);
    this.props.setConfig("gutter", value);
    console.log(`change gutter to ${value}`);
    // TODO: 添加数值验证（不小于80）
  }

  // 改变padding的值
  changePadding(event) {
    let value = parseInt(event.target.value);
    this.props.setConfig("padding", value);
    console.log(`change padding to ${value}`);
    // TODO: 添加数值验证（不小于10）
  }

  // 改变与字体相关的配置
  changeFontConfig(event) {
    let name = event.target.name;
    let value = event.target.value;
    let num;

    if (value === "default") {
      num = 0;
    } else if (value !== "default" && isNaN(value)) {
      alert("Invalid value!");
      return;
    } else {
      num = parseInt(value);
    }

    this.props.setConfig(name, num);
    console.log(`change ${name} to ${num}`);
    // TODO: 添加数值校验
    Util.addDefaultCss(); // 改变了设置，需要为当前页重新应用样式
  }

  // 导入用户自定义样式
  changeUserStyle(event) {
    let file = event.target.files[0];
    let reader = new FileReader();

    if (file.type.indexOf("text") === -1) {
      alert("Invalid stylesheet!");
      return;
    }
    reader.readAsText(file);

    reader.onerror = () =>
      alert("Error! Please refresh the page and try again.");
    reader.onload = () => {
      alert("The stylesheet has been imported.");
      let style = Util.parseStyle(reader.result);
      console.log(style);
      localStorage.setItem("style", JSON.stringify(style));
      Util.applyCss();
    };
  }

  // 重置为默认样式
  resetUserStyle() {
    let config = Config.getDefaultConfigObj();
    this.props.setConfig("colors", config.colors);
    this.props.setConfig("padding", config.padding);
    this.props.setConfig("gutter", config.gutter);
    this.props.setConfig("fontSize", config.fontSize);
    this.props.setConfig("lineHeight", config.lineHeight);
    this.props.setConfig("letterSpacing", config.letterSpacing);
    this.props.setConfig("wordSpacing", config.wordSpacing);
    Util.resetStyle();
  }

  // 禁用 popup menu
  disablePopup(event, value) {
    this.props.setConfig("disablePopup", value);
    console.log(`disable popup menu: ${value}`);
  }
  //渲染背景色列表

  render() {
    let { classes } = this.props;
    let {
      colors,
      gutter,
      padding,
      fontSize,
      lineHeight,
      letterSpacing,
      wordSpacing,
      column,
      disablePopup,
      currentColorIndex,
      currentFontSizeIndex
    } = this.state;

    console.log(currentFontSizeIndex, "currentFontSizeIndex");
    let style = {
      color0: {
        backgroundColor: colors[0].theme
      },
      color1: {
        backgroundColor: colors[1].theme
      },
      color2: {
        backgroundColor: colors[2].theme
      },
      color3: {
        backgroundColor: colors[3].theme
      }
    };
    const renderParagraphCharacter = () => {
      return paragraphCharacterConfig.map((item, index) => (
        <li className="paragraph-character-container" key={item.id}>
          <p className="general-setting-title">{item.title}</p>
          <select
            name=""
            className="general-setting-dropdown"
            defaultValue={item.defaultId}
          >
            {item.option.map((item, index) => (
              <option
                value={item.id}
                className="general-setting-option"
                key={item.id}
              >
                {item.name}
              </option>
            ))}
          </select>
        </li>
      ));
    };
    const renderFontSizeDescription = () => {
      return fontSizeDescription.map((item, index) => {
        console.log(index, this.state.currentFontSizeIndex);
        return (
          <li className="font-size-description" key={item.id}>
            <div
              className={
                index === currentFontSizeIndex
                  ? "active-font-size font-size-circle"
                  : "font-size-circle"
              }
              onClick={() => {
                this.handleChangeFontSize(index, item.num);
              }}
            ></div>
            <p className="font-size-text">{item.size}</p>
          </li>
        );
      });
    };
    const renderBackgroundColorList = () => {
      return this.state.colors.map((item, index) => {
        return (
          <li
            key={item.id}
            className={
              index === currentColorIndex
                ? "active-color background-color-circle"
                : "background-color-circle"
            }
            onClick={index => {
              this.handleChangeColor(index);
            }}
            style={{ backgroundColor: item.theme }}
          ></li>
        );
      });
    };
    return (
      <div className="setting-panel">
        <div className="setting-panel-title">阅读选项</div>
        <div className="background-color-setting">
          <div className="background-color-text">背景颜色</div>
          <ul className="background-color-list">
            {renderBackgroundColorList()}
          </ul>
        </div>
        <div className="font-size-setting">
          <div className="font-size-title">字号大小</div>
          <span className="ultra-small-size">A</span>
          <div className="font-size-line"></div>
          <ul className="font-size-selector">{renderFontSizeDescription()}</ul>

          <span className="ultra-large-size">A</span>
        </div>
        <ul className="paragraph-character-setting">
          {renderParagraphCharacter()}
        </ul>
      </div>
    );
  }
}

export default SettingPanel;
