import { Link } from "react-router-dom";
import { useLogin } from "../module/auth/core/action";

const Header = () => {
  const { onLogout } = useLogin();

  return (
    <header className="container-fluid position-fixed w-100 header d-flex justify-content-end align-items-center p-1 pe-5">
      <div className="btn-group">
        <button
          className="dropdown-toggle border-0 text-light fw-bolder"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span className="text-uppercase">Admin</span>
        </button>

        <ul className="dropdown-menu border-0 py-0 rounded-2 shadow overflow-hidden">
          <li>
            <Link to="/" className="dropdown-item dropdown-custome">
              Profile
            </Link>
          </li>
          <li onClick={onLogout}>
            <span className="dropdown-item border-top dropdown-logout">
              Logout
            </span>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
