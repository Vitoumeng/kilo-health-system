import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import logoImg from "../../../assets/img/logo.svg";
import "./Sidebar.css";
import { sidebarData } from "../../../constant/data";
import { useAuth } from "../../auth/core/action";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const { logout } = useAuth();

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="sidebar">
      <header>
        <Link to="/">
          <img src={logoImg} alt="KiloIT Logo" />
          <span>KiloIT</span>
        </Link>
      </header>
      <ul className="sidebar-list">
        {sidebarData.map((item, index) => {
          if (item.category) {
            return (
              <li key={index} className="title">
                {item.category}
              </li>
            );
          }

          return (
            <li
              key={index}
              className={`sidebar-item ${
                activeItem === item.title ? "active" : ""
              }`}
            >
              <Link to={item.path} onClick={() => handleItemClick(item.title)}>
                <span>{item.icon}</span>
                <span>{item.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <button className="logout" onClick={logout}>
        <span>
          <FaSignOutAlt />
        </span>
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
