import { useDispatch, useSelector } from "react-redux";
import {
  reqCreateUser,
  reqDeleteUser,
  reqGetUser,
  reqGetUserById,
  reqUpdateUser,
} from "./request";
import { setUserDetails, setUsers } from "./reducer";
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
      cancelButtonColor: "gray",
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
              text: "User has been successfully deleted!",
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
        fileMediaId: userData.fileMedia?.id || null,
      };

      dispatch(setUserDetails(updatedUserData));
    });
  };

  const handleFileChangeEdit = (
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

  const handleChangeEdit = (e, payload, setPayload) => {
    const { name, value } = e.target;
    if (name === "roleId") {
      const selectedRole = roles.find((role) => role.id === value);

      setPayload({ ...payload, role: selectedRole, roleId: value });
    } else {
      setPayload({ ...payload, [name]: value });
    }
  };

  const onUpdateUser = async (e, payload) => {
    e.preventDefault();

    if (!payload.file) {
      if (payload === user.userDetails) {
        Swal.fire({
          icon: "info",
          background: "#222525",
          color: "#fff",
          title: "No Changes Detected",
          text: "The user details remain unchanged.",
        });
        return;
      }

      return reqUpdateUser(payload.id, payload)
        .then(() => {
          Swal.fire({
            icon: "success",
            background: "#222525",
            color: "#fff",
            title: "Edit User",
            text: "User has been successfully edited!",
          });
          fetchUserById(payload.id);
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            background: "#222525",
            color: "#fff",
            text: "Error Editing user",
          });
          console.log(err);
        });
    } else {
      const formData = new FormData();
      formData.append("files", payload.file);

      try {
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
          return;
        }

        await reqUpdateUser(payload.id, { ...payload, fileMediaId: mediaId });
        Swal.fire({
          icon: "success",
          title: "Edit User",
          background: "#222525",
          color: "#fff",
          text: "Edit has been successfully edited!",
        });
        fetchUserById(payload.id);
      } catch (err) {
        Swal.fire({
          icon: "error",
          background: "#222525",
          color: "#fff",
          title: "Oops...",
          text: err?.message || "Something went wrong. Please try again.",
        });
        console.error("Error details:", err.response?.data || err);
      }
    }
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
    handleChangeEdit,
    handleFileChangeEdit,
    onUpdateUser,
  };
};

export default useUser;
