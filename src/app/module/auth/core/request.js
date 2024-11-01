import axios from "axios";

export const reqLogin = (payload) => axios.post(
    "http://13.214.207.172:7777/api/v1.0.0/auth/login",
    payload,
    { headers: { "Content-Type": "application/json", "Authorization": "" } }
);