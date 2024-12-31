import { IoAddSharp, IoSearch } from "react-icons/io5";
import usePost from "../core/action";
import { useEffect } from "react";
import Table from "./Table";
import Pagination from "../../../utils/Pagination";
import { HasPermissionAction } from "../../../helper/permissionHelper";

const Post = () => {
  const { post, fetchPost, paging, navigate, onDeletePost } = usePost();

  useEffect(() => {
    fetchPost();
  }, []); // eslint-disable-line

  const onChangeSearch = (e) => fetchPost(20, 1, e.target.value);

  return (
    <div className="d-flex gap-0 flex-column">
      <div className="d-flex gap-0 flex-column align-items-baseline">
        <div className="container p-3 d-flex align-items-start flex-column">
          <h4 className="mb-0">Post List</h4>
          <p className="fw-medium text-secondary">
            Post <span className="ms-2 text-light">Post List</span>
          </p>
        </div>

        <div
          className="container p-3 rounded-2"
          style={{ background: "#212225" }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="search-input bg-dark">
              <IoSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search..."
                onChange={onChangeSearch}
              />
            </div>

            <HasPermissionAction permission="Create-Post">
              <button className="add-btn" onClick={() => navigate("/post/add")}>
                <IoAddSharp style={{ fontSize: "20px" }} />
                <span>Add</span>
              </button>
            </HasPermissionAction>
          </div>

          <Table data={post} navigate={navigate} handleDelete={onDeletePost} />

          <Pagination paging={paging} setPaging={fetchPost} />
        </div>
      </div>
    </div>
  );
};

export default Post;
