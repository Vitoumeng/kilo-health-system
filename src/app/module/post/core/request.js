import axios from "axios";

const reqGetPost = (param) => axios.get("/api/v1/posts", { params: param });

export { reqGetPost };
