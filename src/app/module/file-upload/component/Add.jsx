import { useRef, useState } from "react";
import useFile from "../core/action";
import { IoCloseSharp } from "react-icons/io5";

const Add = () => {
  const { onCreateFile } = useFile();
  const [files, setFiles] = useState(null);
  const fileInputRef = useRef();
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileSizeInMB = selectedFile.size / (1024 * 1024);
      if (fileSizeInMB > 1) {
        setError(
          `File size is ${fileSizeInMB.toFixed(2)}MB; must be under 1MB.`
        );
        fileInputRef.current.value = "";
        setPreview(null);
        return;
      }
      setError(null);
      setFiles(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // Set image preview
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (files) {
      const formData = new FormData();
      formData.append("files", files);
      onCreateFile(e, formData);
    } else {
      console.log("Please select a file before submitting.");
    }
  };

  const handleDiscard = () => {
    setFiles(null);
    setPreview(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div
      className="container text-light p-3 rounded-2"
      style={{ background: "#212225" }}
    >
      <div className="container p-3 d-flex align-items-start flex-column">
        <h4 className="mb-0">Add File</h4>
        <p className="fw-medium text-secondary">
          File Upload <span className="ms-2 text-light">Add File</span>
        </p>
      </div>
      <div className="container bg-dark p-3 rounded-2">
        <form
          onSubmit={handleSubmit}
          className="form-control text-light border-0 bg-transparent"
        >
          {preview && (
            <div className="mb-3">
              <label className="form-label text-light text-start">
                Preview
              </label>
              <div
                style={{
                  width: "250px",
                  height: "250px",
                  borderRadius: "8px",
                  border: "2px solid #1e1e1e",
                  position: "relative",
                }}
              >
                <div
                  onClick={() => {
                    fileInputRef.current.value = "";
                    setPreview(null);
                  }}
                  style={{
                    position: "absolute",
                    right: "-1rem",
                    top: "50%",
                    background: "red",
                    width: "35px",
                    height: "35px",
                    transform: "translateY(-50%)",
                    color: "white",
                    fontSize: "16px",
                    cursor: "pointer",
                    borderRadius: "8px",
                    display: "grid",
                    placeContent: "center",
                  }}
                >
                  <IoCloseSharp style={{ fontSize: "24px" }} />
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

          <div className="mb-3">
            <label htmlFor="file" className="form-label text-start">
              File <span className="text-danger">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              className="form-control bg-dark text-light"
              id="file"
              name="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              required
            />
            {error && (
              <p className="mt-2 text-end text-danger" aria-live="polite">
                {error}
              </p>
            )}
          </div>

          <div className="mt-3 d-flex justify-content-center">
            <button
              type="button"
              onClick={handleDiscard}
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
