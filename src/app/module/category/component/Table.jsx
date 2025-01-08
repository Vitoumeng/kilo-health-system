import { FaTrash } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import { HasPermissionAction } from "../../../helper/permissionHelper";

const Table = ({ data, handleDelete, navigate }) => {
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
              Id
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
              Image
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
          {data.map((item) => (
            <tr key={item.id}>
              <td
                className="text-start fw-medium text-light"
                style={{ fontSize: "14px" }}
              >
                {item?.id}
              </td>
              <td
                className="text-start fw-medium text-light"
                style={{ fontSize: "14px" }}
              >
                {item?.name}
              </td>
              <td className="text-start fw-medium text-secondary">
                <img
                  src={item?.url}
                  alt=""
                  style={{
                    width: "35px",
                    height: "35px",
                    background: "#fff",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                  className=" object-fit-cover rounded-2 overflow-hidden"
                />
              </td>
              <td className="d-flex justify-content-end gap-2">
                <HasPermissionAction permission="Edit-Category">
                  <button
                    className="action-btn btn-1"
                    onClick={() => navigate(`/category/edit/${item.id}`)}
                  >
                    <FaRegPenToSquare />
                  </button>
                </HasPermissionAction>

                <HasPermissionAction permission="Delete-Category">
                  <button
                    className="action-btn btn-2"
                    onClick={() => handleDelete(item.id)}
                  >
                    <FaTrash />
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
