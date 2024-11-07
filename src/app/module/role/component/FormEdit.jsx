import { useNavigate } from "react-router";

const FormEdit = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex gap-0 flex-column align-items-baseline">
      <h4 className="mb-0">Edit Role</h4>
      <p className="fw-medium text-secondary">
        Role <span className="ms-2 text-dark">Edit Role</span>
      </p>
      <div className="container bg-body p-3 rounded-2">
        <form
          className="form-control border-0"
          // onSubmit={(e) => onEditUser(e, { ...userDetails, avatar })}
        >
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
              //   onChange={handleInputChangeEdit}
              //   value={name}
            />
          </div>

          <div className="mt-3">
            <button
              type="button"
              onClick={() => navigate("/role")}
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
  );
};

export default FormEdit;
