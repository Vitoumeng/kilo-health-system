import axios from "axios";

const reqGetRole = (param) =>
  axios.get("/api/v1/roles", {
    params: param,
  });

export { reqGetRole };
