import { Navigate, Route, Routes } from "react-router";
import RootLayout from "../layout/RootLayout";
import Login from "../module/auth/component/Login";
import { useLogin } from "../module/auth/core/action";

const PrivateRoute = () => {
  const { auth } = useLogin();

  return (
    <Routes>
      {auth ? (
        <Route path="/" element={<RootLayout />}>
          <Route index element={<h1>Dashboard</h1>}></Route>
          <Route path="/category" element={<h1>Category</h1>}></Route>
          <Route path="/post" element={<h1>Post</h1>}></Route>
          <Route path="/topic" element={<h1>Topic</h1>}></Route>
          <Route path="/user" element={<h1>User</h1>}></Route>
          <Route path="/role" element={<h1>Role</h1>}></Route>
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
