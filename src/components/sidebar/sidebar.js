import React, { Component } from "react";
import "./sidebar.css";
import { handleMode, handleShelfIndex } from "../../redux/sidebar.redux";
import { connect } from "react-redux";
import { sideMenu } from "../../utils/readerConfig";
import ShelfUtil from "../../utils/shelfUtil";
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: ["home", "recent", "bookmark", "note", "digest"].indexOf(
        this.props.mode
      ),
      isCollapse: true,
      shelfIndex: null
    };
  }
  handleSidebar = (mode, index) => {
    console.log(index);
    this.setState({ index: index });
    this.props.handleMode(mode);
    this.props.handleShelfIndex(null);
    // let sideicon = document.querySelector(`.icon-${icon}`);
    // sideicon.setAttribute("style", "color:white");
  };
  handleShelf = () => {
    this.setState({ isCollapse: !this.state.isCollapse });
  };
  handleShelfItem = index => {
    console.log(index);
    this.setState({ shelfIndex: index });
    this.props.handleShelfIndex(index);
    this.props.handleMode("shelf");
  };
  render() {
    const renderSideMenu = () => {
      return sideMenu.map((item, index) => {
        return (
          <li
            key={item.name}
            className={
              this.state.index === index
                ? "active side-menu-item"
                : "side-menu-item"
            }
            id={`sidebar-${item.icon}`}
            onClick={() => {
              this.handleSidebar(item.mode, index);
            }}
          >
            <div
              className={
                this.state.index === index
                  ? " side-menu-selector"
                  : "inactive-selector side-menu-selector"
              }
            >
              <span
                className={
                  this.state.index === index
                    ? `icon-${item.icon} side-menu-icon active `
                    : `icon-${item.icon} side-menu-icon`
                }
              ></span>
              {item.name}
            </div>
          </li>
        );
      });
    };
    const renderShelfList = () => {
      const shelfList = Object.keys(ShelfUtil.getShelf());
      console.log(shelfList, "shelfList");
      shelfList.splice(0, 1);
      return shelfList.map((item, index) => {
        return (
          <li
            key={index}
            className={
              this.state.shelfIndex === index
                ? "shelf-list-item active-shelf "
                : "shelf-list-item"
            }
            onClick={() => {
              this.handleShelfItem(index);
            }}
          >
            {item}
          </li>
        );
      });
    };
    return (
      <div className="sidebar">
        <div className="logo">
          <span className="icon-koodo"></span>
          <p className="logo-text">可道阅读器</p>
        </div>
        <ul className="side-menu-container">
          {renderSideMenu()}
          <li className="side-menu-shelf">
            <div
              onClick={() => {
                this.handleShelf();
              }}
            >
              <span className="icon-shelf"></span>
              {"我的书架"}
              <span
                className={
                  this.state.isCollapse ? "icon-dropdown" : "icon-shangla"
                }
              ></span>
            </div>

            <ul
              className="shelf-list-container"
              style={this.state.isCollapse ? { display: "none" } : {}}
            >
              {renderShelfList()}
            </ul>
          </li>
        </ul>
        <div className="setting-container">
          <span className="icon-more"></span>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { mode: state.sidebar.mode };
};
const actionCreator = { handleMode, handleShelfIndex };
Sidebar = connect(mapStateToProps, actionCreator)(Sidebar);
export default Sidebar;
