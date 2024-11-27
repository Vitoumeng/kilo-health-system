import { useDispatch, useSelector } from "react-redux";
import { reqCreateRole, reqGetRole } from "./request";
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
        console.log(res.data);
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
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Create Role Successful",
          confirmButtonText: "OK",
        });
        navigate("/role");
        onResetAdd();
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error Creating Role",
        });
        console.log(err);
      });
  };

  return { ...role, fetchRole, onCreateRole, onChangeAdd, navigate };
};

export default useRole;
