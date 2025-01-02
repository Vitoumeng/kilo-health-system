import { Navigate, Route, Routes, useLocation } from "react-router";
import RootLayout from "../layout/RootLayout";
import Login from "../module/user/Auth/component/Login";
import { useLogin } from "../module/user/Auth/core/action";
import { HasPermissionRoute } from "../helper/permissionHelper";
import { routeItems } from "../data/data";
import { useEffect } from "react";

const PrivateRoute = () => {
  const { accessToken } = useLogin();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <Routes>
      {accessToken ? (
        <Route path="/" element={<RootLayout />}>
          {routeItems.map((route, index) =>
            route.index ? (
              <Route
                key={index}
                index
                element={
                  <HasPermissionRoute permission={route.permisson}>
                    {route.element}
                  </HasPermissionRoute>
                }
              />
            ) : (
              <Route
                key={index}
                path={route.path}
                element={
                  <HasPermissionRoute permission={route.permisson}>
                    {route.element}
                  </HasPermissionRoute>
                }
              />
            )
          )}

          <Route path="*" element={<h1>4$3 Forbidden</h1>} />
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
