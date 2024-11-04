import { FaTrash } from "react-icons/fa";
import { FaPen } from "react-icons/fa6";
import { IoAddSharp, IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router";

export const UserTable = ({ users, handleDelete }) => {
  const navigate = useNavigate();

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const formattedHours = String(hours).padStart(2, "0");

    return `${day}-${month}-${year} ${formattedHours}:${minutes}${ampm}`;
  };

  return (
    <div className="container bg-body p-3 rounded-2">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="search-input">
          <IoSearch className="search-icon" />
          <input type="text" placeholder="Search..." />
        </div>
        <button
          onClick={() => navigate("/user-management/add")}
          className="add-btn"
        >
          <IoAddSharp style={{ fontSize: "20px" }} />
          <span>Add</span>
        </button>
      </div>

      <div className="table-responsive">
        <table className="table dashed-border-table">
          <thead>
            <tr>
              <th scope="col" className="text-start">
                Name
              </th>
              <th scope="col" className="text-start">
                Created At
              </th>
              <th scope="col" className="text-start">
                Updated At
              </th>
              <th scope="col" className="text-end">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <tr key={item.id}>
                <td className="text-start">{item.name}</td>
                <td className="text-start">{formatDate(item.createdDate)}</td>
                <td className="text-start">{formatDate(item.modifiedDate)}</td>
                <td className="d-flex justify-content-end gap-2">
                  <button
                    className="action-btn"
                    onClick={() => navigate(`/user-management/edit/${item.id}`)}
                  >
                    <FaPen />
                  </button>
                  <button
                    className="action-btn"
                    onClick={() => handleDelete(item.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
