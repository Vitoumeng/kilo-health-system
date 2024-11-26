import axios from "axios";

const reqLogin = (payload) =>
  axios.post("/api/v1/auth/login", payload, {
    headers: { "Content-Type": "application/json", Authorization: "" },
  });

export { reqLogin };
