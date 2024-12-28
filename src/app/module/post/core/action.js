import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { reqCreatePost, reqDeletePost, reqGetPost } from "./request";
import { setPost, setPostInfo } from "./reducer";
import Swal from "sweetalert2";
import moment from "moment";

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

  const onChangeAdd = (e) =>
    dispatch(setPostInfo({ name: e.target.name, value: e.target.value }));

  const onCreatePost = async (e) => {
    e.preventDefault();

    const formattedPublicAt = moment(post.postInfo.publicAt).format(
      "YYYY-MM-DD HH:mm:ss"
    );

    const updatedPostInfo = { ...post.postInfo, publicAt: formattedPublicAt };

    try {
      await reqCreatePost(updatedPostInfo); 
      Swal.fire({
        background: "#222525",
        color: "#fff",
        icon: "success",
        title: "Post Created",
        text: "Post has been successfully created!",
      });
      navigate("/post");
      // dispatch(resetUserInfo());
    } catch (err) {
      Swal.fire({
        icon: "error",
        background: "#222525",
        color: "#fff",
        title: "Oops...",
        text: err?.message,
      });

      console.error("Error details:", err.response?.data);
    }
  };

  return {
    ...post,
    fetchPost,
    navigate,
    onDeletePost,
    onChangeAdd,
    onCreatePost,
  };
};

export default usePost;
