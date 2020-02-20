import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { settingPanel } from "./redux/settingPanel.redux";
import { book } from "./redux/book.redux";
import { manager } from "./redux/manager.redux";
import { progressPanel } from "./redux/progressPanel.redux";
import { reader } from "./redux/reader.redux";
const rootReducer = combineReducers({
  settingPanel,
  book,
  manager,
  reader,
  progressPanel
});
// console.log(manager, rootReducer);
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
export default store;
