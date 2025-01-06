import { useRef, useState } from "react";
import useFile from "../core/action";
import { FaTrashAlt } from "react-icons/fa";

const Add = () => {
  const { onCreateFile, handleFileChangeAdd } = useFile();
  const [files, setFiles] = useState({});
  const fileInputRef = useRef();
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);

  return (
    <div className="d-flex gap-0 flex-column align-items-baseline">
      <div className="container p-3 d-flex align-items-start flex-column">
        <h4 className="mb-0 text-light">Add Topic</h4>
        <p className="fw-medium text-secondary">
          Topic <span className="ms-2 text-light">Add Topic</span>
        </p>
      </div>
      <div
        className="container text-light p-3 rounded-2"
        style={{ background: "#212225" }}
      >
        <form
          onSubmit={(e) => onCreateFile(e, files)}
          className="form-control text-light border-0 bg-transparent"
        >
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
                handleFileChangeAdd(
                  e,
                  setError,
                  setFiles,
                  files,
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

          <div className="mt-3 d-flex justify-content-center">
            <button
              type="button"
              // onClick={handleDiscard}
              className="btn btn-secondary me-2"
            >
              Discard
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!files || !!error}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
