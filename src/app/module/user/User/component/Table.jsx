import { FaRegTrashCan, FaRegPenToSquare } from "react-icons/fa6";
import HasPermissionAction from "../../../../helper/permissionHelper";

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
              className="text-start fw-semibold text-light"
              style={{ fontSize: "14px" }}
            >
              Profile
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
          {data.map(
            ({ id, firstname, lastname, gender, dob, photo }, index) => (
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
                <td className="text-start fw-medium text-secondary">
                  <img
                    src={photo}
                    alt=""
                    style={{
                      width: "35px",
                      height: "35px",
                    }}
                    className=" object-fit-cover rounded-2 overflow-hidden"
                  />
                </td>
                <td className="d-flex justify-content-end gap-2">
                  <HasPermissionAction>
                    <button
                      className="action-btn btn-1"
                      onClick={() => navigate(`/user/edit/${id}`)}
                    >
                      <FaRegPenToSquare />
                    </button>
                  </HasPermissionAction>

                  <HasPermissionAction permission="Delete-User">
                    <button
                      className="action-btn btn-2"
                      onClick={() => handleDelete(id)}
                    >
                      <FaRegTrashCan />
                    </button>
                  </HasPermissionAction>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
