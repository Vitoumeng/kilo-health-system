import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    data: [],
    paging: {},
  },
  role: null,
  permissions: [],
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setRoles: (state, action) => {
      state.data = action.payload.data;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setPermissions: (state, action) => {
      state.permissions = action.payload;
    },
    updatePermissions: (state, action) => {
      const per = state.permissions.find((per) => per.id === action.payload);
      per.status = !per.status;
    },
    toggleAllPermissions: (state, action) => {
      state.permissions = state.permissions.map((per) => ({
        ...per,
        status: action.payload,
      }));
    },
  },
});

export const {
  setRoles,
  setRole,
  setPermissions,
  updatePermissions,
  toggleAllPermissions,
} = roleSlice.actions;

export default roleSlice.reducer;
