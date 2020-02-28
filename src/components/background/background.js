import React, { Component } from "react";
import "./background.css";
import { connect } from "react-redux";
class Background extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSingle: localStorage.getItem("isSingle") || "double"
    };
  }
  render() {
    return (
      <div className="background">
        <div className="background-box1"></div>
        <div className="background-box2"></div>
        <div className="background-box3">
          <div
            className="spine-shadow-left"
            style={this.state.isSingle === "single" ? { display: "none" } : {}}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="68"
              height="800"
              viewBox="0 0 68 800"
            >
              <defs>
                <linearGradient
                  id="linear-gradient"
                  x1="0.5"
                  x2="0.5"
                  y2="1"
                  gradientUnits="objectBoundingBox"
                >
                  <stop offset="0" stopColor="#fff" stopOpacity="0" />
                  <stop offset="1" stopColor="gray" stopOpacity="0.388" />
                </linearGradient>
              </defs>
              <rect
                width="800"
                height="68"
                transform="translate(0 800) rotate(-90)"
              />
            </svg>
          </div>
          <div
            className="book-spine"
            style={this.state.isSingle === "single" ? { display: "none" } : {}}
          ></div>
          <div
            className="spine-shadow-right"
            style={this.state.isSingle === "single" ? { display: "none" } : {}}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="68"
              height="800"
              viewBox="0 0 68 800"
            >
              <defs>
                <linearGradient
                  id="linear-gradient"
                  x1="0.5"
                  x2="0.5"
                  y2="1"
                  gradientUnits="objectBoundingBox"
                >
                  <stop offset="0" stopColor="#fff" stopOpacity="0" />
                  <stop offset="1" stopColor="gray" stopOpacity="0.388" />
                </linearGradient>
              </defs>
              <rect
                width="800"
                height="68"
                transform="translate(68) rotate(90)"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isSingle: state.reader.isSingle
  };
};
const actionCreator = {};
Background = connect(mapStateToProps, actionCreator)(Background);
export default Background;
