import axios from "axios";

export const reqLogin = (payload) => axios.post("/api/v1/auth/login", payload);
