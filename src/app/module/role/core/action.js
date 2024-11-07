import { useDispatch, useSelector } from "react-redux";
import { reqGetPermissions, reqGetRoleById, reqGetRoles } from "./request";
import { useNavigate } from "react-router";
import {
  setPermissions,
  setRole,
  setRoles,
  toggleAllPermissions,
  updatePermissions,
} from "./slice";

const useRole = () => {
  const { data, role, permissions } = useSelector((state) => state.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchRoles = async () => {
    return reqGetRoles().then((res) => {
      //   console.log(res);
      dispatch(setRoles(res));
    });
  };

  const fetchRoleById = async (id) => {
    return reqGetRoleById(id).then((res) => {
      //   console.log(res.data.data);
      dispatch(setRole(res.data.data));
    });
  };

  const fetchPermissions = async (roleId) => {
    return reqGetPermissions(roleId).then((res) => {
      //   console.log(res.data);
      dispatch(setPermissions(res.data.data));
    });
  };

  const onToggleCheckPermissions = async (id) =>
    dispatch(updatePermissions(id));

  const onToggleCheckAllPermissions = async (status) =>
    dispatch(toggleAllPermissions(status));

  return {
    ...data,
    role,
    fetchRoles,
    dispatch,
    navigate,
    fetchRoleById,
    fetchPermissions,
    permissions,
    onToggleCheckPermissions,
    onToggleCheckAllPermissions
  };
};

export default useRole;
