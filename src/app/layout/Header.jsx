import { useLogin } from "../module/user/Auth/core/action";

const Header = ({toggleProfile}) => {
  const { onLogout, profile } = useLogin();

  let { username } = profile;
  // console.log(profile);

  return (
    <header className="container-fluid position-fixed w-100 header d-flex justify-content-end align-items-center p-1 pe-5 z-3">
      <div className="btn-group">
        <button
          className="dropdown-toggle border-0 text-light fw-bolder"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span className="text-uppercase">{username}</span>
        </button>

        <ul className="dropdown-menu border-0 py-0 rounded-2 shadow overflow-hidden">
          <li onClick={toggleProfile}>
            <span className="dropdown-item dropdown-profile">
              Profile
            </span>
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
