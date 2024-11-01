import {createSlice} from "@reduxjs/toolkit";

const LOCAL_THEME_KEY = 'theme';

const initialState = {
    storedTheme: localStorage.getItem(LOCAL_THEME_KEY),
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setStoreTheme: (state, action) => {
            state.storedTheme = action.payload;
            localStorage.setItem(LOCAL_THEME_KEY, action.payload);
        }
    }
})

export const { setStoreTheme } = themeSlice.actions;
export default themeSlice.reducer;