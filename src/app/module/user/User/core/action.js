import { useDispatch, useSelector } from "react-redux";
import {
  reqCreateUser,
  reqDeleteUser,
  reqGetUser,
  reqGetUserById,
} from "./request";
import { resetUserInfo, setUserInfo, setUsers } from "./reducer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const useUser = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUsers = (size = 20, page = 1, search = "") => {
    reqGetUser({ size, page, query: search })
      .then((res) => {
        // console.log(res.data);
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

  const onChangeAdd = (e) =>
    dispatch(setUserInfo({ name: e.target.name, value: e.target.value }));

  const onCreateUser = async (e) => {
    e.preventDefault();

    try {
      await reqCreateUser(user.userInfo);
      Swal.fire({
        background: "#222525",
        color: "#fff",
        icon: "success",
        title: "User Created",
        text: "User has been successfully created!",
      });
      navigate("/user");
      dispatch(resetUserInfo());
    } catch (err) {
      const errorMessages = err.response?.data?.data || [
        "Duplicate Phone Number!",
      ];

      const formattedErrors = errorMessages
        .map((message) => `<li>${message}</li>`)
        .join("");

      Swal.fire({
        icon: "error",
        background: "#222525",
        color: "#fff",
        title: "Oops...",
        html: `<ul style="list-style: none">${formattedErrors}</ul>`,
      });

      console.error("Error details:", err.response?.data);
    }
  };

  return {
    ...user,
    fetchUsers,
    onDeleteUser,
    fetchUsersById,
    navigate,
    onChangeAdd,
    onCreateUser,
  };
};

export default useUser;
