import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { reqDeletePost, reqGetPost } from "./request";
import { setPost } from "./reducer";
import Swal from "sweetalert2";

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

  const onDeletePost = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      background: "#222525",
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: "lightcoral",
      cancelButtonColor: "lightgrey",
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
    }).then((res) => {
      if (res.isConfirmed) {
        reqDeletePost(id)
          .then(() => {
            Swal.fire({
              background: "#222525",
              color: "#fff",
              icon: "success",
              title: `Delete post ${id}`,
              text: "Successfully deleted",
            });
            fetchPost();
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              background: "#222525",
              color: "#fff",
              text: "Error deleting post",
            });
            console.log(err);
          });
      }
    });
  };

  return {
    ...post,
    fetchPost,
    navigate,
    onDeletePost,
  };
};

export default usePost;
