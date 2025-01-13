import { useParams } from "react-router";
import useUser from "../core/action";
import { useEffect, useRef, useState } from "react";
import useRole from "../../Role/core/action";
import { FaRegPenToSquare } from "react-icons/fa6";

const Edit = () => {
  const { roles, fetchRole } = useRole();
  const {
    fetchUserById,
    userDetails,
    handleFileChangeEdit,
    handleChangeEdit,
    onUpdateUser,
  } = useUser();
  const { id } = useParams();
  const [payload, setPayload] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    dob: "",
    role: "",
    address: "",
    email: "",
    phone: "",
    fileMedia: {},
  });
  const fileInputRef = useRef();
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(null);
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    fetchRole();
    fetchUserById(id);
  }, [id]); // eslint-disable-line

  useEffect(() => {
    if (userDetails) {
      setPayload(userDetails);
    }
  }, [userDetails]); // eslint-disable

  let { firstname, lastname, gender, dob, role, fileMedia } = payload;

  // console.log(payload);

  return (
    <div className="d-flex gap-0 flex-column align-items-baseline">
      <div className="container p-3 d-flex align-items-start flex-column">
        <h4 className="mb-0 text-light">Edit User</h4>
        <p className="fw-medium text-secondary">
          User Management <span className="ms-2 text-light">Edit User</span>
        </p>
      </div>
      <div
        className="container text-light p-3 rounded-2"
        style={{ background: "#212225" }}
      >
        <form
          onSubmit={(e) => onUpdateUser(e, payload)}
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
              onChange={(e) => handleChangeEdit(e, payload, setPayload)}
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
              onChange={(e) => handleChangeEdit(e, payload, setPayload)}
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
                  onChange={(e) => handleChangeEdit(e, payload, setPayload)}
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
                  onChange={(e) => handleChangeEdit(e, payload, setPayload)}
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
              onChange={(e) => handleChangeEdit(e, payload, setPayload)}
              required
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="roleId"
              className="form-label text-light text-start"
            >
              Role <span className="text-danger">*</span>
            </label>
            <select
              className="form-select bg-dark text-light border-0"
              id="roleId"
              name="roleId"
              required
              value={role?.id}
              onChange={(e) => handleChangeEdit(e, payload, setPayload)}
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

          {edit && (
            <div className="mb-3">
              <label
                htmlFor="file"
                className={`form-label text-light text-start${
                  error && "text-danger fst-italic"
                }`}
              >
                File Upload <span className="text-danger">*</span>{" "}
                {error && (
                  <span className="text-danger" style={{ fontSize: "12px" }}>
                    {error}
                  </span>
                )}
              </label>
              <input
                type="file"
                className="form-control bg-dark text-light border-0"
                id="file"
                name="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={(e) =>
                  handleFileChangeEdit(
                    e,
                    setError,
                    setPayload,
                    payload,
                    fileInputRef,
                    setPreview
                  )
                }
              />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label text-start">User Image</label>
            <div
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "8px",
                position: "relative",
                background: "#00ACEA",
                boxShadow: "0 1px 8px rgba(0, 0, 0, .5)",
              }}
            >
              {edit ?? (
                <div
                  onClick={() => {
                    setPreview(null);
                    setEdit(true);
                  }}
                  style={{
                    position: "absolute",
                    right: "-.5rem",
                    top: "-.5rem",
                    background: "lightskyblue",
                    width: "20px",
                    height: "20px",
                    color: "white",
                    fontSize: "16px",
                    cursor: "pointer",
                    borderRadius: "4px",
                    display: "grid",
                    placeContent: "center",
                    boxShadow: "0 1px 8px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <FaRegPenToSquare style={{ fontSize: "12px" }} />
                </div>
              )}
              <img
                src={preview ? preview : fileMedia?.fileUrl}
                alt="File Preview"
                className="w-100 h-100"
                style={{ objectFit: "cover", borderRadius: "8px" }}
              />
            </div>
          </div>

          <div className="mt-3 d-flex align-items-center justify-content-center gap-2">
            <button
              type="button"
              onClick={() => {
                fetchUserById(id);
                setPreview(fileMedia?.fileUrl);
                setEdit(null);
              }}
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
    </div>
  );
};

export default Edit;
