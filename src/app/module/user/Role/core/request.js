import axios from "axios";

const reqGetRole = (param) =>
  axios.get("/api/v1/roles", {
    params: param,
  });

const reqCreateRole = (payload) =>
  axios.post("/api/v1/roles", payload, {
    headers: { "Content-Type": "application/json" },
  });

const reqDeleteRole = (id) => axios.delete(`/api/v1/roles/${id}/soft-delete`);

const reqGetRoleById = (id) => axios.get(`/api/v1/roles/${id}`);

const reqGetPermissions = (param) =>
  axios.get(`/api/v1/roles/listPermissions`, { params: {size: 100 ,...param} });

export {
  reqGetRole,
  reqCreateRole,
  reqDeleteRole,
  reqGetRoleById,
  reqGetPermissions,
};
