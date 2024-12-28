import React, { useEffect } from "react";
import useFile from "../../file-upload/core/action";
import useCategory from "../core/action";

const Add = () => {
  const { file, fetchFiles } = useFile();
  const { categoryInfo, onChangeAdd, onCreateCategory } = useCategory();

  useEffect(() => {
    fetchFiles(20000, 1);
  }, []);

  let { name, mediaId } = categoryInfo;

  // console.log(categoryInfo);

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
          onSubmit={(e) => onCreateCategory(e)}
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
              onChange={onChangeAdd}
              required
            />
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
              onChange={onChangeAdd}
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
