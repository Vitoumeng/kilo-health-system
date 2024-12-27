import axios from "axios";

const reqGetCategory = (param) =>
  axios.get("/api/v1/category", { params: param });

export { reqGetCategory };
