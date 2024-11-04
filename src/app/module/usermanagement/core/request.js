import axios from "axios";

export const reqGetUsers = (param = {}) => {
  return axios.get("/api/v1.0.0/user", param);
};

export const reqGetUserProfile = () => {
  return axios.get("/api/v1.0.0/user/profile");
};

export const reqDeleteUser = (id) => {
  return axios.delete(`/api/v1.0.0/user/${id}`);
};

export const reqCreateUser = (formData) => {
  return axios.post("/api/v1.0.0/user", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const reqGetUserById = (id) => {
  return axios.get(`/api/v1.0.0/user/${id}`);
};

export const reqGetRole = () => {
  return axios.get("api/v1.0.0/role");
};

export const reqUpdateUser = (id, payload) => {
  return axios.put(`/api/v1.0.0/user/${id}`, payload, {
    headers: {
      "Content-Type": "multipart/form-data", 
    },
  });
};
