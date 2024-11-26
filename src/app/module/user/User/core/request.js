import axios from "axios";

const reqGetUser = (param) => axios.get("/api/v1/users", { params: param });

const reqDeleteUser = (id) => axios.delete(`/api/v1/users/${id}/soft-delete`);

export { reqGetUser, reqDeleteUser };
