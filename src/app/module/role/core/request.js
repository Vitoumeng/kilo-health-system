import axios from "axios";

export const reqGetRole = () => {
  return axios.get("api/v1.0.0/role");
};
