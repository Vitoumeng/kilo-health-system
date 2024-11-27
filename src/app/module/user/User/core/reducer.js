import { createSlice } from "@reduxjs/toolkit";

const initUser = {
  username: "",
  email: "",
  address: "",
  password: "",
  phone: "",
  firstname: "",
  lastname: "",
  dob: "",
  gender: "Male",
};

const initialState = {
  users: [],
  paging: {},
  userInfo: initUser,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload.data;
      state.paging = action.payload.paging;
    },
    setUserInfo: (state, action) => {
      const data = action.payload;
      state.userInfo[data.name] = data.value;
    },
  },
});

export const { setUsers, setUserInfo } = userSlice.actions;

export default userSlice.reducer;
