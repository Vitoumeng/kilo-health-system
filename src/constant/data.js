import {
  FaChartLine,
  FaDollarSign,
  FaUserCircle,
  FaTh,
  FaHamburger,
  FaSignOutAlt,
  FaBoxes,
  FaUserCheck,
} from "react-icons/fa";

export const sidebarData = [
  { category: "Home" },
  {
    title: "Dashboard",
    path: "/",
    icon: <FaChartLine />,
  },
  {
    title: "Order",
    path: "/order",
    icon: <FaBoxes />,
  },
  {
    title: "Food",
    path: "/food",
    icon: <FaHamburger />,
  },
  {
    title: "Table",
    path: "/table",
    icon: <FaTh />,
  },
  { category: "Report" },
  {
    title: "Foods",
    path: "/foods",
    icon: <FaHamburger />,
  },
  {
    title: "Income",
    path: "/income",
    icon: <FaDollarSign />,
  },
  { category: "Administrator" },
  {
    title: "User Management",
    path: "/user-management",
    icon: <FaUserCircle />,
  },
  {
    title: "Roles",
    path: "/roles",
    icon: <FaUserCheck />,
  },
];
