import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../module/user/Auth/core/reducer";
import userSlice from "../module/user/User/core/reducer";
import roleSlice from "../module/user/Role/core/reducer";

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  role: roleSlice,
});

export default rootReducer;
