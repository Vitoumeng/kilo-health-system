import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { reqCreateTopic, reqGetTopic } from "./request";
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
      onResetAdd;
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
    ...topic,
    navigate,
    fetchTopic,
    onChangeAdd,
    onCreateTopic,
  };
};

export default useTopic;
