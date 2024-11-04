import { useDispatch, useSelector } from "react-redux";
import { reqGetRole } from "./request";
import { setRole } from "./slice";

const useRole = () => {
  const role = useSelector((state) => state.role);
  const dispatch = useDispatch();

  const fetchRole = () => {
    return reqGetRole()
      .then((res) => {
        dispatch(setRole(res.data.data));
      })
      .catch((err) => {
        console.log("Error");
      });
  };
  return { role, fetchRole };
};

export default useRole;
