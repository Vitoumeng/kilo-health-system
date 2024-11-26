import { FaRegTrashCan, FaRegPenToSquare } from "react-icons/fa6";
import { useNavigate } from "react-router";

const Table = ({ data, handleDelete }) => {
  const navigate = useNavigate();

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
              Gender
            </th>
            <th
              scope="col"
              className="text-start fw-semibold text-light"
              style={{ fontSize: "14px" }}
            >
              Date of Birth
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
          {data.map(({ id, firstname, lastname, gender, dob }, index) => (
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
                {firstname + " " + lastname}
              </td>
              <td
                className="text-start fw-medium text-light"
                style={{ fontSize: "14px" }}
              >
                {gender}
              </td>
              <td
                className="text-start fw-medium text-light"
                style={{ fontSize: "14px" }}
              >
                {dob}
              </td>
              <td className="d-flex justify-content-end gap-2">
                <button
                  className="action-btn btn-1"
                  onClick={() => navigate(`/user-management/user/edit/${id}`)}
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
