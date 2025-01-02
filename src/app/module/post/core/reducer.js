import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: [],
  paging: {},
  postDetails: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPost: (state, action) => {
      state.post = action.payload.data;
      state.paging = action.payload.paging;
    },
    setPostDetails: (state, action) => {
      state.postDetails = action.payload;
    },
  },
});

export const { setPost, setPostDetails } = postSlice.actions;

export default postSlice.reducer;
