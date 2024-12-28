import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { reqGetTopic } from "./request";
import { setTopic } from "./reducer";

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

  return {
    ...topic,
    navigate,
    fetchTopic,
  };
};

export default useTopic;
