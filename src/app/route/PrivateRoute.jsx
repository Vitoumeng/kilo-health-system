import { Navigate, Route, Routes } from "react-router";
import RootLayout from "../layout/RootLayout";
import Login from "../module/user/Auth/component/Login";
import { useLogin } from "../module/user/Auth/core/action";
import User from "../module/user/User/component/User";
import UserAdd from "../module/user/User/component/Add";
import UserEdit from "../module/user/User/component/Edit";
import Role from "../module/user/Role/component/Role";
import RoleAdd from "../module/user/Role/component/Add";
import RolePermission from "../module/user/Role/component/Permission";
import File from "../module/file-upload/component/File";
import FileAdd from "../module/file-upload/component/Add";
import Category from "../module/category/component/Category";
import CategoryAdd from "../module/category/component/Add";
import CategoryEdit from "../module/category/component/Edit";
import Post from "../module/post/component/Post";
import PostAdd from "../module/post/component/Add";
import PostEdit from "../module/post/component/Edit";
import Topic from "../module/topic/component/Topic";
import TopicAdd from "../module/topic/component/Add";
import TopicEdit from "../module/topic/component/Edit";

const PrivateRoute = () => {
  const { accessToken } = useLogin();

  return (
    <Routes>
      {accessToken ? (
        <Route path="/" element={<RootLayout />}>
          <Route index element={<h1>Dashboard</h1>}></Route>
          <Route path="/user" element={<User />} />
          <Route path="/user/add" element={<UserAdd />} />
          <Route path="/user/edit/:id" element={<UserEdit />} />
          <Route path="/role" element={<Role />} />
          <Route path="/role/add" element={<RoleAdd />} />
          <Route path="/role/:id/permssions" element={<RolePermission />} />
          <Route path="/file" element={<File />} />
          <Route path="/file/add" element={<FileAdd />} />
          <Route path="/category" element={<Category />} />
          <Route path="/category/add" element={<CategoryAdd />} />
          <Route path="/category/edit/:id" element={<CategoryEdit />} />
          <Route path="/post" element={<Post />} />
          <Route path="/post/add" element={<PostAdd />} />
          <Route path="/post/edit/:id" element={<PostEdit />} />
          <Route path="/topic" element={<Topic />} />
          <Route path="/topic/add" element={<TopicAdd />} />
          <Route path="/topic/edit/:id" element={<TopicEdit />} />
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
