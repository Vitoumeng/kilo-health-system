import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { reqCreateTopic, reqDeleteTopic, reqGetTopic } from "./request";
import { resetTopicInfo, setTopic, setTopicInfo } from "./reducer";
import Swal from "sweetalert2";

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

  return {
    ...topic,
    navigate,
    fetchTopic,
    onChangeAdd,
    onCreateTopic,
    onDeleteTopic,
  };
};

export default useTopic;
