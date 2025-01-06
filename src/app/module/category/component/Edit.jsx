import { useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import useCategory from "../core/action";
import { FaRegPenToSquare } from "react-icons/fa6";

const Edit = () => {
  const {
    fetchCategoryById,
    categoryDetails,
    handleFileChangeEdit,
    handleChangeEdit,
    onUpdateCategory,
  } = useCategory();
  const { id } = useParams();

  const [payload, setPayload] = useState({ name: "", file: "" });
  const [error, setError] = useState("");
  const fileInputRef = useRef();
  const [preview, setPreview] = useState(null);
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    fetchCategoryById(id);
  }, [id]); // eslint-disable-line

  useEffect(() => {
    if (categoryDetails) {
      setPayload(categoryDetails);
    }
  }, [categoryDetails]); // eslint-disable-line

  let { name, fileMedia } = payload;

  // console.log(payload);

  return (
    <div className="d-flex gap-0 flex-column align-items-baseline">
      <div className="container p-3 d-flex align-items-start flex-column">
        <h4 className="mb-0 text-light">Edit Category</h4>
        <p className="fw-medium text-secondary">
          Category <span className="ms-2 text-light">Edit Category</span>
        </p>
      </div>

      <div
        className="container text-light p-3 rounded-2"
        style={{ background: "#212225" }}
      >
        <form
          onSubmit={(e) => onUpdateCategory(e, payload)}
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
              onChange={(e) => handleChangeEdit(e, payload, setPayload)}
              required
            />
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
              onClick={() => fetchUserById(id)}
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
