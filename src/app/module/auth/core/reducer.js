import { createSlice } from "@reduxjs/toolkit";
import { getAuth } from "../../../helper/authHelper";

const initUser = {
  email: "",
  password: "",
};

const initialState = {
  login: initUser,
  auth: getAuth(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      if (!action.payload) {
        state.auth = state.undefine;
        localStorage.removeItem("auth");
        return;
      }
      state.auth = action.payload;
      localStorage.setItem("auth", JSON.stringify(action.payload));
    },
    setLogin: (state, action) => {
      const data = action.payload;
      state.login[data.name] = data.value;
    },
  },
});

export const { setAuth, setLogin } = authSlice.actions;

export default authSlice.reducer;
