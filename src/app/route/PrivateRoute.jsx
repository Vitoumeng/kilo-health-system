import { Route, Routes } from "react-router";
import RootLayout from "../layout/RootLayout";

const PrivateRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<h1>Dashboard</h1>}></Route>
        <Route path="/category" element={<h1>Category</h1>}></Route>
        <Route path="/post" element={<h1>Post</h1>}></Route>
        <Route path="/topic" element={<h1>Topic</h1>}></Route>
        <Route path="/user" element={<h1>User</h1>}></Route>
        <Route path="/role" element={<h1>Role</h1>}></Route>
      </Route>
    </Routes>
  );
};

export default PrivateRoute;
