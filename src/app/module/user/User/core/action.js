import { useDispatch, useSelector } from "react-redux";
import { reqGetUser } from "./request";
import { setUsers } from "./reducer";

const useUser = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const fetchUsers = (size = 20, page = 1) => {
    reqGetUser({ size, page })
      .then((res) => {
        console.log(res.data);
        dispatch(setUsers(res.data));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return { ...user, fetchUsers };
};

export default useUser;
