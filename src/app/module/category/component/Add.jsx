import React, { useRef, useState } from "react";
import useCategory from "../core/action";
import { FaTrashAlt } from "react-icons/fa";

const Add = () => {
  const { onCreateCategory, handleChangeAdd, handleFileChangeAdd } =
    useCategory();
  const [payload, setPayload] = useState({ name: "", file: "" });
  const [error, setError] = useState("");
  const fileInputRef = useRef();
  const [preview, setPreview] = useState(null);

  const { name } = payload;

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
              onChange={(e) => handleChangeAdd(e, payload, setPayload)}
              required
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="file"
              className={`form-label text-light text-start${
                error && "text-danger text-decoration-line-through fst-italic"
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
                handleFileChangeAdd(
                  e,
                  setError,
                  setPayload,
                  payload,
                  fileInputRef,
                  setPreview
                )
              }
              required
            />
          </div>

          {preview && (
            <div className="mb-3">
              <label className="form-label text-start">Preview</label>
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
                <div
                  onClick={() => {
                    fileInputRef.current.value = "";
                    setPreview(null);
                  }}
                  style={{
                    position: "absolute",
                    right: "-.5rem",
                    top: "-.5rem",
                    background: "lightcoral",
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
                  <FaTrashAlt style={{ fontSize: "12px" }} />
                </div>
                <img
                  src={preview}
                  alt="File Preview"
                  className="w-100 h-100"
                  style={{ objectFit: "cover", borderRadius: "8px" }}
                />
              </div>
            </div>
          )}

          <div className="mt-3 d-flex align-items-center justify-content-center gap-2">
            <button
              type="button"
              onClick={() => {
                setPayload({ name: "", file: "" });
                fileInputRef.current.value = "";
                setPreview(null);
                setError("");
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

export default Add;
