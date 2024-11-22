import React from "react";
import Logo from "../../logo.svg";
import { Image } from "react-bootstrap";
import { sideBarItems } from "../data/data";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar d-flex flex-column">
      <header
        style={{ borderBottom: "1px dashed #333", height: "70px" }}
        className="d-flex align-items-center"
      >
        <div className="p-2 ps-4">
          <Image
            src={Logo}
            alt="Logo"
            style={{ width: "50px", height: "50px" }}
          />
        </div>
        <span className="text-light fw-semibold">KiloIT</span>
      </header>
      <div className="p-3">
        <ul className="nav flex-column mt-3">
          {sideBarItems.map((sideBar, index) => (
            <React.Fragment key={index}>
              {sideBar.heading && (
                <li
                  className="nav-heading title-color text-uppercase mt-4 ms-2 mb-2 px-1 fw-medium text-start"
                  style={{ fontSize: ".8rem" }}
                >
                  {sideBar?.heading}
                </li>
              )}
              {sideBar.items.map((item, index) => (
                <li className="nav-item my-1" key={index}>
                  <NavLink
                    to={item.path}
                    className="nav-link nav-custome text-light rounded-2 d-flex align-items-center gap-2"
                  >
                    <span className="mx-2">
                      {item.icon}
                    </span>
                    <span className="mt-1" style={{ fontSize: ".8rem" }}>
                      {item.name}
                    </span>
                  </NavLink>
                </li>
              ))}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
