import React, { Component } from "react";
import "./background.css";
class Background extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="background">
        <div className="background-box1"></div>
        <div className="background-box2"></div>
        <div className="background-box3">
          <div className="spine-shadow-left"></div>
          <div className="book-spine"></div>
          <div className="spine-shadow-right"></div>
        </div>
      </div>
    );
  }
}

export default Background;
