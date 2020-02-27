import React, { Component } from "react";
import "./viewArea.css";
import Util from "../../utils/styleConfig";
// import RecordLocation from "../../utils/recordLocation";
// import Config from "../../utils/readerConfig";
import { connect } from "react-redux";
import {
  handleOpenMenu
  // handleDialogLocation
} from "../../redux/viewArea.redux";
// import { MouseEvent } from "../../utils/mouseEvent";
// import { handlePercentage } from "../../redux/progressPanel.redux";
import PopupMenu from "../popupMenu/popupMenu";
import ViewPage from "../../components/viewPage/viewPage";
// @connect(state => state.book)
class ViewArea extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // 打开弹出菜单

  // 关闭附注编辑框
  closeNoteCard() {
    this.setState({ openNoteCard: false });
  }

  // 打开附注编辑框
  openNoteCard(x, y) {
    let noteCard = document.getElementById("note-card");
    let width = parseInt(Util.getStyle(noteCard, "width"));
    let height = parseInt(Util.getStyle(noteCard, "height"));

    console.log(width, height);

    let posX = x - width / 2;
    let posY = y - height - 20;

    posX = posX < 0 ? 0 : posX;
    posY = posY < 0 ? 0 : posY;

    this.setState({ openNoteCard: true, nPosX: posX, nPosY: posY });
  }

  // 设置当前正在被编辑的note
  setNote(note) {
    this.setState({ note });
  }

  // 设置当前正在被渲染的note的key
  setKey(key) {
    this.key = key;
  }

  // 获取与本章节相关的 pen

  // 渲染本章节的note

  // 翻页：上一页
  prev() {
    this.props.epub.prevPage();
    this.closeMenu();
    this.closeNoteCard();
  }

  // 翻页：下一页
  next() {
    this.props.epub.nextPage();
    this.closeMenu();
    this.closeNoteCard();
  }

  render() {
    // let epub = this.epub;
    // console.log(epub, "epub");
    // epub.renderer.forceSingle(); // TODO: 在合适的地方触发重新渲染书籍
    // console.log("%c render view-area. ", "color: orange; background: #333333");
    // console.log(this.props.isLoading, "isloading");
    return (
      <div className="view-area">
        <PopupMenu id="popup-menu" />
        <ViewPage />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    // currentBook: state.book.currentBook,
    currentEpub: state.book.currentEpub,
    // locations: state.progressPanel.locations
    isOpenMenu: state.viewArea.isOpenMenu
  };
};
const actionCreator = { handleOpenMenu };
ViewArea = connect(mapStateToProps, actionCreator)(ViewArea);
export default ViewArea;
