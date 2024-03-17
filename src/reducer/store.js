import { configureStore } from "@reduxjs/toolkit";
// import  eventSlice  from "./event.js";
// import eventReducer from "./event.js";
import reducer from "./combine.js";
export const store = configureStore({
  reducer: reducer,
});

//export * from "./preinscrit.js";
export * from "./user.js";