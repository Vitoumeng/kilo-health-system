import React, { useEffect, useRef, useState } from "react";
import useFile from "../../file-upload/core/action";
import useTopic from "../../topic/core/action";
import usePost from "../core/action";

const Add = () => {
  const { fetchTopic, topic } = useTopic();
  const { onCreatePost } = usePost();
  const [payload, setPayload] = useState({
    title: "",
    subTitle: "",
    description: "",
    status: false,
    topic_id: null,
  });
  const fileInputRef = useRef();
  const [error, setError] = useState("");

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

  useEffect(() => {
    fetchTopic(20000, 1);
  }, []);

  let { title, subTitle, description, publicAt, status, topic_id } = payload;

  const onChangeAdd = (e) =>
    setPayload({ ...payload, [e.target.name]: e.target.value });

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
          onSubmit={(e) => onCreatePost(e, payload)}
          className="form-control border-0 bg-transparent text-light"
        >
          <div className="mb-3">
            <label htmlFor="title" className="form-label text-light text-start">
              Title <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control bg-dark text-light border-0"
              id="title"
              name="title"
              value={title}
              onChange={onChangeAdd}
              required
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="subTitle"
              className="form-label text-light text-start"
            >
              Sub Title <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control bg-dark text-light border-0"
              id="subTitle"
              name="subTitle"
              value={subTitle}
              onChange={onChangeAdd}
              required
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="publicAt"
              className="form-label text-light text-start"
            >
              Date <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              className="form-control bg-dark text-light border-0"
              id="publicAt"
              name="publicAt"
              value={publicAt}
              onChange={onChangeAdd}
              required
            />
          </div>

          <div className="mb-3">
            <label className="text-light">
              Status <span className="text-danger">*</span>
            </label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="status"
                  id="true"
                  value={true}
                  checked={status === true || status === "true"}
                  onChange={onChangeAdd}
                />
                <label className="form-check-label text-light" htmlFor="true">
                  True
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="status"
                  id="false"
                  value="false"
                  checked={status === false || status === "false"}
                  onChange={onChangeAdd}
                />
                <label className="form-check-label text-light" htmlFor="false">
                  False
                </label>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label
              htmlFor="description"
              className="form-label text-light text-start"
            >
              Description <span className="text-danger">*</span>
            </label>
            <textarea
              className="form-control bg-dark text-light border-0"
              id="description"
              name="description"
              value={description || ""}
              onChange={onChangeAdd}
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label
              htmlFor="topic_id"
              className="form-label text-light text-start"
            >
              Topic <span className="text-danger">*</span>
            </label>
            <select
              className="form-select bg-dark text-light border-0"
              id="topic_id"
              name="topic_id"
              required
              value={topic_id || ""}
              onChange={onChangeAdd}
            >
              <option value="" selected disabled>
                Select Topic <span className="text-danger">*</span>
              </option>
              {topic?.map((top) => (
                <option key={top?.id} value={top?.id}>
                  {top?.name}
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
