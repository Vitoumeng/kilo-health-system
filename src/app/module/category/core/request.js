import axios from "axios";

const reqGetCategory = (param) =>
  axios.get("/api/v1/category", { params: param });

const reqDeleteCategory = (id) => axios.delete(`/api/v1/category/${id}`);

export { reqGetCategory, reqDeleteCategory };
