import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  file: [],
  paging: {},
};

const fileSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    setFile: (state, action) => {
      state.file = action.payload.data;
      state.paging = action.payload.paging;
    },
  },
});

export const { setFile } = fileSlice.actions;

export default fileSlice.reducer;
