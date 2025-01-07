import { FaTrash } from "react-icons/fa";
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
              File Type
            </th>
            <th
              scope="col"
              className="text-start fw-semibold text-light"
              style={{ fontSize: "14px" }}
            >
              File Size
            </th>
            <th
              scope="col"
              className="text-start fw-semibold text-light"
              style={{ fontSize: "14px" }}
            >
              File Image
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
            <tr key={item?.id}>
              <td
                className="text-start fw-medium text-light"
                style={{ fontSize: "14px" }}
              >
                {item?.fileType}
              </td>
              <td
                className="text-start fw-medium text-light"
                style={{ fontSize: "14px" }}
              >
                {item?.fileSize}
              </td>
              <td className="text-start fw-medium text-secondary">
                <img
                  src={item?.fileUrl}
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
                <HasPermissionAction permission="Delete-File">
                  <button
                    className="action-btn btn-2"
                    onClick={() => handleDelete(item?.id)}
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
