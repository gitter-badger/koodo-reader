import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { HashRouter, BrowserRouter, Route, Switch } from "react-router-dom";
import Reader from "./containers/reader/reader";
import Manager from "./containers/manager/manager";
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
  // <Provider store={store}>
  <BrowserRouter>
    <div>
      <HashRouter>
        <Switch>
          <Route path="/" exact component={Reader} />
          <Route path="/reader" exact component={Reader} />
        </Switch>
      </HashRouter>
    </div>
  </BrowserRouter>,
  // </Provider>,,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
