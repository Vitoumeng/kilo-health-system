import axios from "axios";

const reqGetRoles = () => {
  return axios.get("/api/v1/roles");
};

const reqGetRoleById = (id) => {
  return axios.get(`/api/v1/roles/${id}`);
};

const reqCreateRole = (payload) => axios.post("/api/v1/roles", payload);

const reqDeleteRole = (id) => axios.delete(`/api/v1/roles/${id}/soft-delete`);

const reqGetPermissions = (params) => {
  return axios.get("/api/v1/roles/listPermissions", {
    params: { size: 50, ...params },
  });
};

const reqSetPermissions = (payload) => {
  return axios.put("/api/v1/roles/assignPermission", payload);
};

export {
  reqGetRoles,
  reqGetRoleById,
  reqCreateRole,
  reqDeleteRole,
  reqGetPermissions,
  reqSetPermissions,
};
