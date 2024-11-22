import { BsPostcard } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import { LuUser, LuUserCog } from "react-icons/lu";
import { MdOutlineTopic, MdSpeed } from "react-icons/md";

const sideBarItems = [
  {
    items: [
      {
        name: "Dashboard",
        icon: <MdSpeed style={{ fontSize: "1.15rem" }} />,
        path: "/",
      },
    ],
  },
  {
    heading: "Content Management",
    items: [
      {
        name: "Category",
        icon: <FaListUl style={{ fontSize: "1.15rem" }} />,
        path: "/category",
      },
      {
        name: "Post",
        icon: <BsPostcard style={{ fontSize: "1.15rem" }} />,
        path: "/post",
      },
      {
        name: "Topic",
        icon: <MdOutlineTopic style={{ fontSize: "1.15rem" }} />,
        path: "/topic",
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
      },
      {
        name: "Role",
        icon: <LuUserCog style={{ fontSize: "1.15rem" }} />,
        path: "/role",
      },
    ],
  },
];

export { sideBarItems };
