import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"; // ✅ import as named
import rootReducer from "./Reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)) 
  // ✅ use named import
);

export default store;
