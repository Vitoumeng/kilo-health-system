import { Route, Routes } from "react-router-dom";
import Layout from "./modules/layout/components/Layout";
import Dashboard from "./modules/dashboard/Dashboard";
import Order from "./modules/order/Order";
import Food from "./modules/food/Food";
import Table from "./modules/table/Table";
import Foods from "./modules/foods/Foods";
import UserManagement from "./modules/usermange/UserManagement";
import Roles from "./modules/role/Roles";
import Income from "./modules/income/Income";
import Login from "./modules/login/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="order" element={<Order />} />
          <Route path="food" element={<Food />} />
          <Route path="income" element={<Income />} />
          <Route path="table" element={<Table />} />
          <Route path="foods" element={<Foods />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="roles" element={<Roles />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
