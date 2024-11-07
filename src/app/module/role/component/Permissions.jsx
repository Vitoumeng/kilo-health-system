import { useParams } from "react-router";
import useRole from "../core/action";
import { useEffect } from "react";

const Permissions = () => {
  const { id } = useParams();
  const {
    fetchRoleById,
    role,
    fetchPermissions,
    permissions,
    onToggleCheckPermissions,
    onToggleCheckAllPermissions
  } = useRole();

  console.log(permissions);

  useEffect(() => {
    fetchRoleById(id);
    fetchPermissions({ roldeId: id });
  }, []);

  return (
    <div className="container bg-body p-3 rounded-2">
      <h2>{role?.name}</h2>
      <table className="table dashed-border-table">
        <thead>
          <tr>
            <th scope="col" className="text-start">
              Permission
            </th>
            <th scope="col" className="text-end">
              <span>Select All</span>
              <input
                onChange={(event) =>
                    onToggleCheckAllPermissions(event.target.checked)
                }
                className="form-check-input ms-3"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {permissions.length > 0 ? (
            permissions.map(({ name, status, id }, index) => (
              <tr key={index}>
                <td className="text-start">{name}</td>
                <td className="text-end">
                  <input
                    onChange={() => onToggleCheckPermissions(id)}
                    className="form-check-input"
                    type="checkbox"
                    checked={status}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Permissions;
