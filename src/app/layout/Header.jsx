import React, { useEffect, useState } from "react";
import { LuSunMedium, LuMoon } from "react-icons/lu";
import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from "../module/auth/core/action";
import useUser from "../module/usermanagement/core/action";
import Swal from "sweetalert2";

const Header = ({ storedTheme, toggleTheme }) => {
  const { logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const { fetchUserProfile } = useUser();

  useEffect(() => {
    fetchUserProfile();
  }, []); 

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  };

  return (
    <header
      className="header d-flex justify-content-end align-items-center gap-3 p-1 pe-5"
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        left: 0,
        background: storedTheme.storedTheme === "dark" ? "#212520" : "#f3f3f3",
        height: "70px",
        boxShadow: "0 1px 4px rgba(0, 0, 0, .05)",
        transition: "margin-left .4s ease-in-out",
      }}
    >
      <div
        id="theme-toggler"
        className="d-flex fs-4 justify-content-center align-items-center"
        style={{ width: "35px", height: "35px", cursor: "pointer" }}
        onClick={toggleTheme}
      >
        {storedTheme.storedTheme === "dark" ? <LuSunMedium /> : <LuMoon />}
      </div>
      <div className="btn-group">
        <button
          className="dropdown-toggle border-0"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{
            width: "35px",
            height: "35px",
            borderRadius: "8px",
            background: "linear-gradient(to right, lightblue, lightpink)",
          }}
        ></button>
        <ul className="dropdown-menu">
          <li>
            <span
              onClick={() => setShowDropdown(true)}
              className="dropdown-item dropdown-custome"
            >
              Profile
            </span>
          </li>
          <li>
            <span
              onClick={handleLogout}
              className="dropdown-item border-top dropdown-custome"
            >
              Logout
            </span>
          </li>
        </ul>
      </div>
      <div className={`profile ${showDropdown ? "show" : ""}`}>
        <div onClick={() => setShowDropdown(false)} className="profile-close">
          <IoCloseSharp />
        </div>
      </div>
    </header>
  );
};

export default Header;
