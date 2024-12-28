import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  reqCreateCategory,
  reqDeleteCategory,
  reqGetCategory,
  reqGetCategoryById,
  reqUpdateCategory,
} from "./request";
import {
  resetCategoryInfo,
  setCategory,
  setCategoryDetails,
  setCategoryInfo,
} from "./reducer";
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

  const onChangeAdd = (e) =>
    dispatch(setCategoryInfo({ name: e.target.name, value: e.target.value }));

  const onResetAdd = () => dispatch(resetCategoryInfo());

  const onCreateCategory = async (e) => {
    e.preventDefault();

    try {
      await reqCreateCategory(category.categoryInfo);
      Swal.fire({
        background: "#222525",
        color: "#fff",
        icon: "success",
        title: "Category Created",
        text: "Category has been successfully created!",
      });
      navigate("/category");
      onResetAdd();
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

  const fetchCategoryById = (id) => {
    return reqGetCategoryById(id).then((res) => {
      const categoryData = res.data.data;
      const updatedCategoryDetails = {
        ...categoryData,
        fileMediaId: categoryData.fileMedia?.id || null,
      };
      // console.log(updatedCategoryDetails);
      dispatch(setCategoryDetails(updatedCategoryDetails));
    });
  };

  const onChangeEdit = (e) =>
    dispatch(
      setCategoryDetails({
        ...category.categoryDetails,
        [e.target.name]: e.target.value,
      })
    );

  const onUpdateCategory = (e) => {
    e.preventDefault();

    let cate = category.categoryDetails;

    return reqUpdateCategory(cate.id, cate)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Edit Category",
          text: "Successfully edited",
        });
        fetchCategoryById(cate.id);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error Editing Category",
        });
      });
  };

  return {
    ...category,
    navigate,
    fetchCategory,
    onDeleteCategory,
    onChangeAdd,
    onCreateCategory,
    fetchCategoryById,
    onChangeEdit,
    onUpdateCategory,
  };
};

export default useCategory;
