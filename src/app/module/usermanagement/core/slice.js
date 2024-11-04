import { createSlice } from "@reduxjs/toolkit";

const initUser = {
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
  userDetails: [],
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
    setUserDetails(state, action) {
      state.userDetails = action.payload;
    },
  },
});

export const { setUser, setProfile, setUserInfo, setRole, setUserDetails } = userSlice.actions;
export default userSlice.reducer;
