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
  },
});

export const { setRoles, setRoleInfo, resetRoleInfo } = roleSlice.actions;

export default roleSlice.reducer;
