import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../module/user/Auth/core/reducer";
import userSlice from "../module/user/User/core/reducer";
import roleSlice from "../module/user/Role/core/reducer";
import fileSlice from "../module/file-upload/core/reducer";
import categorySlice from "../module/category/core/reducer";
import postSlice from "../module/post/core/reducer";

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  role: roleSlice,
  file: fileSlice,
  category: categorySlice,
  post: postSlice,
});

export default rootReducer;
