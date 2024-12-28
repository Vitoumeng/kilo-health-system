import { createSlice } from "@reduxjs/toolkit";

const initCategory = {
  name: "",
  mediaId: null,
};

const initailState = {
  category: [],
  paging: {},
  categoryInfo: initCategory,
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
  },
});

export const { setCategory, setCategoryInfo, resetCategoryInfo } =
  categorySlice.actions;

export default categorySlice.reducer;
