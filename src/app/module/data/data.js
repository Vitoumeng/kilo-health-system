import { MdSpeed } from "react-icons/md";
import { FaUserCircle , FaCalendarAlt, FaTag } from "react-icons/fa";
import { BsGrid1X2Fill } from "react-icons/bs";
import { FaUserGear } from "react-icons/fa6";

export const sideBarSections = [
    {
        items: [
            { name: "Dashboard", icon: <MdSpeed />, path: "/" },
        ],
    },
    {
        heading: "Content Management",
        items: [
            { name: "Blog", icon: <FaCalendarAlt />, path: "/blog" },
            { name: "Event", icon: <FaCalendarAlt />, path: "/event" },
            { name: "Category", icon: <BsGrid1X2Fill />, path: "/category" },
            { name: "Tag", icon: <FaTag />, path: "/tag" },
        ],
    },
    {
        heading: "Administration",
        items: [
            { name: "User Management", icon: <FaUserCircle />, path: "/user-management" },
            { name: "Role", icon: <FaUserGear />, path: "/role" },
        ],
    },
];
