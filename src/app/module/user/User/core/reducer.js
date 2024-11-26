import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  paging: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload.data;
      state.paging = action.payload.paging;
    },
  },
});

export const { setUsers } = userSlice.actions;

export default userSlice.reducer;

