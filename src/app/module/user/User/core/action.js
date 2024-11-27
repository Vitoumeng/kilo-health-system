import { useDispatch, useSelector } from "react-redux";
import { reqDeleteUser, reqGetUser, reqGetUserById } from "./request";
import { setUsers } from "./reducer";
import Swal from "sweetalert2";

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

  const onDeleteUser = (id) => {
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
        reqDeleteUser(id)
          .then(() => {
            Swal.fire({
              background: "#222525",
              color: "#fff",
              icon: "success",
              title: `Delete User ${id}`,
              text: "Successfully deleted",
            });
            fetchUsers();
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              background: "#222525",
              color: "#fff",
              text: "Error deleting user",
            });
            console.log(err);
          });
      }
    });
  };

  const fetchUsersById = (id) => {
    reqGetUserById(id).then((res) => {
      console.log(res.data);
    });
  };

  return { ...user, fetchUsers, onDeleteUser, fetchUsersById };
};

export default useUser;
