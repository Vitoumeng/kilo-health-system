import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./modules/layout/components/Layout";
import Login from "./modules/auth/components/Login";
import { useAuth } from "./modules/auth/core/action";

function App() {
  const { auth } = useAuth();

  return (
    <>
      <Routes>
        {auth ? (
          <Route path="/" element={<Layout />}>
            <Route index element={<h1>Dashboard</h1>} />
            <Route path="order" element={<h1>Order</h1>} />
            <Route path="food" element={<h1>Food</h1>} />
            <Route path="income" element={<h1>Income</h1>} />
            <Route path="table" element={<h1>Table</h1>} />
            <Route path="foods" element={<h1>Foods</h1>} />
            <Route path="user-management" element={<h1>UserManagement</h1>} />
            <Route path="roles" element={<h1>Roles</h1>} />
          </Route>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
