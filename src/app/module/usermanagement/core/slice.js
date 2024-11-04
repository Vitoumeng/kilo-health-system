import { createSlice } from "@reduxjs/toolkit";

const initUser = {
  avatar: null,
  name: "",
  username: "",
  email: "",
  address: "",
  password: "",
  phone: "",
  bio: "",
};

const initialState = {
  users: [],
  pagination: {},
  profile: [],
  userInfo: initUser,
  role: [],
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
    setUserInfo(state, action) {
      const data = action.payload;
      state.userInfo[data.name] = data.value;
    },
    setRole(state, action) {
      state.role = action.payload;
    },
  },
});

export const { setUser, setProfile, setUserInfo, setRole } = userSlice.actions;
export default userSlice.reducer;
