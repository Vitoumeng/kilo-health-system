import axios from "axios";

const reqGetTopic = (param) => axios.get("/api/v1/topics", { params: param });

const reqCreateTopic = (payload) => axios.post("/api/v1/topics", payload);

const reqDeleteTopic = (id) => axios.delete(`/api/v1/topics/delete/${id}`);

const reqGetTopicById = (id) => axios.get(`/api/v1/topics/${id}`);

const reqUpdateTopic = (id, payload) =>
  axios.put(`/api/v1/topics/update/${id}`, payload);

export {
  reqGetTopic,
  reqCreateTopic,
  reqDeleteTopic,
  reqGetTopicById,
  reqUpdateTopic,
};
