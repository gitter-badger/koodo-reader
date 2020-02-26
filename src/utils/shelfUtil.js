// 记录书本打开记录
const defaultShelf = {
  新建书架: null,
  工作学习: [],
  生活百科: [],
  休闲娱乐: []
};
class ShelfUtil {
  static setShelf(shelfTitle, bookKey) {
    let json = localStorage.getItem("shelfList");
    let obj = JSON.parse(json) || defaultShelf;
    if (obj[shelfTitle] === undefined) {
      obj[shelfTitle] = [];
    }
    if (obj[shelfTitle].indexOf(bookKey) === -1) {
      obj[shelfTitle].unshift(bookKey);
    }
    // console.log(cfi, "dfhdafhdfh");
    localStorage.setItem("shelfList", JSON.stringify(obj));
  }

  static getShelf() {
    let json = localStorage.getItem("shelfList");
    let obj = JSON.parse(json) || defaultShelf;

    return obj || null;
  }
  static clearShelf(shelfTitle, bookKey) {
    let json = localStorage.getItem("shelfList");
    let obj = JSON.parse(json) || defaultShelf;
    let index = obj[shelfTitle].findIndex(bookKey);
    obj[shelfTitle].splice(index, 1);

    localStorage.setItem("shelfList", JSON.stringify(obj));
  }
  static removeShelf(shelfTitle) {
    let json = localStorage.getItem("shelfList");
    let obj = JSON.parse(json) || defaultShelf;
    delete obj.shelfTitle;

    localStorage.setItem("shelfList", JSON.stringify(obj));
  }
}

export default ShelfUtil;
