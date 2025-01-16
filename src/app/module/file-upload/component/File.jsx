import { IoAddSharp, IoSearch } from "react-icons/io5";
import Table from "./Table";
import { useEffect } from "react";
import useFile from "../core/action";
import Pagination from "../../../utils/Pagination";
import { HasPermissionAction } from "../../../helper/permissionHelper";

const File = () => {
  const { file, fetchFiles, paging, navigate, onDeleteFile } = useFile();

  useEffect(() => {
    fetchFiles();
  }, []); // eslint-disable-line

  const onChangeSearch = (e) => fetchFiles(20, 1, e.target.value);

  // console.log(file);

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
              <input
                type="text"
                placeholder="Search..."
                onChange={onChangeSearch}
              />
            </div>

            <HasPermissionAction permission="Upload-File">
              <button className="add-btn" onClick={() => navigate("/file/add")}>
                <IoAddSharp style={{ fontSize: "20px" }} />
                <span>Add</span>
              </button>
            </HasPermissionAction>
          </div>

          <Table data={file} navigate={navigate} handleDelete={onDeleteFile} />

          <Pagination paging={paging} setPaging={fetchFiles} />
        </div>
      </div>
    </div>
  );
};

export default File;
