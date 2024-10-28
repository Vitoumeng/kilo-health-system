import { combineReducers } from "redux";
import authSlice from "../modules/auth/core/reducer";

export const rootReducers = combineReducers({
  auth: authSlice,
});
