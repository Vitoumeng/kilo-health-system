import { FaRegTrashCan, FaUserShield } from "react-icons/fa6";
import { HasPermissionAction } from "../../../../helper/permissionHelper";

const Table = ({ data, navigate, handleDelete }) => {
  return (
    <div className="table-responsive rounded-2">
      <table className="table table-dark dashed-border-table overflow-x-scroll">
        <thead>
          <tr>
            <th
              scope="col"
              className="text-start fw-semibold text-light"
              style={{ fontSize: "14px" }}
            >
              No.
            </th>
            <th
              scope="col"
              className="text-start fw-semibold text-light"
              style={{ fontSize: "14px" }}
            >
              Name
            </th>
            <th
              scope="col"
              className="text-start fw-semibold text-light"
              style={{ fontSize: "14px" }}
            >
              Modules
            </th>
            <th
              scope="col"
              className="text-end fw-semibold text-light"
              style={{ fontSize: "14px" }}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ id, name, module }, index) => (
            <tr key={index}>
              <td
                className="text-start fw-medium text-light"
                style={{ fontSize: "14px" }}
              >
                {index + 1}
              </td>
              <td
                className="text-start fw-medium text-light"
                style={{ fontSize: "14px" }}
              >
                {name}
              </td>
              <td
                className="text-start fw-medium text-light"
                style={{ fontSize: "14px" }}
              >
                {module}
              </td>
              <td className="d-flex justify-content-end gap-2">
                <HasPermissionAction permission="View-Permission">
                  <button
                    className="action-btn btn-3"
                    onClick={() => navigate(`/role/${id}/permssions`)}
                  >
                    <FaUserShield />
                  </button>
                </HasPermissionAction>

                <HasPermissionAction permission="Delete-Role">
                  <button
                    className="action-btn btn-2"
                    onClick={() => handleDelete(id)}
                  >
                    <FaRegTrashCan />
                  </button>
                </HasPermissionAction>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
