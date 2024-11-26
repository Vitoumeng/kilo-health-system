import { useDispatch, useSelector } from "react-redux";
import { reqGetRole } from "./request";
import { setRoles } from "./reducer";

const useRole = () => {
  const role = useSelector((state) => state.role);
  const dispatch = useDispatch();

  const fetchRole = (size = 20, page = 1) => {
    reqGetRole({ size, page })
      .then((res) => {
        console.log(res.data);
        dispatch(setRoles(res.data));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return { ...role, fetchRole };
};

export default useRole;
