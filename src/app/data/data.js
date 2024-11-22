import { BsPostcard } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import { LuUser, LuUserCog } from "react-icons/lu";
import { MdOutlineTopic, MdSpeed } from "react-icons/md";

const sideBarItems = [
  {
    items: [
      {
        name: "Dashboard",
        icon: <MdSpeed />,
        path: "/",
      },
    ],
  },
  {
    heading: "Content Management",
    items: [
      {
        name: "Category",
        icon: <FaListUl />,
        path: "/category",
      },
      {
        name: "Post",
        icon: <BsPostcard />,
        path: "/post",
      },
      {
        name: "Topic",
        icon: <MdOutlineTopic />,
        path: "/topic",
      },
    ],
  },
  {
    heading: "Administration",
    items: [
      {
        name: "User",
        icon: <LuUser />,
        path: "/user",
      },
      {
        name: "Role",
        icon: <LuUserCog />,
        path: "/role",
      },
    ],
  },
];

export { sideBarItems };
