import { FaRegTrashCan, FaRegPenToSquare } from "react-icons/fa6";
import HasPermissionAction from "../../../helper/permissionHelper";

const Table = ({ data, navigate, handleDelete }) => {
  // console.log(data);

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
              Title
            </th>
            <th
              scope="col"
              className="text-start fw-semibold text-light"
              style={{ fontSize: "14px" }}
            >
              Status
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
          {data.map(({ id, title, status, url }, index) => (
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
                {title}
              </td>
              <td
                className="text-start fw-medium text-light"
                style={{ fontSize: "14px" }}
              >
                {status ? (
                  <span className="text-success">Active</span>
                ) : (
                  <span className="text-danger">Deactivate</span>
                )}
              </td>
              <td className="text-start fw-medium text-secondary">
                <img
                  src={url}
                  alt=""
                  style={{
                    width: "35px",
                    height: "35px",
                  }}
                  className=" object-fit-cover rounded-2 overflow-hidden"
                />
              </td>
              <td className="d-flex justify-content-end gap-2">
                <HasPermissionAction permission="Edit-Post">
                  <button
                    className="action-btn btn-1"
                    onClick={() => navigate(`/post/edit/${id}`)}
                  >
                    <FaRegPenToSquare />
                  </button>
                </HasPermissionAction>

                <HasPermissionAction permission="Delete-Post">
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
