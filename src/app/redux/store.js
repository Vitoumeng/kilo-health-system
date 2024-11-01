import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "./combinedReducers";

export const store = configureStore({
    reducer: rootReducer
});