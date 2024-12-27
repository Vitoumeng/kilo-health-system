import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { reqDeleteCategory, reqGetCategory } from "./request";
import { setCategory } from "./reducer";
import Swal from "sweetalert2";

const useCategory = () => {
  const category = useSelector((state) => state.category);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchCategory = (size = 20, page = 1, search = "") => {
    return reqGetCategory({ size, page, query: search })
      .then((res) => {
        dispatch(setCategory(res.data));
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDeleteCategory = (id) => {
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
        reqDeleteCategory(id)
          .then(() => {
            Swal.fire({
              background: "#222525",
              color: "#fff",
              icon: "success",
              title: `Delete Category ${id}`,
              text: "Successfully deleted",
            });
            fetchCategory();
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              background: "#222525",
              color: "#fff",
              text: "Error deleting Category",
            });
            console.log(err);
          });
      }
    });
  };

  return {
    ...category,
    navigate,
    fetchCategory,
    onDeleteCategory
  };
};

export default useCategory;
