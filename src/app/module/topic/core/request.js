import axios from "axios";

const reqGetTopic = (param) => axios.get("/api/v1/topics", { params: param });

const reqCreateTopic = (payload) => axios.post("/api/v1/topics", payload);

export { reqGetTopic, reqCreateTopic };
