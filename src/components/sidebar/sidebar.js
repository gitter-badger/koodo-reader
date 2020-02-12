import React, { Component } from "react";
import "./sidebar.css";

const renderSideMenu = () => {
  const sideMenu = [
    {
      name: "全部图书",
      icon: "home"
      // action: fetchRecentlyPlayed
    },
    {
      name: "最近阅读",
      icon: "recent"
      // action: fetchSongs
    },
    {
      name: "我的书签",
      icon: "bookmark"
      // action: fetchAlbums
    },
    {
      name: "我的笔记",
      icon: "idea"
      // action: fetchArtists,
      // getArtists: true
    },

    {
      name: "我的书摘",
      icon: "digest"
    }
  ];
  return sideMenu.map(item => {
    return (
      <li
        key={item.name}
        className="side-menu-item"
        onClick={() => {
          console.log("clicked");
        }}
      >
        <span className={`icon-${item.icon} side-menu-icon`}></span>
        {item.name}
      </li>
    );
  });
};
const renderShelfList = () => {
  const shelfList = [
    {
      name: "休闲娱乐"
    },
    {
      name: "生活百科"
    },
    {
      name: "学习工作"
    }
  ];
  return shelfList.map(item => {
    return (
      <li
        key={item.name}
        className="shelf-list-item"
        onClick={() => {
          console.log("clicked");
        }}
      >
        {item.name}
      </li>
    );
  });
};
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="sidebar">
        <div className="side-menu-selector"></div>
        <div className="logo">
          <span className="icon-koodo"></span>
          <p className="logo-text">可道阅读器</p>
        </div>
        <ul className="side-menu-container">
          {renderSideMenu()}
          <li
            className="side-menu-item"
            onClick={() => {
              console.log("clicked");
            }}
          >
            <span className="icon-shelf"></span>
            {"我的书架"}
            <span className="icon-dropdown"></span>
            <ul className="shelf-list-container">{renderShelfList()}</ul>
          </li>
        </ul>
        <div className="setting-container">
          <span className="icon-more"></span>
        </div>
      </div>
    );
  }
}

export default Sidebar;
