import { useParams } from "react-router";
import { useEffect } from "react";
import useFile from "../../file-upload/core/action";
import useCategory from "../core/action";

const Edit = () => {
  const { fetchCategoryById, categoryDetails, onChangeEdit, onUpdateCategory } =
    useCategory();
  const { id } = useParams();
  const { file, fetchFiles } = useFile();

  useEffect(() => {
    fetchFiles(20000, 1);
    fetchCategoryById(id);
  }, [id]);

  let { name, fileMedia } = categoryDetails;

  // console.log(categoryDetails);

  return (
    <div
      className="container text-light p-3 rounded-2"
      style={{ background: "#212225" }}
    >
      <form
        onSubmit={(e) => onUpdateCategory(e)}
        className="form-control border-0 bg-transparent text-light"
      >
        <div className="mb-3">
          <label
            htmlFor="firstname"
            className="form-label text-light text-start"
          >
            FirstName <span className="text-danger">*</span>
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
            value={fileMedia?.id}
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
  );
};

export default Edit;
