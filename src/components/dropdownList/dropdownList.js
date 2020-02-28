import React, { Component } from "react";
import ReaderConfig from "../../utils/readerConfig";
import StyleConfig from "../../utils/styleConfig";
import { dropdownList } from "../../utils/readerConfig";
import { connect } from "react-redux";
import "./dropdownList.css";
// @connect(state => state.settingPanel)
class DropdownList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFontFamilyIndex: dropdownList[0].option.findIndex(item => {
        return item.value === this.props.fontFamily;
      }),

      currentLineHeightIndex: dropdownList[1].option.findIndex(item => {
        console.log(item.value, this.props.lineHeight, "adhsdjgh");
        return item.value === parseFloat(this.props.lineHeight);
      }),
      currentPaddingIndex: dropdownList[2].option.findIndex(item => {
        return item.value === parseInt(this.props.padding);
      })
    };
  }
  componentDidMount() {
    document
      .querySelector(".paragraph-character-setting")
      .children[0].children[1].children[
        this.state.currentFontFamilyIndex
      ].setAttribute("selected", "selected");

    document
      .querySelector(".paragraph-character-setting")
      .children[1].children[1].children[
        this.state.currentLineHeightIndex
      ].setAttribute("selected", "selected");
    document
      .querySelector(".paragraph-character-setting")
      .children[2].children[1].children[
        this.state.currentPaddingIndex
      ].setAttribute("selected", "selected");
  }
  handleView(event, option) {
    // console.log(value, "value");
    let arr = event.target.value.split(",");
    // console.log(arr);
    // console.log(typeof event.target.value, "fgafhh");
    ReaderConfig.set(option, arr[0]);
    console.log(option, arr[0], "sasfhfshg");
    switch (option) {
      case "font":
        this.setState({
          currentFontIndex: arr[1]
        });
        break;
      case "fontWeight":
        this.setState({
          currentFontWeightIndex: arr[1]
        });
        break;
      case "lineHeight":
        this.setState({
          currentLineHeightIndex: arr[1]
        });
        break;
      case "padding":
        this.setState({
          currentPaddingIndex: arr[1]
        });
        break;
      case "wordSpacing":
        this.setState({
          currentWordSpacingIndex: arr[1]
        });
        break;
      default:
        break;
    }
    StyleConfig.addDefaultCss();
  }
  render() {
    const renderParagraphCharacter = () => {
      return dropdownList.map((item, index) => (
        <li className="paragraph-character-container" key={item.id}>
          <p className="general-setting-title">{item.title}</p>
          <select
            name=""
            className="general-setting-dropdown"
            onChange={event => {
              this.handleView(event, item.value);
            }}
          >
            {item.option.map((item, index) => (
              <option
                value={[item.value, index]}
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

    return (
      <ul className="paragraph-character-setting">
        {renderParagraphCharacter()}
      </ul>
    );
  }
}
const mapStateToProps = state => {
  return {
    fontFamily: state.settingPanel.fontFamily,
    lineHeight: state.settingPanel.lineHeight,
    padding: state.settingPanel.padding
  };
};
const actionCreator = {};
DropdownList = connect(mapStateToProps, actionCreator)(DropdownList);
export default DropdownList;
