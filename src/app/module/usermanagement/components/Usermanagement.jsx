import { UserTable } from "./UserTable";
import "../../../../_template/style/css/Usermanagement.css";
import useUser from "../core/action";
import { useEffect } from "react";

export const Usermanagement = () => {
  const { users, pagination, setPagination, fetch, fetchUser, onDeleteUser } =
    useUser();

  useEffect(() => {
    fetchUser(1);
  }, []);

  console.log(pagination);

  return (
    <div className="d-flex gap-0 flex-column align-items-baseline">
      <h4 className="mb-0">User List</h4>
      <p className="fw-medium text-secondary">
        User Management <span className="ms-2 text-dark">User List</span>
      </p>
      <UserTable users={users} handleDelete={onDeleteUser} />
    </div>
  );
};
