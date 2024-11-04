import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useUser from "../core/action";

export const UserEdit = () => {
  const {
    userDetails,
    fetchUserById,
    role,
    fetchRole,
    handleInputChangeEdit,
    navigate,
    onEditUser,
  } = useUser();

  const { id } = useParams();

  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    fetchRole().then(() => {
      fetchUserById(id);
    });
  }, [id]);

  let { name, roleId, address, phone, bio } = userDetails;

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  console.log(userDetails);

  return (
    <>
      <div className="d-flex gap-0 flex-column align-items-baseline">
        <h4 className="mb-0">Edit User</h4>
        <p className="fw-medium text-secondary">
          User Management <span className="ms-2 text-dark">Edit User</span>
        </p>
        <div className="container bg-body p-3 rounded-2">
          <form
            className="form-control border-0"
            onSubmit={(e) => onEditUser(e, { ...userDetails, avatar })}
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
                required
                onChange={handleFileChange}
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
                required
                onChange={handleInputChangeEdit}
                value={name}
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
                required
                onChange={handleInputChangeEdit}
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
              <label htmlFor="address" className="form-label text-start">
                Address <span className=" text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                required
                onChange={handleInputChangeEdit}
                value={address}
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
                required
                onChange={handleInputChangeEdit}
                value={phone}
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
                onChange={handleInputChangeEdit}
                value={bio}
              ></textarea>
            </div>

            <div className="mt-3">
              <button
                type="button"
                onClick={() => navigate("/user-management")}
                className="btn btn-secondary me-2"
              >
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
