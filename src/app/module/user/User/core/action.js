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
import { reqCreateFile } from "../../../file-upload/core/request";

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

  const handleFileChangeAdd = (
    e,
    setError,
    setPayload,
    payload,
    fileInputRef,
    setPreview
  ) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileSizeInMB = selectedFile.size / (1024 * 1024);
      if (fileSizeInMB > 1) {
        setError(
          `File size is ${fileSizeInMB.toFixed(2)}MB; must be under 1MB.`
        );
        fileInputRef.current.value = "";
        setPreview(null);
        return;
      }
      setError(null);
      setPayload({ ...payload, file: selectedFile });
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleChangeAdd = (e, payload, setPayload) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const onCreateUser = async (e, payload) => {
    e.preventDefault();

    const formData = new FormData();

    if (!payload) {
      Swal.fire({
        icon: "error",
        background: "#222525",
        color: "#fff",
        title: "Oops...",
        text: "Please upload a file.",
      });
      return;
    }

    try {
      formData.append("files", payload.file);

      const fileResponse = await reqCreateFile(formData);
      const mediaId = fileResponse.data?.data?.[0]?.id;

      if (!mediaId) {
        Swal.fire({
          icon: "error",
          background: "#222525",
          color: "#fff",
          title: "Oops...",
          text: "mediaId is null. Please upload again.",
        });
      }

      await reqCreateUser({ ...payload, fileMediaId: mediaId });
      Swal.fire({
        background: "#222525",
        color: "#fff",
        icon: "success",
        title: "User Created",
        text: "User has been successfully created!",
      });
      navigate("/user");
    } catch (err) {
      const formattedErrors = err.response?.data?.data
        .map((message) => `<li>${message}</li>`)
        .join("");

      Swal.fire({
        icon: "error",
        background: "#222525",
        color: "#fff",
        title: "Oops...",
        html: `<ul style="list-style: none; text-align: start; row-gap: 1rem">
          <li>${formattedErrors}</li>
        </ul>`,
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
          background: "#222525",
          color: "#fff",
          text: "Successfully edited",
        });
        fetchUserById(userDetails.id);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          background: "#222525",
          color: "#fff",
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
    handleChangeAdd,
    handleFileChangeAdd,
    onCreateUser,
    onChangeEdit,
    onUpdateUser,
  };
};

export default useUser;
