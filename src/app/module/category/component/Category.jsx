import { IoAddSharp, IoSearch } from "react-icons/io5";
import Table from "./Table";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useCategory from "../core/action";

const Category = () => {
  const { category, navigate, fetchCategory } = useCategory();
  useEffect(() => {
    fetchCategory();
  }, []); // eslint-disable-line

  console.log(category);

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
              <input type="text" placeholder="Search..." />
            </div>
            <button
              onClick={() => navigate("/category/add")}
              className="add-btn"
            >
              <IoAddSharp style={{ fontSize: "20px" }} />
              <span>Add</span>
            </button>
          </div>

          <Table data={category} navigate={navigate} handleDelete={[]} />

          {/* <Pagination paging={[]} setPaging={[]} /> */}
        </div>
      </div>
    </div>
  );
};

export default Category;
