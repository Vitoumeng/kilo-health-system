import { IoAddSharp, IoSearch } from "react-icons/io5";
import Table from "./Table";
import { useEffect } from "react";
import useFile from "../core/action";

const File = () => {
  const { file, fetchFiles, navigate, onDeleteFile } = useFile();

  useEffect(() => {
    fetchFiles();
  }, []); // eslint-disable-line

  return (
    <div className="d-flex gap-0 flex-column">
      <div className="d-flex gap-0 flex-column align-items-baseline">
        <div className="container p-3 d-flex align-items-start flex-column">
          <h4 className="mb-0">File List</h4>
          <p className="fw-medium text-secondary">
            File Upload <span className="ms-2 text-light">File List</span>
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
            <button className="add-btn">
              <IoAddSharp style={{ fontSize: "20px" }} />
              <span>Add</span>
            </button>
          </div>

          <Table data={file} navigate={navigate} handleDelete={onDeleteFile} />
        </div>
      </div>
    </div>
  );
};

export default File;
