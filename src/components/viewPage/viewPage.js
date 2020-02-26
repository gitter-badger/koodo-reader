import React, { Component } from "react";
import RecordLocation from "../../utils/recordLocation";
import { connect } from "react-redux";
import { MouseEvent } from "../../utils/mouseEvent";
import { handlePercentage } from "../../redux/progressPanel.redux";
import { handleOpenMenu } from "../../redux/viewArea.redux.js";
import StyleConfig from "../../utils/styleConfig";
class ViewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillUnmount() {
    document.removeEventListener("copy", this.copyTextHack);
  }
  // componentDidMount() {
  // }
  componentDidMount() {
    let page = document.querySelector("#page-area");
    console.log(page, "fahfgf");
    let epub = this.props.currentEpub;
    window.rangy.init(); // 初始化

    epub.renderTo(page);
    MouseEvent(epub, this.props.currentBook.key); // 绑定事件
    // 渲染
    // addEventListener('')
    epub.on("renderer:locationChanged", () => {
      let cfi = epub.getCurrentLocationCfi();
      if (this.props.locations) {
        let percentage = this.props.locations.percentageFromCfi(cfi);
        console.log(percentage, "sahafhfh");
        // console.log(percentage, "dgafhdafha");
        RecordLocation.recordCfi(this.props.currentBook.key, cfi, percentage);
        this.props.handlePercentage(percentage);
      }
    });
    // console.log(AutoBookmark.getCfi(this.props.currentBook.key).cfi);
    epub.gotoCfi(
      RecordLocation.getCfi(this.props.currentBook.key) === null
        ? null
        : RecordLocation.getCfi(this.props.currentBook.key).cfi
    );
    // let doc = epub.renderer.doc;
    // if (!epub.renderer.doc === undefined) {
    //   epub.renderer.doc.addEventListener("click", this.openMenu());
    // }
    // console.log(epub.renderer.width, "sdgsFHADFH");
    // page.addEventListener("mouseup", this.openMenu(), false); // 为每一章节内容绑定弹出菜单触发程序
    // 解决火狐下不能正常复制
    this.copyTextHack = event => {
      let iDoc = document.getElementsByTagName("iframe")[0].contentDocument;
      let copyText =
        iDoc.getSelection().toString() || document.getSelection().toString();
      event.clipboardData.setData("text/plain", copyText);
      event.preventDefault();
    };
    document.addEventListener("copy", this.copyTextHack);
  }

  render() {
    console.log(this.props.currentEpub.renderer.width, "sdgsFHADFH");
    return <div className="view-area-page" id="page-area"></div>;
  }
}
const mapStateToProps = state => {
  return {
    currentBook: state.book.currentBook,
    currentEpub: state.book.currentEpub,
    locations: state.progressPanel.locations
  };
};
const actionCreator = {
  handlePercentage,
  handleOpenMenu
};
ViewPage = connect(mapStateToProps, actionCreator)(ViewPage);
export default ViewPage;
