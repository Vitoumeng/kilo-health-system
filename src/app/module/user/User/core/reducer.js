import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  paging: {},
  userDetails: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload.data;
      state.paging = action.payload.paging;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

export const { setUsers, setUserDetails } = userSlice.actions;

export default userSlice.reducer;
