import React, { useEffect } from "react";
import { IoAddSharp, IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router";
import Table from "./Table";

const Role = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex gap-0 flex-column align-items-baseline">
      <h4 className="mb-0">Role List</h4>
      <p className="fw-medium text-secondary">
        Role <span className="ms-2 text-dark">Role List</span>
      </p>
      <div className="container bg-body p-3 rounded-2">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="search-input">
            <IoSearch className="search-icon" />
            <input type="text" placeholder="Search..." />
          </div>
          <button onClick={() => navigate("/role/add")} className="add-btn">
            <IoAddSharp style={{ fontSize: "20px" }} />
            <span>Add</span>
          </button>
        </div>

        <Table />
      </div>
    </div>
  );
};

export default Role;
