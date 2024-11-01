import {combineReducers} from "@reduxjs/toolkit";
import themeSlice from '../module/color-theme/core/slice'
import authSlice from "../module/auth/core/authSlice";

export const rootReducer = combineReducers({
    theme : themeSlice,
    auth: authSlice,
})