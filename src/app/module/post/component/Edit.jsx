import React, { useEffect } from "react";
import useFile from "../../file-upload/core/action";
import useTopic from "../../topic/core/action";
import usePost from "../core/action";
import { useParams } from "react-router";

const Edit = () => {
  const { file, fetchFiles } = useFile();
  const { fetchTopic } = useTopic();
  const { fetchPostById, postDetails, onChangeEdit, onUpdatePost } = usePost();
  const { id } = useParams();

  useEffect(() => {
    fetchPostById(id);
    fetchFiles(20000, 1);
    fetchTopic(20000, 1);
  }, [id]);

  let { title, description, status, mediaId } = postDetails;

  console.log(postDetails);

  return (
    <div className="d-flex gap-0 flex-column align-items-baseline">
      <div className="container p-3 d-flex align-items-start flex-column">
        <h4 className="mb-0 text-light">Edit Topic</h4>
        <p className="fw-medium text-secondary">
          Topic <span className="ms-2 text-light">Edit Topic</span>
        </p>
      </div>
      <div
        className="container text-light p-3 rounded-2"
        style={{ background: "#212225" }}
      >
        <form
          onSubmit={(e) => onUpdatePost(e)}
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
              onChange={onChangeEdit}
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
                  onChange={onChangeEdit}
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
                  value={false}
                  checked={status === false || status === "false"}
                  onChange={onChangeEdit}
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
              value={description}
              onChange={onChangeEdit}
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label
              htmlFor="mediaId"
              className="form-label text-light text-start"
            >
              File Media <span className="text-danger">*</span>
            </label>
            <select
              className="form-select bg-dark text-light border-0"
              id="mediaId"
              name="mediaId"
              required
              value={mediaId || ""}
              onChange={onChangeEdit}
            >
              <option value="" selected disabled>
                Select Media Id <span className="text-danger">*</span>
              </option>
              {file?.map((fi) => (
                <option key={fi?.id} value={fi?.id}>
                  {fi?.fileName}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-3 d-flex align-items-center justify-content-center gap-2">
            <button
              type="button"
                onClick={() => fetchPostById(id)}
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
