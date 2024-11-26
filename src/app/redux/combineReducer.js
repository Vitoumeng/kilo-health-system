import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../module/user/Auth/core/reducer";

const rootReducer = combineReducers({
  auth: authSlice,
});

export default rootReducer;
