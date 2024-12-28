import { createSlice } from "@reduxjs/toolkit";

const initPost = {
  title: "",
  subTitle: "",
  description: "",
  status: 0,
  mediaId: null,
  topic_id: null,
};

const initialState = {
  post: [],
  paging: {},
  postInfo: initPost,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPost: (state, action) => {
      state.post = action.payload.data;
      state.paging = action.payload.paging;
    },
    setPostInfo: (state, action) => {
      const data = action.payload;
      state.postInfo[data.name] = data.value;
    },
    resetPostInfo: (state) => {
      state.postInfo = { ...initPost };
    },
  },
});

export const { setPost, setPostInfo, resetPostInfo } = postSlice.actions;

export default postSlice.reducer;
