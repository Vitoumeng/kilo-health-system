import { IoAddSharp, IoSearch } from "react-icons/io5";
import { useEffect } from "react";
import useTopic from "../core/action";
import Table from "./Table";
import Pagination from "../../../utils/Pagination";
import HasPermissionAction from "../../../helper/permissionHelper";

const Topic = () => {
  const { topic, paging, navigate, fetchTopic, onDeleteTopic } = useTopic();

  useEffect(() => {
    fetchTopic();
  }, []); // eslint-disable-line

  return (
    <div className="d-flex gap-0 flex-column">
      <div className="d-flex gap-0 flex-column align-items-baseline">
        <div className="container p-3 d-flex align-items-start flex-column">
          <h4 className="mb-0">Topic List</h4>
          <p className="fw-medium text-secondary">
            Topic <span className="ms-2 text-light">Topic List</span>
          </p>
        </div>

        <div
          className="container p-3 rounded-2"
          style={{ background: "#212225" }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="search-input bg-dark">
              <IoSearch className="search-icon" />
              <input type="text" placeholder="Search..." />
            </div>

            <HasPermissionAction permission="Create-Topic">
              <button
                className="add-btn"
                onClick={() => navigate("/topic/add")}
              >
                <IoAddSharp style={{ fontSize: "20px" }} />
                <span>Add</span>
              </button>
            </HasPermissionAction>
          </div>

          <Table
            data={topic}
            navigate={navigate}
            handleDelete={onDeleteTopic}
          />

          <Pagination paging={paging} setPaging={fetchTopic} />
        </div>
      </div>
    </div>
  );
};

export default Topic;
