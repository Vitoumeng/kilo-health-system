import axios from "axios";

const reqGetUser = (param) => axios.get("/api/v1/users", { params: param });

const reqDeleteUser = (id) => axios.delete(`/api/v1/users/${id}/soft-delete`);

const reqGetUserById = (id) => axios.get(`/api/v1/users/${id}`);

const reqUpdateUser = (id, payload) =>
  axios.put(`/api/v1/users/${id}/update`, payload, {
    headers: { "Content-Type": "application/json" },
  });

const reqCreateUser = (payload) =>
  axios.post("/api/v1/users", payload, {
    headers: { "Content-Type": "application/json" },
  });

export { reqGetUser, reqDeleteUser, reqGetUserById, reqCreateUser, reqUpdateUser };
