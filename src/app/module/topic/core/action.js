import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  reqCreateTopic,
  reqDeleteTopic,
  reqGetTopic,
  reqGetTopicById,
  reqUpdateTopic,
} from "./request";
import { setTopic, setTopicDetails } from "./reducer";
import Swal from "sweetalert2";
import { reqCreateFile } from "../../file-upload/core/request";

const useTopic = () => {
  const topic = useSelector((state) => state.topic);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchTopic = (size = 20, page = 1, search = "") => {
    return reqGetTopic({ page, size, search })
      .then((res) => {
        // console.log(res.data);
        dispatch(setTopic(res.data));
      })
      .catch((err) => {
        console.log(err);
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

  const onCreateTopic = async (e, payload) => {
    e.preventDefault();

    const formData = new FormData();

    if (!payload) {
      Swal.fire({
        icon: "error",
        background: "#222525",
        color: "#fff",
        title: "Oops...",
        text: "Please fill in all required fields",
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
          text: "Failed to upload file",
        });
      }

      await reqCreateTopic({ ...payload, fileMediaId: mediaId });
      Swal.fire({
        background: "#222525",
        color: "#fff",
        icon: "success",
        title: "Topic Created",
        text: "Topic has been successfully created!",
      });
      navigate("/topic");
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

  const onDeleteTopic = (id) => {
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
        reqDeleteTopic(id)
          .then(() => {
            Swal.fire({
              background: "#222525",
              color: "#fff",
              icon: "success",
              title: `Delete Topic ${id}`,
              text: "Topic has been successfully deleted!",
            });
            fetchTopic();
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              background: "#222525",
              color: "#fff",
              text: "Error deleting Topic",
            });
            console.log(err);
          });
      }
    });
  };

  const fetchTopicById = (id) => {
    return reqGetTopicById(id)
      .then((res) => {
        // console.log(res.data.data);
        const topicData = res.data.data;
        const updatedTopicDetails = {
          ...topicData,
          fileMediaId: topicData.fileMedia?.id || null,
          categoryId: topicData.category?.id || null,
        };
        dispatch(setTopicDetails(updatedTopicDetails));
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const handleChangeEdit = (e, payload, setPayload) =>
    setPayload({ ...payload, [e.target.name]: e.target.value });

  const onUpdateTopic = async (e, payload) => {
    e.preventDefault();

    if (payload === topic.topicDetails) {
      Swal.fire({
        icon: "info",
        background: "#222525",
        color: "#fff",
        title: "No Changes Detected",
        text: "The topic details remain unchanged.",
      });
      return;
    }
    return reqUpdateTopic(payload.id, payload)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Edit Topic",
          background: "#222525",
          color: "#fff",
          text: "Topic has been successfully edited!",
        });
        navigate("/topic");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          background: "#222525",
          color: "#fff",
          text: "Error Editing topic",
        });
        console.log(err);
      });
  };

  return {
    ...topic,
    navigate,
    fetchTopic,
    handleChangeAdd,
    handleFileChangeAdd,
    onCreateTopic,
    onDeleteTopic,
    fetchTopicById,
    handleChangeEdit,
    onUpdateTopic,
  };
};

export default useTopic;
