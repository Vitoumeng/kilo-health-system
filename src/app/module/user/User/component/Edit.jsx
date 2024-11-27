import { useParams } from "react-router";
import useUser from "../core/action";
import { useEffect } from "react";
import useRole from "../../Role/core/action";

const Edit = () => {
  const { roles, fetchRole } = useRole();
  const { fetchUserById, userDetails, onChangeEdit, onUpdateUser } = useUser();
  const { id } = useParams();

  useEffect(() => {
    fetchRole();
    fetchUserById(id);
  }, [id]);

  let { firstname, lastname, gender, dob, role, address, email, phone } =
    userDetails;

  console.log(userDetails);

  return (
    <div
      className="container text-light p-3 rounded-2"
      style={{ background: "#212225" }}
    >
      <form
        onSubmit={(e) => onUpdateUser(e)}
        className="form-control border-0 bg-transparent text-light"
      >
        <div className="mb-3">
          <label
            htmlFor="firstname"
            className="form-label text-light text-start"
          >
            FirstName <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control bg-dark text-light border-0"
            id="firstname"
            name="firstname"
            value={firstname}
            onChange={onChangeEdit}
            required
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="lastname"
            className="form-label text-light text-start"
          >
            Last Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control bg-dark text-light border-0"
            id="lastname"
            name="lastname"
            value={lastname}
            onChange={onChangeEdit}
            required
          />
        </div>

        <div className="mb-3">
          <label className="text-light">
            Gender <span className="text-danger">*</span>
          </label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="Male"
                value="Male"
                checked={gender === "Male"}
                onChange={onChangeEdit}
              />
              <label className="form-check-label text-light" htmlFor="Male">
                Male
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="Female"
                value="Female"
                checked={gender === "Female"}
                onChange={onChangeEdit}
              />
              <label className="form-check-label text-light" htmlFor="Female">
                Female
              </label>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="dob" className="form-label text-light text-start">
            Date of Birth <span className="text-danger">*</span>
          </label>
          <input
            type="date"
            className="form-control bg-dark text-light border-0"
            id="dob"
            name="dob"
            value={dob}
            onChange={onChangeEdit}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label text-light text-start">
            Address <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control bg-dark text-light border-0"
            id="address"
            name="address"
            value={address}
            onChange={onChangeEdit}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label text-light text-start">
            Email <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            className="form-control bg-dark text-light border-0"
            id="email"
            name="email"
            value={email}
            onChange={onChangeEdit}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label text-light text-start">
            Phone Number <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            className="form-control bg-dark text-light border-0"
            id="phone"
            name="phone"
            value={phone}
            onChange={onChangeEdit}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="roleId" className="form-label text-light text-start">
            Role <span className="text-danger">*</span>
          </label>
          <select
            className="form-select bg-dark text-light border-0"
            id="roleId"
            name="roleId"
            required
            value={role?.id}
            onChange={onChangeEdit}
          >
            <option value="" selected disabled>
              Select Role <span className="text-danger">*</span>
            </option>
            {roles?.map((roleItem) => (
              <option key={roleItem.id} value={roleItem.id}>
                {roleItem.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-3 d-flex align-items-center justify-content-center gap-2">
          <button
            type="button"
            // onClick={() => fetchUserById(id)}
            className="btn btn-outline-light me-2"
          >
            Discard
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
