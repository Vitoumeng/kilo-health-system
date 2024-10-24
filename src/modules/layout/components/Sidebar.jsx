import React, { useState } from "react";
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
import { Link } from "react-router-dom";
import logoImg from "../../../assets/img/logo.svg";
import "./Sidebar.css";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");

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
        <li className="title">Home</li>
        <li
          className={`sidebar-item ${
            activeItem === "Dashboard" ? "active" : ""
          }`}
        >
          <Link to="/" onClick={() => handleItemClick("Dashboard")}>
            <span>
              <FaChartLine />
            </span>
            <span>Dashboard</span>
          </Link>
        </li>
        <li
          className={`sidebar-item ${activeItem === "Order" ? "active" : ""}`}
        >
          <Link to="/" onClick={() => handleItemClick("Order")}>
            <span>
              <FaBoxes />
            </span>
            <span>Order</span>
          </Link>
        </li>
        <li className={`sidebar-item ${activeItem === "Food" ? "active" : ""}`}>
          <Link to="/" onClick={() => handleItemClick("Food")}>
            <span>
              <FaHamburger />
            </span>
            <span>Food</span>
          </Link>
        </li>
        <li
          className={`sidebar-item ${activeItem === "Table" ? "active" : ""}`}
        >
          <Link to="/" onClick={() => handleItemClick("Table")}>
            <span>
              <FaTh />
            </span>
            <span>Table</span>
          </Link>
        </li>
        <li className="title">Report</li>
        <li
          className={`sidebar-item ${
            activeItem === "Food Report" ? "active" : ""
          }`}
        >
          <Link to="/" onClick={() => handleItemClick("Food Report")}>
            <span>
              <FaHamburger />
            </span>
            <span>Food</span>
          </Link>
        </li>
        <li
          className={`sidebar-item ${activeItem === "Income" ? "active" : ""}`}
        >
          <Link to="/" onClick={() => handleItemClick("Income")}>
            <span>
              <FaDollarSign />
            </span>
            <span>Income</span>
          </Link>
        </li>
        <li className="title">Administrator</li>
        <li
          className={`sidebar-item ${
            activeItem === "User Management" ? "active" : ""
          }`}
        >
          <Link to="/" onClick={() => handleItemClick("User Management")}>
            <span>
              <FaUserCircle />
            </span>
            <span>User Management</span>
          </Link>
        </li>
        <li
          className={`sidebar-item ${activeItem === "Roles" ? "active" : ""}`}
        >
          <Link to="/" onClick={() => handleItemClick("Roles")}>
            <span>
              <FaUserCheck />
            </span>
            <span>Roles</span>
          </Link>
        </li>
      </ul>
      <Link to="/" className="logout">
        <span>
          <FaSignOutAlt />
        </span>
        <span>Logout</span>
      </Link>
    </div>
  );
};

export default Sidebar;
