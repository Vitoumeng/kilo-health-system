import { createSlice } from "@reduxjs/toolkit";

const initRole = {
  code: "",
  name: "",
  module: "",
};

const initialState = {
  roles: [],
  paging: {},
  roleInfo: initRole,
  role: null,
  permissions: [],
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setRoles: (state, action) => {
      state.roles = action.payload.data;
      state.paging = action.payload.paging;
    },
    setRoleInfo: (state, action) => {
      const data = action.payload;
      state.roleInfo[data.name] = data.value;
    },
    resetRoleInfo: (state) => {
      state.roleInfo = initRole;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setPermissions: (state, action) => {
      state.permissions = action.payload;
    },
    updatePermissions: (state, action) => {
      const per = state.permissions.find((per) => per.id == action.payload);
      per.status = !per.status;
    },
  },
});

export const {
  setRoles,
  setRoleInfo,
  resetRoleInfo,
  setRole,
  setPermissions,
  updatePermissions,
} = roleSlice.actions;

export default roleSlice.reducer;
