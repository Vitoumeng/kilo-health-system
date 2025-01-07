import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { reqCreateFile, reqDeleteFile, reqGetFile } from "./request";
import { setFile } from "./reducer";
import Swal from "sweetalert2";

const useFile = () => {
  const file = useSelector((state) => state.file);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchFiles = (size = 20, page = 1, seatchText = "") => {
    return reqGetFile({ size, page, query: seatchText })
      .then((res) => {
        // console.log(res.data);
        dispatch(setFile(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDeleteFile = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      background: "#222525",
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: "lightcoral",
      cancelButtonColor: "gray",
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
    }).then((res) => {
      if (res.isConfirmed) {
        reqDeleteFile(id)
          .then(() => {
            Swal.fire({
              background: "#222525",
              color: "#fff",
              icon: "success",
              title: `Delete FIle ${id}`,
              text: "Successfully deleted",
            });
            fetchFiles();
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              background: "#222525",
              color: "#fff",
              text: "Error deleting File",
            });
            console.log(err);
          });
      }
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

  const onCreateFile = async (e, payload) => {
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

    formData.append("files", payload.file);

    return reqCreateFile(formData).then((res) => {
      Swal.fire({
        background: "#222525",
        color: "#fff",
        icon: "success",
        title: "Upload File",
        text: "File has been successfully uploaded!",
      });

      navigate("/file");
    });
  };

  return {
    ...file,
    navigate,
    fetchFiles,
    onDeleteFile,
    onCreateFile,
    handleFileChangeAdd,
  };
};

export default useFile;
