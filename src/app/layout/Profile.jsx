import { useLogin } from "../module/user/Auth/core/action";
import { IoMdClose } from "react-icons/io";

const Profile = ({ show, toggleProfile }) => {
  const { profile } = useLogin();

  //   console.log(profile);
  let {
    accountNonExpired,
    accountNonLocked,
    address,
    avatar,
    credentialsNonExpired,
    email,
    enabled,
    id,
    name,
    phone,
    roleId,
    roleName,
    username,
  } = profile;

  return (
    <div
      className="position-fixed d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        top: "0",
        left: "0",
        opacity: show ? "1" : "0",
        zIndex: show ? "1000" : "-1",
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
      }}
      onClick={toggleProfile}
    >
      <div
        className="position-fixed"
        style={{
          top: "50%",
          left: "50%",
          transition: "transform 0.6s ease-in-out",
          width: "550px",
          zIndex: "1001",
          transform: `scale(${show ? 1 : 0}) translate(-50%, -50%)`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="card card-profile shadow-lg">
          <div className="card-header py-4 d-flex justify-content-between align-items-center">
            <h4 className="mb-0 text-start">User Profile</h4>

            <div
              className="d-flex justify-content-center align-items-center"
              onClick={toggleProfile}
              style={{
                width: "35px",
                height: "35px",
                background: "crimson",
                borderRadius: "12px",
                cursor: "pointer",
              }}
            >
              <IoMdClose style={{ fontSize: "22px" }} />
            </div>
          </div>
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-4 text-center">
                <img
                  src={avatar || "https://via.placeholder.com/150"}
                  alt="User Avatar"
                  className="img-thumbnail rounded-circle border border-secondary"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="col-md-8">
                <p className="text-secondary">
                  <span className="profile-text text-light">Name:</span>{" "}
                  {name || "name"}
                </p>
                <p className="text-secondary">
                  <span className="profile-text text-light">Email:</span>{" "}
                  {email || "useremail@gmail.com"}
                </p>
                <p className="text-secondary">
                  <span className="profile-text text-light">Phone:</span>{" "}
                  {phone || "0123456789"}
                </p>
                <p className="text-secondary">
                  <span className="profile-text text-light">Address:</span>
                  {address || "Address"}
                </p>
              </div>
            </div>

            <hr className="bg-secondary" />

            <div className="row">
              <div className="col-md-6">
                <p className="text-secondary">
                  <span className="profile-text text-light">Username:</span>{" "}
                  {username || "Username"}
                </p>
                <p className="text-secondary">
                  <span className="profile-text text-light">Role:</span>{" "}
                  {roleName || "roleName"}
                </p>
                <p className="text-secondary">
                  <span className="profile-text text-light">Role ID:</span>{" "}
                  {roleId || "roleId"}
                </p>
              </div>
              <div className="col-md-6">
                <p className="text-secondary">
                  <span className="profile-text text-light">ID:</span> 84
                </p>
                <p className="text-secondary">
                  <span className="profile-text text-light">
                    Account Enabled:
                  </span>{" "}
                  {enabled ? "Yes" : "No"}
                </p>
                <p className="text-secondary">
                  <span className="profile-text text-light">
                    Account Locked:
                  </span>{" "}
                  {accountNonLocked ? "Yes" : "No"}
                </p>
              </div>
            </div>

            <hr className="bg-secondary" />

            <div>
              <h6 className="profile-title">Account Status</h6>
              <p className="text-secondary">
                <span className="profile-text text-light">
                  Account Non-Expired:
                </span>{" "}
                {accountNonExpired ? "Yes" : "No"}
              </p>
              <p className="text-secondary">
                <span className="profile-text text-light">
                  Credentials Non-Expired:
                </span>{" "}
                {credentialsNonExpired ? "Yes" : "No"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
