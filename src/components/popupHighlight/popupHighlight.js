//添加图书高亮
import React, { Component } from "react";
import "./popupHighlight.css";
import Highlighter from "../../model/Highlighter";
import localforage from "localforage";
import { handleMessageBox, handleMessage } from "../../redux/manager.redux.js";
import { connect } from "react-redux";
class PopupHighlight extends Component {
  handleReturn = () => {
    //返回popupmenu
    this.props.changeMenu("menu");
  };
  handleClose = () => {
    this.props.close();
    this.props.changeMenu("menu");
  };

  componentDidMount() {
    this.props.currentEpub.on("renderer:ChapterDisplayed", () => {
      this.getHighlighter();
    });
  }

  handleHighlight(event) {
    let iframe = document.getElementsByTagName("iframe")[0];

    let iDoc = document.getElementsByTagName("iframe")[0].contentDocument;
    let color = parseInt(event.target.dataset.color);
    if (isNaN(color)) return;
    // let note = this.createNote(color);
    let classes = ["color-0", "color-1", "color-2", "color-3"];
    let key = new Date().getTime() + "";
    this.props.highlighter.highlightSelection(classes[color]);
    // 清空文本选取
    let book = this.props.currentBook;
    let epub = this.props.currentEpub;
    let sel = iDoc.getSelection();
    let range = sel.getRangeAt(0);
    let cfiBase = epub.renderer.currentChapter.cfiBase;
    let cfi = new window.EPUBJS.EpubCFI().generateCfiFromRange(range, cfiBase);
    let bookKey = book.key;
    let charRange = window.rangy
      .getSelection(iframe)
      .saveCharacterRanges(iDoc.body)[0];
    let serial = JSON.stringify(charRange);
    //获取章节名

    event.stopPropagation();
    let highlighter = new Highlighter(key, bookKey, cfi, serial, color);
    let highlighterArr = this.props.highlighters ? this.props.highlighters : [];
    highlighterArr.push(highlighter);
    localforage.setItem("highlighters", highlighterArr);
    this.props.closeMenu();
    iDoc.getSelection().empty();
    this.props.handleMessage("高亮成功");
    this.props.handleMessageBox(true);
    console.log("%c Add note here. ", "background-color: green");
        this.props.changeMenu("menu");
  }

  render() {
    const renderHighlightList = () => {
      return (
        <div
          className="highlight-list"
          style={this.props.isChangeDirection ? { marginTop: "0px" } : {}}
        >
          <div
            className="highlight-return-button"
            onClick={() => {
              this.handleReturn();
            }}
          >
            <span className="icon-return"></span>
            <p className="highlight-text">选择颜色</p>
          </div>
          <ul className="highlight-color">
            <li
              className="highlight-color1"
              onClick={event => {
                this.handleHighlight(event);
              }}
              data-color="0"
            ></li>
            <li
              className="highlight-color2"
              onClick={event => {
                this.handleHighlight(event);
              }}
              data-color="1"
            ></li>
            <li
              className="highlight-color3"
              onClick={event => {
                this.handleHighlight(event);
              }}
              data-color="2"
            ></li>
            <li
              className="highlight-color4"
              onClick={event => {
                this.handleHighlight(event);
              }}
              data-color="3"
            ></li>
          </ul>
        </div>
      );
    };
    return renderHighlightList();
  }
}
const mapStateToProps = state => {
  return {
    currentEpub: state.book.currentEpub,
    currentBook: state.book.currentBook,
    notes: state.reader.notes,
    chapters: state.reader.chapters,
    highlighters: state.reader.highlighters
  };
};
const actionCreator = { handleMessageBox, handleMessage };
PopupHighlight = connect(mapStateToProps, actionCreator)(PopupHighlight);
export default PopupHighlight;
