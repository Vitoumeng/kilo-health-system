import { createSlice } from "@reduxjs/toolkit";

const initTopic = {
  name: "",
  categoryId: null,
  fileMediaId: null,
};

const initalState = {
  topic: [],
  paging: {},
  topicInfo: initTopic,
};

const topicSlice = createSlice({
  name: "topic",
  initialState: initalState,
  reducers: {
    setTopic: (state, action) => {
      state.topic = action.payload.data;
      state.paging = action.payload.paging;
    },
    setTopicInfo: (state, action) => {
      const data = action.payload;
      state.topicInfo[data.name] = data.value;
    },
    resetTopicInfo: (state) => {
      state.topicInfo = initTopic;
    },
  },
});

export const { setTopic, setTopicInfo, resetTopicInfo } = topicSlice.actions;

export default topicSlice.reducer;
