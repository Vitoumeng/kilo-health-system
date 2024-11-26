import useRole from "../core/action";

const Add = () => {
  const { onChangeAdd, onCreateRole, roleInfo } = useRole();

  let { name, code, module } = roleInfo;

  console.log(roleInfo);

  return (
    <div className="d-flex gap-0 flex-column align-items-baseline">
      <div className="container p-3 d-flex align-items-start flex-column">
        <h4 className="mb-0 text-light">Add Role</h4>
        <p className="fw-medium text-secondary">
          User Management <span className="ms-2 text-light">Add Role</span>
        </p>
      </div>
      <div
        className="container p-3 rounded-2"
        style={{ background: "#212225" }}
      >
        <form
          className="form-control bg-transparent border-0"
          onSubmit={(e) => onCreateRole(e)}
        >
          <div className="mb-3">
            <label htmlFor="code" className="form-label text-start text-light">
              Code <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control bg-dark text-light border-0"
              id="code"
              name="code"
              required
              value={code}
              onChange={onChangeAdd}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="form-label text-start text-light">
              Name<span className=" text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control bg-dark text-light border-0"
              id="name"
              name="name"
              required
              value={name}
              onChange={onChangeAdd}
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="module"
              className="form-label text-start text-light"
            >
              Module <span className=" text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control bg-dark text-light border-0"
              id="module"
              name="module"
              required
              value={module}
              onChange={onChangeAdd}
            />
          </div>

          <div className="mt-3 d-flex align-items-center justify-content-center gap-2">
            <button
              type="button"
              //   onClick={() => onResetRoleInfo()}
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

export default Add;
