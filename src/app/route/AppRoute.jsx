import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../../App";
import PrivateRoute from "./PrivateRoute";

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/*" element={<PrivateRoute />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
