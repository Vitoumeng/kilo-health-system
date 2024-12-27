import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { reqGetPost } from "./request";
import { setPost } from "./reducer";

const usePost = () => {
  const post = useSelector((state) => state.post);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchPost = (size = 20, page = 1, search = "") => {
    return reqGetPost({ size: size, page: page, quewy: search })
      .then((res) => {
        // console.log(res.data);
        dispatch(setPost(res.data));
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  return {
    ...post,
    fetchPost,
    navigate,
  };
};

export default usePost;
