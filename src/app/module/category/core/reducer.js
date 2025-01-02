import { createSlice } from "@reduxjs/toolkit";

const initailState = {
  category: [],
  paging: {},
  categoryDetails: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState: initailState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload.data;
      state.paging = action.payload.paging;
    },
    setCategoryDetails: (state, action) => {
      state.categoryDetails = action.payload;
    },
  },
});

export const {
  setCategory,
  setCategoryInfo,
  resetCategoryInfo,
  setCategoryDetails,
} = categorySlice.actions;

export default categorySlice.reducer;
