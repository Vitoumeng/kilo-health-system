import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../module/auth/core/reducer";

const rootReducer = combineReducers({
  auth: authSlice,
});

export default rootReducer;
