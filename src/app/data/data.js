import { BsPostcard } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import { LuUser, LuUserCog } from "react-icons/lu";
import { MdAttachFile, MdOutlineTopic, MdSpeed } from "react-icons/md";
import User from "../module/user/User/component/User";
import UserAdd from "../module/user/User/component/Add";
import UserEdit from "../module/user/User/component/Edit";
import Role from "../module/user/Role/component/Role";
import RoleAdd from "../module/user/Role/component/Add";
import RolePermissions from "../module/user/Role/component/Permission";
import File from "../module/file-upload/component/File";
import FileUpload from "../module/file-upload/component/Add";
import Category from "../module/category/component/Category";
import CategoryAdd from "../module/category/component/Add";
import CategoryEdit from "../module/category/component/Edit";
import Post from "../module/post/component/Post";
import PostAdd from "../module/post/component/Add";
import PostEdit from "../module/post/component/Edit";
import Topic from "../module/topic/component/Topic";
import TopicAdd from "../module/topic/component/Add";
import TopicEdit from "../module/topic/component/Edit";

const sideBarItems = [
  {
    items: [
      {
        name: "Dashboard",
        icon: <MdSpeed style={{ fontSize: "1.15rem" }} />,
        path: "/",
        permisson: "View-Dashboard",
      },
    ],
  },
  {
    heading: "Content Management",
    items: [
      {
        name: "File",
        icon: <MdAttachFile style={{ fontSize: "1.15rem" }} />,
        path: "/file",
        permisson: "View-File",
      },
      {
        name: "Category",
        icon: <FaListUl style={{ fontSize: "1.15rem" }} />,
        path: "/category",
        permisson: "View-Category",
      },
      {
        name: "Post",
        icon: <BsPostcard style={{ fontSize: "1.15rem" }} />,
        path: "/post",
        permisson: "View-Post",
      },
      {
        name: "Topic",
        icon: <MdOutlineTopic style={{ fontSize: "1.15rem" }} />,
        path: "/topic",
        permisson: "View-Topic",
      },
    ],
  },
  {
    heading: "Administration",
    items: [
      {
        name: "User",
        icon: <LuUser style={{ fontSize: "1.15rem" }} />,
        path: "/user",
        permisson: "View-User",
      },
      {
        name: "Role",
        icon: <LuUserCog style={{ fontSize: "1.15rem" }} />,
        path: "/role",
        permisson: "View-Role",
      },
    ],
  },
];

const routeItems = [
  {
    path: "/",
    index: true,
    permisson: "View-Dashboard",
    element: <h1>Dashboard</h1>,
  },
  {
    path: "/user",
    permisson: "View-User",
    element: <User />,
  },
  {
    path: "/user/add",
    permisson: "Create-User",
    element: <UserAdd />,
  },
  {
    path: "/user/edit/:id",
    permisson: "Edit-User",
    element: <UserEdit />,
  },
  {
    path: "/role",
    permisson: "View-Role",
    element: <Role />,
  },
  {
    path: "/role/add",
    permisson: "Create-Role",
    element: <RoleAdd />,
  },
  {
    path: "/role/:id/permssions",
    permisson: "View-Permission",
    element: <RolePermissions />,
  },
  {
    path: "/file",
    permisson: "View-File",
    element: <File />,
  },
  {
    path: "/file/add",
    permisson: "Upload-File",
    element: <FileUpload />,
  },
  {
    path: "/category",
    permisson: "View-Category",
    element: <Category />,
  },
  {
    path: "/category/add",
    permisson: "Create-Category",
    element: <CategoryAdd />,
  },
  {
    path: "/category/edit/:id",
    permisson: "Edit-Category",
    element: <CategoryEdit />,
  },
  {
    path: "/post",
    permisson: "View-Post",
    element: <Post />,
  },
  {
    path: "/post/add",
    permisson: "Create-Post",
    element: <PostAdd />,
  },
  {
    path: "/post/edit/:id",
    permisson: "Edit-Post",
    element: <PostEdit />,
  },
  {
    path: "/topic",
    permisson: "View-Topic",
    element: <Topic />,
  },
  {
    path: "/topic/add",
    permisson: "Create-Topic",
    element: <TopicAdd />,
  },
  {
    path: "/topic/edit/:id",
    permisson: "Edit-Topic",
    element: <TopicEdit />,
  },
];

export { sideBarItems, routeItems };
