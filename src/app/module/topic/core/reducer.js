import { createSlice } from "@reduxjs/toolkit";

const initalState = {
  topic: [],
  paging: {},
};

const topicSlice = createSlice({
  name: "topic",
  initialState: initalState,
  reducers: {
    setTopic: (state, action) => {
      state.topic = action.payload.data;
      state.paging = action.payload.paging;
    },
  },
});

export const { setTopic } = topicSlice.actions;

export default topicSlice.reducer;
