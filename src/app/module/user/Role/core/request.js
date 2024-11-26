import axios from "axios";

const reqGetRole = (param) =>
  axios.get("/api/v1/roles", {
    params: param,
  });

const reqCreateRole = (payload) =>
  axios.post("/api/v1/roles", payload, {
    headers: { "Content-Type": "application/json" },
  });

export { reqGetRole, reqCreateRole };
