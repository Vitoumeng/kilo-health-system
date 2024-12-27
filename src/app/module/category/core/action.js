import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { reqGetCategory } from "./request";
import { setCategory } from "./reducer";

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

  return {
    ...category,
    navigate,
    fetchCategory,
  };
};

export default useCategory;
