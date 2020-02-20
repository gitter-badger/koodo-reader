import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import App from "./App";
import "./assets/styles/reset.css";
import "./assets/styles/style.css";
// import reducers from "./reducer";

// const store = createStore(
//   reducers,
//   compose(
//     applyMiddleware(thunk),
//     window.devToolsExtension ? window.devToolsExtension() : f => f
//   )
// );
ReactDOM.render(
  <App />,
  // </Provider>,,
  document.getElementById("root")
);
