import { UserTable } from "./UserTable";
import { IoAddSharp, IoSearch } from "react-icons/io5";
import "../../../../_template/style/css/Usermanagement.css";
import useUser from "../core/action";
import { useEffect } from "react";
import { Pagination } from "./Pagination";
import { useNavigate } from "react-router";

export const Usermanagement = () => {
  const navigate = useNavigate();
  const { users, pagination, setPagination, fetch, fetchUser, onDeleteUser } =
    useUser();

  useEffect(() => {
    fetchUser(1);
  }, []);

  // console.log(pagination);

  return (
    <>
      <div className="d-flex gap-0 flex-column align-items-baseline">
        <h4 className="mb-0">User List</h4>
        <p className="fw-medium text-secondary">
          User Management <span className="ms-2 text-dark">User List</span>
        </p>
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

          <UserTable users={users} handleDelete={onDeleteUser} />

          <Pagination />
        </div>
      </div>
    </>
  );
};
