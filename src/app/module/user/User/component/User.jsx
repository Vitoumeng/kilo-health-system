import { IoAddSharp, IoSearch } from "react-icons/io5";
import Table from "./Table";
import useUser from "../core/action";
import { useEffect } from "react";
import Pagination from "../../../../utils/Pagination";

const User = () => {
  const { users, fetchUsers, paging, onDeleteUser, navigate } = useUser();

  useEffect(() => {
    fetchUsers();
  }, []); // eslint-disable-line

  return (
    <div className="d-flex gap-0 flex-column">
      <div className="d-flex gap-0 flex-column align-items-baseline">
        <div className="container p-3 d-flex align-items-start flex-column">
          <h4 className="mb-0">User List</h4>
          <p className="fw-medium text-secondary">
            User Management <span className="ms-2 text-dark">User List</span>
          </p>
        </div>

        <div
          className="container p-3 rounded-2"
          style={{ background: "#212225" }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="search-input bg-dark">
              <IoSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search..."
                // onChange={onChangeSearch}
              />
            </div>
            <button
              onClick={() => navigate("/user/add")}
              className="add-btn"
            >
              <IoAddSharp style={{ fontSize: "20px" }} />
              <span>Add</span>
            </button>
          </div>

          <Table data={users} handleDelete={onDeleteUser} />

          <Pagination paging={paging} setPaging={fetchUsers} />
        </div>
      </div>
    </div>
  );
};

export default User;
