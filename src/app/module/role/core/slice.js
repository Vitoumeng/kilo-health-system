import { createSlice } from "@reduxjs/toolkit";

const initState = {
  data: {
    data: [],
    paging: {},
    loading: false,
  },
  role: null,
  permissions: [],
};

const rolesSlice = createSlice({
  name: "roles",
  initialState: initState,
  reducers: {
    setRoles(state, action) {
      state.data = action.payload.data;
    },
    setRole(state, action) {
      state.role = action.payload;
    },
    setPermissions(state, action) {
      state.permissions = action.payload;
    },
    updatePermissions(state, action) {
      const per = state.permissions.find((per) => per.id === action.payload);
      per.status = !per.status;
    },
    toggleAllPermissions(state, action) {
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
} = rolesSlice.actions;

export default rolesSlice.reducer;
