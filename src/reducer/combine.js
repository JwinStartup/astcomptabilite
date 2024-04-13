import { combineReducers } from "redux";
import { userReducer } from "./user.js";
import { comptabiliteReducer } from "./comptabilite.js";

export default combineReducers({
  userReducer,
  comptabiliteReducer
});

export * from "./user.js";
export * from "./comptabilite.js";
