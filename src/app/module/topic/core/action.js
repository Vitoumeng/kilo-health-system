import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  reqCreateTopic,
  reqDeleteTopic,
  reqGetTopic,
  reqGetTopicById,
  reqUpdateTopic,
} from "./request";
import {
  resetTopicInfo,
  setTopic,
  setTopicDetails,
  setTopicInfo,
} from "./reducer";
import Swal from "sweetalert2";
import { reqUpdateUser } from "../../user/User/core/request";

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

  const onChangeAdd = (e) =>
    dispatch(setTopicInfo({ name: e.target.name, value: e.target.value }));

  const onResetAdd = () => dispatch(resetTopicInfo());

  const onCreateTopic = async (e) => {
    e.preventDefault();

    try {
      await reqCreateTopic(topic.topicInfo);
      Swal.fire({
        background: "#222525",
        color: "#fff",
        icon: "success",
        title: "Topic Created",
        text: "Topic has been successfully created!",
      });
      navigate("/topic");
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

  const onDeleteTopic = (id) => {
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
        reqDeleteTopic(id)
          .then(() => {
            Swal.fire({
              background: "#222525",
              color: "#fff",
              icon: "success",
              title: `Delete Topic ${id}`,
              text: "Successfully deleted",
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

  const onUpdateTopic = (e) => {
    e.preventDefault();

    let topi = topic.topicDetails;

    return reqUpdateTopic(topi.id, topi)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Edit Topic",
          background: "#222525",
          color: "#fff",
          text: "Successfully edited",
        });
        fetchTopicById(topi.id);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          background: "#222525",
          color: "#fff",
          text: "Error Editing Topic",
        });
      });
  };

  const onChangeEdit = (e) =>
    dispatch(
      setTopicDetails({
        ...topic.topicDetails,
        [e.target.name]: e.target.value,
      })
    );

  return {
    ...topic,
    navigate,
    fetchTopic,
    onChangeAdd,
    onCreateTopic,
    onDeleteTopic,
    fetchTopicById,
    onChangeEdit,
    onUpdateTopic,
  };
};

export default useTopic;
