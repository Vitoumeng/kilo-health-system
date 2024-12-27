import React, { useEffect } from "react";
import useRole from "../../Role/core/action";
import useUser from "../core/action";
import useFile from "../../../file-upload/core/action";

const Add = () => {
  const { fetchRole, roles } = useRole();
  const { userInfo, onChangeAdd, onCreateUser } = useUser();
  const { fetchFiles, file } = useFile();

  let {
    firstname,
    lastname,
    username,
    email,
    password,
    phone,
    address,
    gender,
    dob,
    fileMediaId,
  } = userInfo;

  useEffect(() => {
    fetchFiles(20000, 1);
    fetchRole();
  }, []);

  //   console.log(roles);
  // console.log(userInfo);

  return (
    <div
      className="container text-light p-3 rounded-2"
      style={{ background: "#212225" }}
    >
      <form
        onSubmit={(e) => onCreateUser(e)}
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
            onChange={onChangeAdd}
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
            onChange={onChangeAdd}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="dob" className="form-label text-light text-start">
            Username <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control bg-dark text-light border-0"
            id="username"
            name="username"
            value={username}
            onChange={onChangeAdd}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="dob" className="form-label text-light text-start">
            Email <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            className="form-control bg-dark text-light border-0"
            id="email"
            name="email"
            value={email}
            onChange={onChangeAdd}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="dob" className="form-label text-light text-start">
            Password <span className="text-danger">*</span>
          </label>
          <input
            type="password"
            className="form-control bg-dark text-light border-0"
            id="password"
            name="password"
            value={password}
            onChange={onChangeAdd}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="dob" className="form-label text-light text-start">
            Phone <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            className="form-control bg-dark text-light border-0"
            id="phone"
            name="phone"
            value={phone}
            onChange={onChangeAdd}
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
            onChange={onChangeAdd}
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
                onChange={onChangeAdd}
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
                onChange={onChangeAdd}
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
            onChange={onChangeAdd}
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
            value={roles?.id}
            onChange={onChangeAdd}
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

        <div className="mb-3">
          <label
            htmlFor="fileMediaId"
            className="form-label text-light text-start"
          >
            File Media <span className="text-danger">*</span>
          </label>
          <select
            className="form-select bg-dark text-light border-0"
            id="fileMediaId"
            name="fileMediaId"
            required
            value={fileMediaId || ""}
            onChange={onChangeAdd}
          >
            <option value="" selected disabled>
              Select Media Id <span className="text-danger">*</span>
            </option>
            {file?.map((fi) => (
              <option key={fi?.id} value={fi?.id}>
                {fi?.fileName}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-3 d-flex align-items-center justify-content-center gap-2">
          <button
            type="button"
            //   onClick={() => fetchUserById(id)}
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

export default Add;
