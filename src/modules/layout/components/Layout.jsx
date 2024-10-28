import { useState } from "react";
import "./Layout.css";
import Sidebar from "./Sidebar";
import Topnav from "./Topnav";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <div className="wrapper">
      <div className={`sidenav ${open ? "sidebar-hide" : ""}`}>
        <Sidebar />
      </div>
      <div className={`${open ? "" : "content"}`}>
        <Topnav toggle={toggle} />
        <div className="outlet">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
