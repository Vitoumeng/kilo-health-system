import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roles: [],
  paging: {},
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setRoles: (state, action) => {
      state.roles = action.payload.data;
      state.paging = action.payload.paging;
    },
  },
});

export const { setRoles } = roleSlice.actions;

export default roleSlice.reducer;
