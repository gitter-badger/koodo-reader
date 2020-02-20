import React, { Component } from "react";
import Manager from "./containers/manager/manager";
import Viewer from "./containers/reader/reader";
import ReaderConfig from "./utils/readerConfig";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReading: false, // 书籍是否正在被阅读
      currentReadingBook: null // 正在被阅读的书籍对象
      // theme: ReaderConfig.get().theme
      // true为light主题，false为dark主题
    };

    this.handleReading = this.handleReading.bind(this);
    this.handleReadingBook = this.handleReadingBook.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
  }
  //设置是否处于阅读状态
  handleReading(isReading) {
    this.setState({ isReading: isReading });
  }
  //设置正在阅读的书
  handleReadingBook(book) {
    this.setState({ readingBook: book });
  }

  // 切换主题
  toggleTheme(theme) {
    this.setState({ theme });
    ReaderConfig.set("theme", theme);
  }

  render() {
    let { isReading, readingBook, theme } = this.state;
    //theme为真表示白天模式，为假表示为夜间模式
    //manager表示图书管理器
    let manager = (
      <Manager
        handleReading={this.handleReading}
        handleReadingBook={this.handleReadingBook}
      />
    );
    //viewer表示阅读器
    let viewer = (
      <Viewer
        handleReading={this.handleReading}
        readingBook={readingBook}
        toggleTheme={this.toggleTheme}
      />
    );
    //根据element真假切换两种状态

    let element = isReading ? viewer : manager;

    return (
      <div className="app" style={{ height: "100%", width: "100%" }}>
        {element}
      </div>
    );
  }
}

export default App;
