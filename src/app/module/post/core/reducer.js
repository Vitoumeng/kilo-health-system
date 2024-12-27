import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: [],
  paging: {},
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPost: (state, action) => {
      state.post = action.payload.data;
      state.paging = action.payload.paging;
    },
  },
});

export const { setPost } = postSlice.actions;

export default postSlice.reducer;
