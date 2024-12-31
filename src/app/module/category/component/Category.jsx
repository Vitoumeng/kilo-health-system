import { useEffect } from "react";
import useCategory from "../core/action";
import { IoAddSharp, IoSearch } from "react-icons/io5";
import Table from "./Table";
import Pagination from "../../../utils/Pagination";
import HasPermissionAction from "../../../helper/permissionHelper";

const Category = () => {
  const { category, navigate, fetchCategory, paging, onDeleteCategory } =
    useCategory();

  useEffect(() => {
    fetchCategory();
  }, []); // eslint-disable-line

  const onChangeSearch = (e) => fetchCategory(20, 1, e.target.value);

  return (
    <div className="d-flex gap-0 flex-column">
      <div className="d-flex gap-0 flex-column align-items-baseline">
        <div className="container p-3 d-flex align-items-start flex-column">
          <h4 className="mb-0">Category List</h4>
          <p className="fw-medium text-secondary">
            Category <span className="ms-2 text-light">Category List</span>
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

            <HasPermissionAction permission="Create-Category">
              <button
                className="add-btn"
                onClick={() => navigate("/category/add")}
              >
                <IoAddSharp style={{ fontSize: "20px" }} />
                <span>Add</span>
              </button>
            </HasPermissionAction>
          </div>

          <Table
            data={category}
            navigate={navigate}
            handleDelete={onDeleteCategory}
          />

          <Pagination paging={paging} setPaging={fetchCategory} />
        </div>
      </div>
    </div>
  );
};

export default Category;
