import React, { useEffect, useRef, useState } from "react";
import useCategory from "../../category/core/action";
import useTopic from "../core/action";
import { FaTrashAlt } from "react-icons/fa";

const Add = () => {
  const { fetchCategory, category } = useCategory();
  const { handleChangeAdd, handleFileChangeAdd, onCreateTopic } = useTopic();
  const fileInputRef = useRef();
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(null);
  const [payload, setPayload] = useState({
    name: "",
    categoryId: null,
  });

  useEffect(() => {
    fetchCategory(20000, 1);
  }, []);

  let { name, categoryId } = payload;

  // console.log(category);
  // console.log(payload);

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
          onSubmit={(e) => onCreateTopic(e, payload)}
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
              htmlFor="categoryId"
              className="form-label text-light text-start"
            >
              Category Id <span className="text-danger">*</span>
            </label>
            <select
              className="form-select bg-dark text-light border-0"
              id="categoryId"
              name="categoryId"
              required
              value={categoryId || ""}
              onChange={(e) => handleChangeAdd(e, payload, setPayload)}
            >
              <option value="" selected disabled>
                Select Category <span className="text-danger">*</span>
              </option>
              {category?.map((cat) => (
                <option key={cat?.id} value={cat?.id}>
                  {cat?.name}
                </option>
              ))}
            </select>
          </div>

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
