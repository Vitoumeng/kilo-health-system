import { combineReducers } from "@reduxjs/toolkit";
import themeSlice from "../module/color-theme/core/slice";
import authSlice from "../module/auth/core/slice";
import userSlice from "../module/usermanagement/core/slice";

export const rootReducer = combineReducers({
  theme: themeSlice,
  auth: authSlice,
  user: userSlice,
});
