import axios from "axios";

const reqGetUser = (param) => axios.get("/api/v1/users", { params: param });

const reqDeleteUser = (id) => axios.delete(`/api/v1/users/${id}/soft-delete`);

const reqGetUserById = (id) => axios.get(`/api/v1/users/${id}`);

const reqCreateUser = (payload) =>
  axios.post("/api/v1/users", payload, {
    headers: { "Content-Type": "application/json" },
  });

export { reqGetUser, reqDeleteUser, reqGetUserById, reqCreateUser };
