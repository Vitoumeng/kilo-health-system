import { useEffect } from "react";
import useRole from "../core/action";
import { useParams } from "react-router";

const Permission = () => {
  const {
    fetchRoleById,
    role: roles,
    fetchPermission,
    permissions,
    onToggleCheckPermission,
  } = useRole();
  const { id } = useParams();

  useEffect(() => {
    fetchRoleById(id);
    fetchPermission({ roleId: id });
  }, [id]);

  //   console.log(roles);

  let { name } = roles ?? {};

  console.log(permissions);

  return (
    <div className="d-flex gap-0 flex-column">
      <div className="d-flex gap-0 flex-column align-items-baseline">
        <div className="container p-3 d-flex align-items-start flex-column">
          <h4 className="mb-0">{name}</h4>
        </div>

        <div
          className="container p-3 rounded-2"
          style={{ background: "#212225" }}
        >
          <table className="table dashed-border-table table-dark">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="text-start fw-semibold text-light"
                  style={{ fontSize: "14px" }}
                >
                  Permission
                </th>
                <th
                  scope="col"
                  className="text-end fw-semibold text-light"
                  style={{ fontSize: "14px" }}
                >
                  <span>Select All</span>
                  <input
                    // onChange={(event) =>
                    //   handleSelectAllChange(event.target.checked)
                    // }
                    className="form-check-input ms-3"
                    type="checkbox"
                    value=""
                    // checked={isSelectAllChecked}
                    id="flexCheckDefault"
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {permissions.length > 0 ? (
                permissions.map(({ name, status, id }, index) => (
                  <tr key={index}>
                    <td className="text-start" style={{ fontSize: "13px" }}>
                      {name}
                    </td>
                    <td className="text-end">
                      <input
                        onChange={() => onToggleCheckPermission(id)}
                        className="form-check-input"
                        type="checkbox"
                        defaultChecked={status}
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

          <div className="mt-3">
            <button
              type="button"
              //   onClick={() => fetchPermissions({ roleId: id })}
              className="btn btn-secondary me-2"
            >
              Discard
            </button>
            <button
              //   onClick={onSubmitPermissions}
              type="button"
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Permission;
