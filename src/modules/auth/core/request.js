import axios from "axios";

const reqLogin = (payload) => {
  return axios.post("api/v1.0.0/auth/login", payload);
};

export { reqLogin };
