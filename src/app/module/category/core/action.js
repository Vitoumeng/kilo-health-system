import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  reqCreateCategory,
  reqDeleteCategory,
  reqGetCategory,
  reqGetCategoryById,
  reqUpdateCategory,
} from "./request";
import { setCategory, setCategoryDetails } from "./reducer";
import Swal from "sweetalert2";
import { reqCreateFile } from "../../file-upload/core/request";

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

  const onCreateCategory = async (e, payload) => {
    e.preventDefault();
    const formData = new FormData();

    if (!payload.file) {
      Swal.fire({
        icon: "error",
        background: "#222525",
        color: "#fff",
        title: "Oops...",
        text: "Please upload a file.",
      });
      return;
    }

    try {
      formData.append("files", payload.file);

      const fileResponse = await reqCreateFile(formData);
      const mediaId = fileResponse.data?.data?.[0]?.id;

      if (!mediaId) {
        Swal.fire({
          icon: "error",
          background: "#222525",
          color: "#fff",
          title: "Oops...",
          text: "mediaId is null. Please upload again.",
        });
      }

      await reqCreateCategory({
        name: payload.name,
        mediaId: mediaId,
      });

      Swal.fire({
        background: "#222525",
        color: "#fff",
        icon: "success",
        title: "Category Created",
        text: "Category has been successfully created!",
      });

      navigate("/category");
    } catch (err) {
      Swal.fire({
        icon: "error",
        background: "#222525",
        color: "#fff",
        title: "Oops...",
        text: err?.message || "Something went wrong. Please try again.",
      });

      console.error("Error details:", err.response?.data || err);
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

  const handleFileChangeAdd = (
    e,
    setError,
    setPayload,
    payload,
    fileInputRef,
    setPreview
  ) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileSizeInMB = selectedFile.size / (1024 * 1024);
      if (fileSizeInMB > 1) {
        setError(
          `File size is ${fileSizeInMB.toFixed(2)}MB; must be under 1MB.`
        );
        fileInputRef.current.value = "";
        setPreview(null);
        return;
      }
      setError(null);
      setPayload({ ...payload, file: selectedFile });
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleChangeAdd = (e, payload, setPayload) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const handleFileChangeEdit = (
    e,
    setError,
    setPayload,
    payload,
    fileInputRef,
    setPreview
  ) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileSizeInMB = selectedFile.size / (1024 * 1024);
      if (fileSizeInMB > 1) {
        setError(
          `File size is ${fileSizeInMB.toFixed(2)}MB; must be under 1MB.`
        );
        fileInputRef.current.value = "";
        setPreview(null);
        return;
      }
      setError(null);
      setPayload({ ...payload, file: selectedFile });
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleChangeEdit = (e, payload, setPayload) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const onUpdateCategory = async (e, payload) => {
    e.preventDefault();

    if (!payload.file) {
      Swal.fire({
        icon: "error",
        background: "#222525",
        color: "#fff",
        title: "Oops...",
        text: "Please upload a file.",
      });
      return reqUpdateCategory(payload.id, payload)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Edit Category",
            text: "Successfully edited",
          });
          fetchCategoryById(payload.id);
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error Editing Category",
          });
          console.log(err);
        });
    } else {
      const formData = new FormData();
      formData.append("files", payload.file);

      try {
        const fileRes = await reqCreateFile(formData);
        const mediaId = fileRes.data?.data?.[0]?.id;

        if (!mediaId) {
          Swal.fire({
            icon: "error",
            background: "#222525",
            color: "#fff",
            title: "Oops...",
            text: "mediaId is null. Please upload again.",
          });
          return;
        }

        await reqUpdateCategory(payload.id, { ...payload, fileMediaId: mediaId });
        Swal.fire({
          background: "#222525",
          color: "#fff",
          icon: "success",
          title: "Category Updated",
          text: "Successfully edited",
        });

        fetchCategoryById(payload.id);
      } catch (err) {
        Swal.fire({
          icon: "error",
          background: "#222525",
          color: "#fff",
          title: "Oops...",
          text: err?.message || "Something went wrong. Please try again.",
        });
        console.error("Error details:", err.response?.data || err);
      }
    }
  };

  return {
    ...category,
    navigate,
    fetchCategory,
    onDeleteCategory,
    handleFileChangeAdd,
    handleChangeAdd,
    onCreateCategory,
    fetchCategoryById,
    handleChangeEdit,
    handleFileChangeEdit,
    onUpdateCategory,
  };
};

export default useCategory;
