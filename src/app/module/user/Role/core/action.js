import { useDispatch, useSelector } from "react-redux";
import { reqCreateRole, reqDeleteRole, reqGetRole } from "./request";
import { setRoleInfo, setRoles, resetRoleInfo } from "./reducer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const useRole = () => {
  const role = useSelector((state) => state.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { roleInfo } = role;

  const fetchRole = (size = 20, page = 1, search = "") => {
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
          title: "Create Role Successful",
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
      cancelButtonColor: "lightgrey",
      cancelButtonText: "Cancel",
    }).then((res) => {
      if (res.isConfirmed) {
        reqDeleteRole(id)
          .then(() => {
            Swal.fire({
              icon: "success",
              background: "#222525",
              color: "#fff",
              title: "Delete Role Successful",
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

  return {
    ...role,
    fetchRole,
    onCreateRole,
    onChangeAdd,
    navigate,
    onDeleteRole,
  };
};

export default useRole;
