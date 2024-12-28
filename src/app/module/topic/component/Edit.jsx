import { useParams } from "react-router";
import { useEffect } from "react";
import useFile from "../../file-upload/core/action";
import useCategory from "../../category/core/action";
import useTopic from "../core/action";

const Edit = () => {
  const { fetchCategory, category } = useCategory();
  const { id } = useParams();
  const { file, fetchFiles } = useFile();
  const { fetchTopicById, topicDetails, onChangeEdit, onUpdateTopic } = useTopic();

  useEffect(() => {
    fetchFiles(20000, 1);
    fetchCategory(20000, 1);
    fetchTopicById(id);
  }, [id]);

  let { name, fileMediaId, categoryId } = topicDetails;

  // console.log(topicDetails);

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
          onSubmit={(e) => onUpdateTopic(e)}
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
              onChange={onChangeEdit}
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
              value={categoryId}
              onChange={onChangeEdit}
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
              htmlFor="fileMediaId"
              className="form-label text-light text-start"
            >
              File Media <span className="text-danger">*</span>
            </label>
            <select
              className="form-select bg-dark text-light border-0"
              id="fileMediaId"
              name="fileMediaId"
              required
              value={fileMediaId}
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
              onClick={() => fetchTopicById(id)}
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
