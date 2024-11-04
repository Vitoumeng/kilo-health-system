import axios from "axios";

export const reqGetUsers = (param = {}) => {
  return axios.get("http://13.214.207.172:7777/api/v1.0.0/user", param);
};

export const reqGetUserProfile = () => {
  return axios.get("http://13.214.207.172:7777/api/v1.0.0/user/profile");
};

export const reqDeleteUser = (id) => {
  return axios.delete(`http://13.214.207.172:7777/api/v1.0.0/user/${id}`);
};
