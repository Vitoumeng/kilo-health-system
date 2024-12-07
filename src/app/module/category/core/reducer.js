import { createSlice } from "@reduxjs/toolkit";

const initCategory = {
  name: "",
  mediaId: null,
  mediaUrl: null,
};

const initialState = {
  category: [],
  paging: {},
  categoryInfo: initCategory,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload.data;
      state.paging = action.payload.paging;
    },
  },
});

export const { setCategory } = categorySlice.actions;

export default categorySlice.reducer;
