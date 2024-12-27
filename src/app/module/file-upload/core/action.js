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
      cancelButtonColor: "lightgrey",
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

  const onCreateFile = async (e, payload) => {
    e.preventDefault();

    try {
      const res = await reqCreateFile(payload);

      Swal.fire({
        icon: "success",
        title: "Upload File",
        text: "Successfully uploaded file",
      });
      console.log(res.data);

      navigate("/file");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error Creating file",
      });
    }
  };

  return {
    ...file,
    navigate,
    fetchFiles,
    onDeleteFile,
    onCreateFile,
  };
};

export default useFile;
