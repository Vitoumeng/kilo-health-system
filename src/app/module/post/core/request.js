import axios from "axios";

const reqGetPost = (param) => axios.get("/api/v1/posts", { params: param });

const reqDeletePost = (id) => axios.delete(`/api/v1/posts/${id}/deletedPost`);

export { reqGetPost, reqDeletePost };
