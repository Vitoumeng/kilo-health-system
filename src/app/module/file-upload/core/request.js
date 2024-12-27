import axios from "axios";

const reqGetFile = (param) => axios.get("/api/v1/files", { params: param });

const reqDeleteFile = (id) => axios.delete(`/api/v1/files/${id}`);

export { reqGetFile, reqDeleteFile };
