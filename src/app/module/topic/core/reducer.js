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
  topicDetails: [],
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
    setTopicDetails: (state, action) => {
      state.topicDetails = action.payload;
    },
  },
});

export const { setTopic, setTopicInfo, resetTopicInfo, setTopicDetails } =
  topicSlice.actions;

export default topicSlice.reducer;
