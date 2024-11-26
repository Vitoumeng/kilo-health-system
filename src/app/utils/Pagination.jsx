import { useState } from "react";
import "../../_template/css/Pagination.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = ({ paging, setPaging }) => {
  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const handlePageClickNext = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const nextPage = activePage + 1;
    setActivePage(nextPage);
    setPaging(pageSize, nextPage);
  };

  const handlePageClickPrevious = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const prevPage = activePage - 1;
    setActivePage(prevPage);
    setPaging(pageSize, prevPage);
  };

  const handleSizeChange = (event) => {
    const newSize = Number(event.target.value);
    setActivePage(1);
    setPageSize(newSize);
    setPaging(newSize, 1);
  };

  return (
    <footer className="pagination-custom d-flex justify-content-between align-items-center">
      <div className="info d-flex align-items-center gap-4">
        <select
          className="form-select form-select-sm bg-dark text-light"
          style={{ width: "70px" }}
          value={pageSize}
          onChange={handleSizeChange}
        >
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>

        <span
          className="fw-semibold text-light"
          style={{ fontSize: "14px" }}
        >
          Showing page {activePage} of {paging.totalPage}
        </span>
      </div>

      <div className="actions">
        <button onClick={handlePageClickPrevious} disabled={activePage === 1}>
          <IoIosArrowBack />
        </button>
        <button>{activePage}</button>
        <button
          onClick={handlePageClickNext}
          disabled={activePage === Math.ceil(paging.totals / paging.size)}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </footer>
  );
};

export default Pagination;
