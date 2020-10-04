import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import combinedReducer from "./reducers";

// Create store from the combination of our reducers
export default createStore(
  combinedReducer,
  {},
  compose(
    applyMiddleware(thunk),
    typeof window !== "undefined" && window.devToolsExtension
      ? window.devToolsExtension()
      : (f) => f
  )
);
