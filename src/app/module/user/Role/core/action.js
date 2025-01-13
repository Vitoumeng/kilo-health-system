import { useDispatch, useSelector } from "react-redux";
import {
  reqCreateRole,
  reqDeleteRole,
  reqGetPermissions,
  reqGetRole,
  reqGetRoleById,
  reqSetPermissions,
} from "./request";
import {
  setRoleInfo,
  setRoles,
  resetRoleInfo,
  setRole,
  setPermissions,
  updatePermissions,
  toggleAllPermissions,
} from "./reducer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const useRole = () => {
  const role = useSelector((state) => state.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { roleInfo } = role;

  const fetchRole = (size = 1000, page = 1, search = "") => {
    reqGetRole({ size, page, query: search })
      .then((res) => {
        // console.log(res.data);
        dispatch(setRoles(res.data));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const onChangeAdd = (e) =>
    dispatch(setRoleInfo({ name: e.target.name, value: e.target.value }));

  const onResetAdd = () => dispatch(resetRoleInfo());

  const onCreateRole = (e) => {
    e.preventDefault();

    reqCreateRole(roleInfo)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Role has been successfully created!",
          background: "#222525",
          color: "#fff",
          confirmButtonText: "OK",
        });
        navigate("/role");
        onResetAdd();
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          background: "#222525",
          color: "#fff",
          text: "Error Creating Role",
        });
        console.log(err);
      });
  };

  const onDeleteRole = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      background: "#222525",
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: "lightcoral",
      confirmButtonText: "OK",
      cancelButtonColor: "gray",
      cancelButtonText: "Cancel",
    }).then((res) => {
      if (res.isConfirmed) {
        reqDeleteRole(id)
          .then(() => {
            Swal.fire({
              icon: "success",
              background: "#222525",
              color: "#fff",
              title: "Role has been successfully deleted!",
              confirmButtonText: "OK",
            });
            fetchRole();
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              background: "#222525",
              color: "#fff",
              text: "Error deleting role",
            });
            console.log(err);
          });
      }
    });
  };

  const fetchRoleById = (id) => {
    return reqGetRoleById(id)
      .then((res) => {
        // console.log(res.data.data);
        dispatch(setRole(res.data.data));
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const fetchPermission = (roleId) => {
    return reqGetPermissions(roleId)
      .then((res) => {
        // console.log(res.data.data);
        dispatch(setPermissions(res.data.data));
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const onToggleCheckPermission = (id) => dispatch(updatePermissions(id));

  const onToggleCheckAllPermissions = (status) =>
    dispatch(toggleAllPermissions(status));

  const onSubmitPermissions = () => {
    const { permissions, role: roles } = role;
    const payload = {
      roleId: roles.id,
      items: permissions.map((per) => ({
        id: per.id,
        status: per.status,
      })),
    };
    reqSetPermissions(payload)
      .then(() => {
        Swal.fire({
          icon: "success",
          background: "#222525",
          color: "#fff",
          title: "Permission has been successfully udated!",
          confirmButtonText: "OK",
        });
        fetchPermission({ roleId: roles.id });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          background: "#222525",
          color: "#fff",
          text: "Error Update Permissions",
        });
        console.log(err);
      });
  };

  const fetchSelfPermissions = (id) => {
    return reqGetPermissions(id).then((res) => {
      // console.log(res.data.data);
      localStorage.setItem("permissions", JSON.stringify(res.data.data));
    });
  };

  return {
    ...role,
    fetchRole,
    onCreateRole,
    onChangeAdd,
    onResetAdd,
    navigate,
    onDeleteRole,
    fetchRoleById,
    fetchPermission,
    onToggleCheckPermission,
    onToggleCheckAllPermissions,
    onSubmitPermissions,
    fetchSelfPermissions,
  };
};

export default useRole;
