import { useDispatch, useSelector } from "react-redux";
import { reqDeleteUser, reqGetUserProfile, reqGetUsers } from "./request";
import { setUser } from "./slice";
import Swal from "sweetalert2";

const useUser = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const fetchUser = async (params) => {
    try {
      const res = await reqGetUsers({
        size: 10,
        page: params,
      });
      // console.log(res.data);
      dispatch(setUser(res.data));
    } catch (err) {
      console.log("Error");
    }
  };

  const fetchUserProfile = async (payload) => {
    try {
      const res = await reqGetUserProfile(payload);
      console.log(res.data);
    } catch (err) {
      console.log("Error");
    }
  };

  const onDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      confirmButtonColor: "lightcoral",
      confirmButtonText: "OK",
    }).then((res) => {
      if (res.isConfirmed) {
        reqDeleteUser(id)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Delete User",
              text: "Successfully deleted",
            });
            fetchUser(1);
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Error deleting user",
            });
            console.log(err);
          });
      }
    });
  };

  return { ...user, fetchUser, fetchUserProfile, onDeleteUser };
};

export default useUser;
