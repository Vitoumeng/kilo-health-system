import axios from "axios";

const reqGetUser = (param) => axios.get("/api/v1/users", { params: param });

export { reqGetUser };
