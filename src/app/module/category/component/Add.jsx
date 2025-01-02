import React, { useRef, useState } from "react";
import useCategory from "../core/action";

const Add = () => {
  const { onCreateCategory } = useCategory();
  const [payload, setPayload] = useState({ name: "", file: "" });
  const [error, setError] = useState("");
  const fileInputRef = useRef();

  const { name } = payload;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileSizeInMB = selectedFile.size / (1024 * 1024);
      if (fileSizeInMB > 1) {
        setError(
          `File size is ${fileSizeInMB.toFixed(2)}MB; must be under 1MB.`
        );
        fileInputRef.current.value = "";
        return;
      }
      setError(null);
      setPayload({ ...payload, file: selectedFile });
    }
  };

  // console.log(payload);

  return (
    <div className="d-flex gap-0 flex-column align-items-baseline">
      <div className="container p-3 d-flex align-items-start flex-column">
        <h4 className="mb-0 text-light">Add Category</h4>
        <p className="fw-medium text-secondary">
          Category <span className="ms-2 text-light">Add Category</span>
        </p>
      </div>

      <div
        className="container text-light p-3 rounded-2"
        style={{ background: "#212225" }}
      >
        <form
          onSubmit={(e) => onCreateCategory(e, payload)}
          className="form-control border-0 bg-transparent text-light"
        >
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-light text-start">
              Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control bg-dark text-light border-0"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setPayload({ ...payload, name: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="form-label text-light text-start">
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
              onChange={handleFileChange}
              required
            />
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
    </div>
  );
};

export default Add;
