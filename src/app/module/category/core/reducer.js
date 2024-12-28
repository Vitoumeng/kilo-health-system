import { createSlice } from "@reduxjs/toolkit";

const initCategory = {
  name: "",
  mediaId: null,
};

const initailState = {
  category: [],
  paging: {},
  categoryInfo: initCategory,
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
    setCategoryInfo: (state, action) => {
      const data = action.payload;
      state.categoryInfo[data.name] = data.value;
    },
    resetCategoryInfo: (state) => {
      state.categoryInfo = { ...initCategory };
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
