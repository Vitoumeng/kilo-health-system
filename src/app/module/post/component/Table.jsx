import { FaRegTrashCan, FaRegPenToSquare } from "react-icons/fa6";

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
              SubTitle
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
              Public At
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
          {data.map(({ id, subTitle, status, publicAt }, index) => (
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
                {subTitle}
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
              <td
                className="text-start fw-medium text-light"
                style={{ fontSize: "14px" }}
              >
                {publicAt}
              </td>
              <td className="d-flex justify-content-end gap-2">
                <button
                  className="action-btn btn-1"
                  onClick={() => navigate(`/post/edit/${id}`)}
                >
                  <FaRegPenToSquare />
                </button>
                <button
                  className="action-btn btn-2"
                  onClick={() => handleDelete(id)}
                >
                  <FaRegTrashCan />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
