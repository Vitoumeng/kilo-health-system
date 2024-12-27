import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { reqGetFile } from "./request";
import { setFile } from "./reducer";

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

  return {
    ...file,
    navigate,
    fetchFiles,
  };
};

export default useFile;
