import { Navigate, Route, Routes } from "react-router";
import RootLayout from "../layout/RootLayout";
import { LoginForm } from "../module/auth/component/Login";
import { useAuth } from "../module/auth/core/action";
import { Usermanagement } from "../module/usermanagement/components/Usermanagement";
import { UserAdd } from "../module/usermanagement/components/UserAdd";
import { UserEdit } from "../module/usermanagement/components/UserEdit";
import Role from "../module/role/component/Role";
import Permissions from "../module/role/component/Permissions";

const PrivateRoute = () => {
  const { auth } = useAuth();
  return (
    <Routes>
      {auth ? (
        <Route path="/" element={<RootLayout />}>
          <Route index element={<h1>Dashboard</h1>} />
          <Route path="blog" element={<h1>Blog</h1>} />
          <Route path="event" element={<h1>Event</h1>} />
          <Route path="category" element={<h1>Category</h1>} />
          <Route path="tag" element={<h1>Tag</h1>} />
          <Route path="user-management">
            <Route index element={<Usermanagement />} />
            <Route path="add" element={<UserAdd />} />
            <Route path="edit/:id" element={<UserEdit />} />
          </Route>
          <Route path="role">
            <Route index element={<Role />} />
            <Route path="add" element={<h1>Add Role</h1>} />
            <Route path="edit/:id" element={<h1>Edit Role</h1>} />
            <Route path=":id/permissions" element={<Permissions />} />
          </Route>
        </Route>
      ) : (
        <>
          <Route path="/login" element={<LoginForm />} />
          <Route path="*" element={<Navigate to={"/login"} />} />
        </>
      )}
    </Routes>
  );
};

export { PrivateRoute };
