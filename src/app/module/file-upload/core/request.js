import axios from "axios";

const reqGetFile = (param) => axios.get("/api/v1/files", { params: param });

export { reqGetFile };
