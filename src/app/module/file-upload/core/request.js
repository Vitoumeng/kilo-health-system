import axios from "axios";

const reqGetFile = (param) => axios.get("/api/v1/files", { params: param });

const reqDeleteFile = (id) => axios.delete(`/api/v1/files/${id}`);

const reqCreateFile = (payload) => axios.post("/api/v1/files/upload", payload);

export { reqGetFile, reqDeleteFile, reqCreateFile };
