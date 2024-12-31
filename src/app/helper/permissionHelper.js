import _ from "lodash";

const getPermissions = () => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  if (!permissions) return [];

  return permissions;
};

const hasPermission = (pers = "") => {
  const permissions = getPermissions();

  if (_.isEmpty(permissions)) {
    return false;
  }

  return permissions.find((per) => per.name === pers)?.status ?? false;
};

const HasPermissionAction = ({ children, permission }) => {
  if (hasPermission(permission)) {
    return children;
  } else if (permission === "View-All") {
    return children;
  }

  return null;
};

export { HasPermissionAction };
