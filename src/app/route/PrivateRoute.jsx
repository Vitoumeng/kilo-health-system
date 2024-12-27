import { Navigate, Route, Routes } from "react-router";
import RootLayout from "../layout/RootLayout";
import Login from "../module/user/Auth/component/Login";
import { useLogin } from "../module/user/Auth/core/action";
import User from "../module/user/User/component/User";
import UserAdd from "../module/user/User/component/Add";
import UserEdit from "../module/user/User/component/Edit";
import Role from "../module/user/Role/component/Role";
import RoleAdd from "../module/user/Role/component/Add";
import File from "../module/file-upload/component/File";

const PrivateRoute = () => {
  const { auth } = useLogin();

  return (
    <Routes>
      {auth ? (
        <Route path="/" element={<RootLayout />}>
          <Route index element={<h1>Dashboard</h1>}></Route>
          <Route path="/post" element={<h1>Post</h1>}></Route>
          <Route path="/topic" element={<h1>Topic</h1>}></Route>
          <Route path="/user" element={<User />} />
          <Route path="/user/add" element={<UserAdd />} />
          <Route path="/user/edit/:id" element={<UserEdit />} />
          <Route path="/role" element={<Role />} />
          <Route path="/role/add" element={<RoleAdd />} />
          <Route path="/file" element={<File />} />
          <Route path="/category" element={<h1>Category</h1>} />
        </Route>
      ) : (
        <>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/*" element={<Navigate to="/login" />}></Route>
        </>
      )}
    </Routes>
  );
};

export default PrivateRoute;
