import React, { useEffect } from "react";
import { FaPen } from "react-icons/fa";
import useRole from "../core/action";
import { BsPersonFillGear } from "react-icons/bs";

const Table = ({ handleDelete }) => {
  const { fetchRoles, data, navigate } = useRole();

  useEffect(() => {
    fetchRoles();
  }, []);

  //   console.log(data);

  return (
    <div className="table-responsive">
      <table className="table dashed-border-table">
        <thead>
          <tr>
            <th scope="col" className="text-start">
              Name
            </th>
            <th scope="col" className="text-start">
              Modules
            </th>
            <th scope="col" className="text-end">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map(({ name, id, module }, index) => (
              <tr key={index}>
                <td className="text-start">{name || "N/A"}</td>
                <td className="text-start">{module || "N/A"}</td>
                <td className="d-flex justify-content-end gap-2">
                  <button
                    className="action-btn"
                    onClick={() => navigate(`/role/edit/${id}`)}
                  >
                    <FaPen />
                  </button>
                  <button
                    className="action-btn"
                    onClick={() => navigate(`/role/${id}/permissions`)}
                  >
                    <BsPersonFillGear />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
