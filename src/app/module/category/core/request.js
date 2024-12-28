import axios from "axios";

const reqGetCategory = (param) =>
  axios.get("/api/v1/category", { params: param });

const reqDeleteCategory = (id) => axios.delete(`/api/v1/category/${id}`);

const reqCreateCategory = (payload) => axios.post("/api/v1/category", payload);

const reqGetCategoryById = (id) => axios.get(`/api/v1/category/${id}`);

const reqUpdateCategory = (id, payload) =>
  axios.put(`/api/v1/category/${id}`, payload);

export {
  reqGetCategory,
  reqDeleteCategory,
  reqCreateCategory,
  reqGetCategoryById,
  reqUpdateCategory,
};
