import { useDispatch, useSelector } from "react-redux";
import {
  reqCreateUser,
  reqDeleteUser,
  reqGetRole,
  reqGetUserById,
  reqGetUserProfile,
  reqGetUsers,
  reqUpdateUser,
} from "./request";
import { setRole, setUser, setUserDetails, setUserInfo } from "./slice";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const useUser = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRole();
  }, []);

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

  const fetchRole = () => {
    return reqGetRole()
      .then((res) => {
        dispatch(setRole(res.data.data));
      })
      .catch((err) => {
        console.log("Error");
      });
  };

  const fetchUserProfile = async (payload) => {
    try {
      const res = await reqGetUserProfile(payload);
      // console.log(res.data);
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

  const handleInputChangeAdd = (e) => {
    dispatch(setUserInfo({ name: e.target.name, value: e.target.value }));
  };

  const onCreateUser = async (e, user) => {
    e.preventDefault();
    const { avatar, ...otherUserData } = user;

    const formData = new FormData();

    if (avatar) {
      formData.append("avatar", avatar);
    }

    Object.keys(otherUserData).forEach((key) => {
      formData.append(key, otherUserData[key]);
    });

    try {
      await reqCreateUser(formData);
      Swal.fire({
        icon: "success",
        title: "Create User",
        text: "Successfully created",
      });
      navigate("/user-management");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error Creating user",
      });
    }
  };

  const fetchUserById = (id) => {
    reqGetUserById(id)
      .then((res) => {
        // console.log(res.data.data);
        dispatch(setUserDetails(res.data.data));
      })
      .catch((err) => {
        console.log("Error");
      });
  };

  const handleInputChangeEdit = (e) => {
    dispatch(
      setUserDetails({
        ...user.userDetails,
        [e.target.name]: e.target.value,
      })
    );
  };

  const onEditUser = (e, user) => {
    e.preventDefault();
  
    const { avatar, ...otherUserData } = user; 
  
    const formData = new FormData(); 
  
    if (avatar) {
      formData.append("avatar", avatar); 
    }
  
    Object.keys(otherUserData).forEach((key) => {
      formData.append(key, otherUserData[key]);
    });
  
    reqUpdateUser(user.id, formData)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Edit User",
          text: "Successfully edited user",
        });
        navigate("/user-management");
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error editing user",
        });
      });
  };
  

  return {
    ...user,
    fetchUser,
    fetchUserProfile,
    onDeleteUser,
    onCreateUser,
    fetchUserById,
    fetchRole,
    handleInputChangeAdd,
    handleInputChangeEdit,
    navigate,
    onEditUser,
  };
};

export default useUser;
