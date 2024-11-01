import React from "react";
import { NavLink } from "react-router-dom";
import imgLogo from "../../logo.svg"
import { sideBarSections } from "../module/data/data";
import "../../_template/style/css/Layout.css";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const Sidebar = ({ storedTheme, show, setShow }) => {
    return (
        <div className={`sidebar d-flex flex-column ${show ? "hide" : "show"} ${storedTheme.storedTheme === "dark" ? "light" : "dark"}`}>
            <header className="position-relative d-flex align-items-center" style={{
                borderBottom: "1px dashed #333",
                height: "70px"
            }}>
                <div className="p-2 ps-4">
                    <img src={imgLogo} alt="Image" style={{
                        width: "50px",
                        height: "50px"
                    }} />
                </div>
                <span className={`title-color fw-bold ${storedTheme.storedTheme === "dark" ? "dark" : "light"}`}>KiloIT-System</span>

                <div
                    className={`toggle-show d-flex justify-content-center align-items-center fs-4 ${storedTheme.storedTheme === "dark" ? "dark" : "light"} ${show ? "hide" : "show"}`}
                    onClick={() => setShow(!show)}>
                    {
                        <MdKeyboardDoubleArrowRight class={`icon-arrow  ${show ? "hide" : "show"}`} />
                    }
                </div>

            </header>
            <div className="p-3">
                <ul className="nav flex-column mt-3">
                    {sideBarSections.map((section, sectionIndex) => (
                        <React.Fragment key={sectionIndex}>
                            {section.heading && (
                                <li className="nav-heading title-color text-uppercase mt-4 ms-2 mb-2 px-1 fw-medium"
                                    style={{
                                        fontSize: ".8rem",
                                        textAlign: "start",
                                        color: storedTheme.storedTheme === "dark" ? "#212125" : "#f8f8f8"
                                    }}>{section.heading}</li>
                            )}
                            {section.items.map((item, itemIndex) => (
                                <li className="nav-item my-1" key={itemIndex}>
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) => `nav-link nav-custome d-flex align-items-center gap-2 ${storedTheme.storedTheme === "dark" ? "light" : "dark"} ${isActive ? "active" : ""}`}
                                    >
                                        <span className="ms-0" style={{
                                            fontSize: "1rem",
                                            color: storedTheme.storedTheme === "dark" ? "#000" : "#fff"
                                        }}>{item.icon}</span>
                                        <span className="mt-1"
                                              style={{
                                                  fontSize: ".8rem",
                                                  color: storedTheme.storedTheme === "dark" ? "#212525" : "#f8f8f8"
                                              }}
                                        >
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
