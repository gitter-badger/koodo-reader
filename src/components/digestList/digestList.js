import React, { Component } from "react";
import "./digestList.css";
import { connect } from "react-redux";
class DigestList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleBookName = bookKey => {
    let { books } = this.props;
    let chapter = "";
    for (let i = 0; i < this.props.books.length; i++) {
      console.log(books[i].key === bookKey, "fhgjfhj");
      if (books[i].key === bookKey) {
        chapter = books[i].name;
        break;
      }
    }
    console.log(books, chapter, bookKey, "sasbfs");
    return chapter;
  };
  render() {
    let { digests } = this.props;
    console.log(this.props.digests);
    let digestArr = [];
    for (let i = digests.length - 1; i >= 0; i--) {
      digestArr.push(digests[i]);
    }

    // console.log(digestArr[0].date, digests, "digestsaghsag");
    let dateArr = [digestArr[0].date];
    let temp = digestArr[0].date;
    // console.log(digestArr[0].date.day === digestArr[1].date.day);
    for (let i = 1; i < digestArr.length; i++) {
      // console.log(digestArr[i].date);
      if (
        digestArr[i].date.year !== temp.year ||
        digestArr[i].date.month !== temp.month ||
        digestArr[i].date.day !== temp.day
      ) {
        dateArr.push(digestArr[i].date);
        temp = digestArr[i].date;
      }
      // console.log(dateArr);
    }
    let digestObj = {};
    dateArr.forEach(date => {
      digestObj["" + date.year + date.month + date.day] = [];
    });
    digestArr.forEach(digest => {
      dateArr.forEach(date => {
        if (
          date.year === digest.date.year &&
          date.month === digest.date.month &&
          date.day === digest.date.day
        ) {
          digestObj["" + date.year + date.month + date.day].push(digest);
        }
      });
      // if(item.date.year===)
    });
    console.log(digestObj, "agasgbsg");
    const renderDigestListItem = date => {
      return digestObj[date].map((item, index) => {
        return (
          <li className="digest-list-item" key={index}>
            <div className="digest-list-item-digest">
              <div className="digest-list-item-text-parent">
                <div className="digest-list-item-text">{item.text}</div>
              </div>

              <div className="digest-list-item-citation">
                <div className="digest-list-item-title">来自《</div>
                <div className="digest-list-item-chapter digest-list-item-title">
                  {this.handleBookName(item.bookKey)}
                </div>
                <div className="digest-list-item-title">》{item.chapter}</div>
              </div>
            </div>
          </li>
        );
      });
    };
    const renderDigestList = () => {
      return dateArr.map((item, index) => {
        return (
          <li className="digest-page-item" key={index}>
            <div className="digest-page-item-date">{`${item.year}年${item.month}月${item.day}日`}</div>
            <ul className="digest-list-container-box">
              {renderDigestListItem("" + item.year + item.month + item.day)}
            </ul>
          </li>
        );
      });
    };
    console.log(dateArr, digestArr, digests, "digestsaghsag");
    return (
      <div className="digest-list-container-parent">
        <div className="digest-list-container">{renderDigestList()}</div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    digests: state.reader.digests,
    currentEpub: state.book.currentEpub,
    currentBook: state.book.currentBook,
    bookmarks: state.reader.bookmarks,
    chapters: state.reader.chapters,
    books: state.manager.books
  };
};
const actionCreator = {};
DigestList = connect(mapStateToProps, actionCreator)(DigestList);
export default DigestList;
