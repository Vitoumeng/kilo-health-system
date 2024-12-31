import { BsPostcard } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import { LuUser, LuUserCog } from "react-icons/lu";
import { MdAttachFile, MdOutlineTopic, MdSpeed } from "react-icons/md";

const sideBarItems = [
  {
    items: [
      {
        name: "Dashboard",
        icon: <MdSpeed style={{ fontSize: "1.15rem" }} />,
        path: "/",
        permisson: "View-Dashboard"
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
        permisson: "View-File"
      },
      {
        name: "Category",
        icon: <FaListUl style={{ fontSize: "1.15rem" }} />,
        path: "/category",
        permisson: "View-Category"
      },
      {
        name: "Post",
        icon: <BsPostcard style={{ fontSize: "1.15rem" }} />,
        path: "/post",
        permisson: "View-Post"
      },
      {
        name: "Topic",
        icon: <MdOutlineTopic style={{ fontSize: "1.15rem" }} />,
        path: "/topic",
        permisson: "View-Topic"
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
        permisson: "View-User"
      },
      {
        name: "Role",
        icon: <LuUserCog style={{ fontSize: "1.15rem" }} />,
        path: "/role",
        permisson: "View-Role"
      },
    ],
  },
];

export { sideBarItems };
