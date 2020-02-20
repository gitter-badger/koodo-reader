// 阅读期间自动记录当前阅读位置
class RecordLocation {
  static recordCfi(bookKey, cfi) {
    let json = localStorage.getItem("recordLocation");
    let obj = JSON.parse(json) || {};
    obj[bookKey] = cfi;

    localStorage.setItem("recordLocation", JSON.stringify(obj));
  }

  static getCfi(bookKey) {
    let json = localStorage.getItem("recordLocation");
    let obj = JSON.parse(json) || {};

    return obj[bookKey] || null;
  }

  static clear(bookKey) {
    let json = localStorage.getItem("recordLocation");
    let obj = JSON.parse(json) || {};
    delete obj[bookKey];

    localStorage.setItem("recordLocation", JSON.stringify(obj));
  }
}

export default RecordLocation;
