import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../module/user/Auth/core/reducer";
import userSlice from "../module/user/User/core/reducer";

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
});

export default rootReducer;
