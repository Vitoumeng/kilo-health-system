import { Navigate, Route, Routes } from "react-router";
import RootLayout from "../layout/RootLayout";
import Login from "../module/user/Auth/component/Login";
import { useLogin } from "../module/user/Auth/core/action";
import { HasPermissionRoute } from "../helper/permissionHelper";
import { routeItems } from "../data/data";

const PrivateRoute = () => {
  const { accessToken } = useLogin();

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

          {/* <Route
            index
            element={
              <HasPermissionRoute permission="View-Dashboard">
                <h1>Dashboard</h1>
              </HasPermissionRoute>
            }
          />

          <Route
            path="/user"
            element={
              <HasPermissionRoute permission="View-User">
                <User />
              </HasPermissionRoute>
            }
          />

          <Route
            path="/user/add"
            element={
              <HasPermissionRoute permission="Create-User">
                <UserAdd />
              </HasPermissionRoute>
            }
          />

          <Route
            path="/user/edit/:id"
            element={
              <HasPermissionRoute permission="Edit-User">
                <UserEdit />
              </HasPermissionRoute>
            }
          />

          <Route
            path="/role"
            element={
              <HasPermissionRoute permission="View-Role">
                <Role />
              </HasPermissionRoute>
            }
          />

          <Route
            path="/role/add"
            element={
              <HasPermissionRoute permission="Add-Role">
                <RoleAdd />
              </HasPermissionRoute>
            }
          />

          <Route
            path="/role/:id/permssions"
            element={
              <HasPermissionRoute permission="View-Permission">
                <RolePermission />
              </HasPermissionRoute>
            }
          />

          <Route
            path="/file"
            element={
              <HasPermissionRoute permission="View-File">
                <File />
              </HasPermissionRoute>
            }
          />

          <Route
            path="/file/add"
            element={
              <HasPermissionRoute permission="Upload-File">
                <FileAdd />
              </HasPermissionRoute>
            }
          />

          <Route
            path="/category"
            element={
              <HasPermissionRoute permission="View-Category">
                <Category />
              </HasPermissionRoute>
            }
          />
          <Route
            path="/category/add"
            element={
              <HasPermissionRoute permission="Create-Category">
                <CategoryAdd />
              </HasPermissionRoute>
            }
          />
          <Route
            path="/category/edit/:id"
            element={
              <HasPermissionRoute permission="Edit-Category">
                <CategoryEdit />
              </HasPermissionRoute>
            }
          />

          <Route
            path="/post"
            element={
              <HasPermissionRoute permission="View-Post">
                <Post />
              </HasPermissionRoute>
            }
          />

          <Route
            path="/post/add"
            element={
              <HasPermissionRoute permission="Create-Post">
                <PostAdd />
              </HasPermissionRoute>
            }
          />
          <Route
            path="/post/edit/:id"
            element={
              <HasPermissionRoute permission="Edit-Post">
                <PostEdit />
              </HasPermissionRoute>
            }
          />

          <Route
            path="/topic"
            element={
              <HasPermissionRoute permission="View-Topic">
                <Topic />
              </HasPermissionRoute>
            }
          />
          <Route
            path="/topic/add"
            element={
              <HasPermissionRoute permission="Create-Topic">
                <TopicAdd />
              </HasPermissionRoute>
            }
          />

          <Route
            path="/topic/edit/:id"
            element={
              <HasPermissionRoute permission="Edit-Topic">
                <TopicEdit />
              </HasPermissionRoute>
            }
          /> */}

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
