import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  pagination: {},
  profile: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.users = action.payload.data;
      state.pagination = action.payload.paging;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { setUser, setProfile } = userSlice.actions;
export default userSlice.reducer;
