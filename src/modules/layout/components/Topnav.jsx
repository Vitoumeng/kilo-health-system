import { FaBars } from "react-icons/fa";
import "./Topnav.css";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../../auth/core/action";

const Topnav = ({ toggle }) => {
  const { logout } = useAuth();
  const { auth } = useSelector((state) => state.auth);
  console.log(auth.user);

  const [showInfo, setShowInfo] = useState(false);
  const infoRef = useRef(null);

  const handleClickOutside = (event) => {
    if (infoRef.current && !infoRef.current.contains(event.target)) {
      setShowInfo(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="topnav">
      <nav>
        <span onClick={toggle}>
          <FaBars />
        </span>

        <div className="info" ref={infoRef}>
          <div className="profile" onClick={() => setShowInfo(!showInfo)}>
            <img src={auth.user.avatar} alt="Profile" />
            <span>{auth.user.username}</span>
          </div>

          <ul className={`dropdown ${showInfo ? "show" : ""}`}>
            <li onClick={() => setShowInfo(!showInfo)}>Profile</li>
            <li onClick={() => setShowInfo(!showInfo)}>Dashboard</li>
            <li
              onClick={() => {
                setShowInfo(!showInfo);
                logout();
              }}
              className="t-logout"
            >
              Logout
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Topnav;
