import axios from "axios";

const reqGetTopic = (param) => axios.get("/api/v1/topics", { params: param });

export { reqGetTopic };
