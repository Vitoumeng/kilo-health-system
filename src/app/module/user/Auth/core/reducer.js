import { createSlice } from "@reduxjs/toolkit";

const initUser = {
  email: "",
  password: "",
};

const initialState = {
  login: initUser,
  profile: JSON.parse(localStorage.getItem("user") ?? "{}"),
  accessToken: localStorage.getItem("accessToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.accessToken = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setLogin: (state, action) => {
      const data = action.payload;
      state.login[data.name] = data.value;
    },
    setLogout: (state) => {
      state.login = initUser;
    },
  },
});

export const { setAuth, setLogin, setProfile, setLogout } = authSlice.actions;

export default authSlice.reducer;
