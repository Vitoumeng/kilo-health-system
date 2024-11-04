import {createSlice} from "@reduxjs/toolkit";
import {getAuth} from "../../../helper/authHelper";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        auth: getAuth()
    },
    reducers: {
        setAuth: (state, action) => {
            if(!action.payload){
                state.auth = undefined;
                localStorage.removeItem("auth");
                return
            }
            state.auth = action.payload;
            localStorage.setItem("auth", JSON.stringify(action.payload));
        }
    }
})

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;