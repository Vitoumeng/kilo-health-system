import { useEffect, useState } from "react";
import useUser from "../core/action";

export const UserAdd = () => {
  const { role, fetchRole, onCreateUser, userInfo, handleInputChangeAdd } =
    useUser();

  const [avatar, setAvatar] = useState(null);

  let { name, username, email, address, password, phone, bio } = userInfo;

  useEffect(() => {
    fetchRole();
  }, []);

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  console.log(userInfo);

  return (
    <>
      <div className="d-flex gap-0 flex-column align-items-baseline">
        <h4 className="mb-0">Create User</h4>
        <p className="fw-medium text-secondary">
          User Management <span className="ms-2 text-dark">Create User</span>
        </p>
        <div className="container bg-body p-3 rounded-2">
          <form
            onSubmit={(e) => onCreateUser(e, { ...userInfo, avatar })}
            className="form-control border-0"
          >
            <div className="mb-3">
              <label htmlFor="avatar" className="form-label text-start">
                Avatar <span className="text-danger">*</span>
              </label>
              <input
                type="file"
                className="form-control"
                id="avatar"
                name="avatar"
                onChange={handleFileChange}
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
                value={name}
                onChange={handleInputChangeAdd}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="username" className="form-label text-start">
                Username <span className=" text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={username}
                onChange={handleInputChangeAdd}
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
                onChange={handleInputChangeAdd}
                required
              >
                <option value="" selected disabled>
                  Select Role <span className=" text-danger">*</span>
                </option>
                {role.map((roleItem) => (
                  <option key={roleItem.id} value={roleItem.id}>
                    {roleItem.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label text-start">
                Email <span className=" text-danger">*</span>
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={handleInputChangeAdd}
                required
              />
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
                value={address}
                onChange={handleInputChangeAdd}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label text-start">
                Password <span className=" text-danger">*</span>
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                onChange={handleInputChangeAdd}
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
                value={phone}
                onChange={handleInputChangeAdd}
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
                value={bio}
                onChange={handleInputChangeAdd}
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
