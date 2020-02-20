import React, { Component } from "react";
import "./viewArea.css";
import Util from "../../utils/styleConfig";
import RecordLocation from "../../utils/recordLocation";
import Config from "../../utils/readerConfig";
import { connect } from "react-redux";
import { MouseEvent } from "../../utils/mouseEvent";
// @connect(state => state.book)
class ViewArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBook: {}
    };
  }

  componentWillUnmount() {
    document.removeEventListener("copy", this.copyTextHack);
  }
  componentDidMount() {
    let page = document.getElementById("page-area");
    let epub = this.props.currentEpub;

    // console.log(document, "dhgskhgsk");
    // epub.locations.generate().then(result => {
    epub.renderTo(page);
    MouseEvent(epub, this.props.currentBook.key); // 绑定事件
    // 渲染
    // addEventListener('')
    epub.on("renderer:locationChanged", () => {
      let cfi = epub.getCurrentLocationCfi();
      // let locations = epub.locations;
      console.log("asfhfhh");
      console.log(this.props.locations);
      if (this.props.locations) {
        let percentage = this.props.locations.percentageFromCfi(cfi);
        console.log(percentage, "sahafhfh");
        // console.log(percentage, "dgafhdafha");
        RecordLocation.recordCfi(this.props.currentBook.key, cfi, percentage);
      }
    });
    // console.log(AutoBookmark.getCfi(this.props.currentBook.key).cfi);
    epub.gotoCfi(
      RecordLocation.getCfi(this.props.currentBook.key) === null
        ? null
        : RecordLocation.getCfi(this.props.currentBook.key).cfi
    );
    // });
    // MouseEvent(epub, this.props.currentBook.key); // 绑定事件
    // epub.gotoCfi(AutoBookmark.getCfi(this.props.currentBook.key).cfi);
    // console.log("ghdfgfdgh");

    // 解决火狐下不能正常复制
  }
  // recordCfi = () => {
  //   let cfi = this.props.currentEpub.getCurrentLocationCfi();
  //   let locations = this.props.currentEpub.locations;
  //   let percentage = locations.percentageFromCfi(cfi);
  //   // console.log(percentage, "sahafhfh");
  //   console.log(percentage, "dgafhdafha");
  //   RecordLocation.recordCfi(this.props.currentBook.key, cfi, percentage);
  // };
  toggleTheme(theme) {
    this.setState({ theme });
    Config.set("theme", theme);
  }

  // 关闭弹出菜单
  closeMenu() {
    this.setState({ openMenu: false });
  }

  // 打开弹出菜单
  openMenu(event) {
    let iframe = document.getElementsByTagName("iframe")[0];
    let iDoc = iframe.contentDocument;
    let sel = iDoc.getSelection();

    // 如果 note card 正在被展示，则隐藏
    if (this.state.openNoteCard) {
      this.setState({ openNoteCard: false });
    }
    // 使弹出菜单更加灵活可控
    if (sel.isCollapsed) {
      this.state.openMenu && this.closeMenu();
      return;
    }

    if (this.props.disablePopup) return;

    let rect = this.props.epub.renderer.rangePosition(sel.getRangeAt(0));
    console.log(rect);

    let menu = document.getElementById("editor-toolbar");
    let x = event.clientX;
    let y = event.clientY;
    let width = parseInt(Util.getStyle(menu, "width"));
    let height = parseInt(Util.getStyle(menu, "height"));

    // TODO: 坐标计算
    let posX = rect.x + rect.width / 2 + width / 2;
    let posY = rect.y - height;
    posX = posX < 0 ? 0 : posX;
    posY = posY < 0 ? 0 : posY;

    [this.x, this.y] = [x, y];
    this.setState({ openMenu: true, mPosX: posX, mPosY: posY });
  }

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
        <div
          className="view-area-mask"
          onClick={() => {
            this.handleClick();
          }}
        ></div>
        <div className="view-area-page" id="page-area"></div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    currentBook: state.book.currentBook,
    currentEpub: state.book.currentEpub,
    locations: state.progressPanel.locations
  };
};
const actionCreator = {};
ViewArea = connect(mapStateToProps, actionCreator)(ViewArea);
export default ViewArea;
