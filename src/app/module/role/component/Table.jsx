import React from "react";

const Table = ({ data = [] }) => {
  return (
    <div className="table-responsive">
      <table className="table dashed-border-table">
        <thead>
          <tr>
            <th scope="col" className="text-start">
              Name
            </th>
            <th scope="col" className="text-start">
              Created At
            </th>
            <th scope="col" className="text-start">
              Updated At
            </th>
            <th scope="col" className="text-end">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="text-start"></td>
              <td className="text-start"></td>
              <td className="text-start"></td>
              <td className="d-flex justify-content-end gap-2">
                <button
                  className="action-btn"
                  onClick={() => navigate(`/role/edit/${item.id}`)}
                >
                  <FaPen />
                </button>
                <button
                  className="action-btn"
                  //   onClick={() => handleDelete(item.id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
