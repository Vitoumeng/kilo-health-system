import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useUser from "../core/action";

export const UserEdit = () => {
  const { fetchUserById, role, fetchRole } = useUser();
  const { id } = useParams();
  const [user, setUser] = useState({
    avatar: null,
    name: "",
    username: "",
    roleId: "",
    email: "",
    address: "",
    password: "",
    phone: "",
    bio: "",
  });

  useEffect(() => {
    fetchRole().then(() => {
      fetchUserById(id);
    });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  return (
    <>
      <div className="d-flex gap-0 flex-column align-items-baseline">
        <h4 className="mb-0">Edit User</h4>
        <p className="fw-medium text-secondary">
          User Management <span className="ms-2 text-dark">Edit User</span>
        </p>
        <div className="container bg-body p-3 rounded-2">
          <form className="form-control border-0">
            <div className="mb-3">
              <label htmlFor="avatar" className="form-label text-start">
                Avatar <span className="text-danger">*</span>
              </label>
              <input
                type="file"
                className="form-control"
                id="avatar"
                name="avatar"
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="name" className="form-label text-start">
                Name <span className=" text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={user.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="role_id" className="form-label text-start">
                Role <span className=" text-danger">*</span>
              </label>
              <select
                className="form-select"
                id="roleId"
                name="roleId"
                value={user.roleId}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select Role <span className=" text-danger">*</span>
                </option>
                {role.role &&
                  role.role.map((roleItem) => (
                    <option key={roleItem.id} value={roleItem.id}>
                      {roleItem.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label text-start">
                Address <span className=" text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={user.address}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label text-start">
                Phone
              </label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                value={user.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="bio" className="form-label text-start">
                Bio
              </label>
              <textarea
                className="form-control"
                id="bio"
                name="bio"
                rows="3"
                value={user.bio}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="mt-3">
              <button type="button" className="btn btn-secondary me-2">
                Discard
              </button>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
