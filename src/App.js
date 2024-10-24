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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/dashboard" component={<Dashboard />} />
          <Route path="/order" component={<Order />} />
          <Route path="/food" component={<Food />} />
          <Route path="/income" component={<Income />} />
          <Route path="/table" component={<Table />} />
          <Route path="/foods" component={<Foods />} />
          <Route path="/user-management" component={<UserManagement />} />
          <Route path="/roles" component={<Roles />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
