import { useDispatch, useSelector } from "react-redux";
import {
  reqCreateUser,
  reqDeleteUser,
  reqGetUser,
  reqGetUserById,
  reqUpdateUser,
} from "./request";
import {
  resetUserInfo,
  setUserDetails,
  setUserInfo,
  setUsers,
} from "./reducer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useRole from "../../Role/core/action";

const useUser = () => {
  const user = useSelector((state) => state.user);
  const { roles } = useRole();
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

  const fetchUserById = async (userId) => {
    return reqGetUserById(userId).then((res) => {
      const userData = res.data.data;

      const updatedUserData = {
        ...userData,
        roleId: userData.role?.id || null,
      };

      dispatch(setUserDetails(updatedUserData));
    });
  };

  const onChangeEdit = (e) => {
    const { name, value } = e.target;

    if (name === "roleId") {
      const selectedRole = roles.find((role) => role.id === value);

      dispatch(
        setUserDetails({
          ...user.userDetails,
          role: selectedRole,
          roleId: value,
        })
      );
    } else {
      dispatch(
        setUserDetails({
          ...user.userDetails,
          [name]: value,
        })
      );
    }
  };

  const onUpdateUser = (e) => {
    e.preventDefault();

    let userDetails = { ...user.userDetails };
    delete userDetails.role;

    return reqUpdateUser(userDetails.id, userDetails)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Edit User",
          text: "Successfully edited",
        });
        fetchUserById(userDetails.id);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error Editing user",
        });
      });
  };

  return {
    ...user,
    fetchUsers,
    onDeleteUser,
    fetchUserById,
    navigate,
    onChangeAdd,
    onCreateUser,
    onChangeEdit,
    onUpdateUser
  };
};

export default useUser;
