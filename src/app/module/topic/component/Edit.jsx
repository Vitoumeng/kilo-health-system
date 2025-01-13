import { useParams } from "react-router";
import { useEffect, useState } from "react";
import useTopic from "../core/action";

const Edit = () => {
  const { id } = useParams();
  const { fetchTopicById, topicDetails, handleChangeEdit, onUpdateTopic } =
    useTopic();
  const [payload, setPayload] = useState({
    name: "",
  });

  useEffect(() => {
    fetchTopicById(id);
  }, [id]); // eslint-disable-line

  useEffect(() => {
    if (topicDetails) {
      setPayload(topicDetails);
    }
  }, [topicDetails]); // eslint-disable-line

  let { name } = payload;

  // console.log(payload);

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
          onSubmit={(e) => onUpdateTopic(e, payload)}
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
