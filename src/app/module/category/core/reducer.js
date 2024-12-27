import { createSlice } from "@reduxjs/toolkit";

const initailState = {
  category: [],
  paging: {},
};

const categorySlice = createSlice({
  name: "category",
  initialState: initailState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload.data;
      state.paging = action.payload.paging;
    },
  },
});

export const { setCategory } = categorySlice.actions;

export default categorySlice.reducer;
