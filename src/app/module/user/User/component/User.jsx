import { IoAddSharp, IoSearch } from "react-icons/io5";
import Table from "./Table";
import useUser from "../core/action";
import { useEffect } from "react";
import Pagination from "../../../../utils/Pagination";
import { HasPermissionAction } from "../../../../helper/permissionHelper";

const User = () => {
  const { users, fetchUsers, paging, onDeleteUser, navigate } = useUser();

  useEffect(() => {
    fetchUsers();
  }, []); // eslint-disable-line

  const onChangeSearch = (e) => fetchUsers(20, 1, e.target.value);

  return (
    <div className="d-flex gap-0 flex-column">
      <div className="d-flex gap-0 flex-column align-items-baseline">
        <div className="container p-3 d-flex align-items-start flex-column">
          <h4 className="mb-0">User List</h4>
          <p className="fw-medium text-secondary">
            User Management <span className="ms-2 text-light">User List</span>
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
                onChange={onChangeSearch}
              />
            </div>

            <HasPermissionAction permission="Create-User">
              <button onClick={() => navigate("/user/add")} className="add-btn">
                <IoAddSharp style={{ fontSize: "20px" }} />
                <span>Add</span>
              </button>
            </HasPermissionAction>
          </div>

          <Table data={users} navigate={navigate} handleDelete={onDeleteUser} />

          <Pagination paging={paging} setPaging={fetchUsers} />
        </div>
      </div>
    </div>
  );
};

export default User;
