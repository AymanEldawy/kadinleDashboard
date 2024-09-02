import React from "react";
import NextArrow from "../icons/NextArrow";

const Pagination = ({ pageIndex, pageCount, goToPage, setOffset }) => {
  const pageNumbers = [];
  for (let i = 1; i <= pageCount; i++) {
    pageNumbers.push(i);
  }

  const handleClick = (page) => {
    goToPage(page - 1);
    setOffset(50 * (page - 1));
  };

  const getVisiblePages = () => {
    // const visiblePages = [];
    if (pageCount <= 5) {
      return pageNumbers;
    }
    if (pageIndex < 3) {
      return pageNumbers.slice(0, 5);
    }
    if (pageIndex > pageCount - 4) {
      return pageNumbers.slice(pageCount - 5);
    }
    return pageNumbers.slice(pageIndex - 2, pageIndex + 3);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => handleClick(pageIndex)}
        disabled={pageIndex === 0}
        className="px-2 py-1"
      >
        <NextArrow className="h-5 w-5 rotate-180" />
      </button>
      {pageIndex > 2 && pageCount > 5 && (
        <>
          <button
            onClick={() => handleClick(1)}
            className={`px-2 py-1${
              pageIndex === 0 ? "bg-[#144479] text-white rounded-sm" : ""
            }`}
          >
            1
          </button>
          <span className="px-2 py-1">...</span>
        </>
      )}
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => handleClick(page)}
          className={`px-2 py-1 ${
            pageIndex + 1 === page ? "bg-[#144479] text-white rounded-sm" : ""
          }`}
        >
          {page}
        </button>
      ))}
      {pageIndex < pageCount - 3 && pageCount > 5 && (
        <>
          <span className="px-2 py-1">...</span>
          <button
            onClick={() => handleClick(pageCount)}
            className={`px-2 py-1 ${
              pageIndex + 1 === pageCount ? "bg-[#144479] text-white" : ""
            }`}
          >
            {pageCount}
          </button>
        </>
      )}
      <button
        onClick={() => handleClick(pageIndex + 2)}
        disabled={pageIndex === pageCount - 1}
        className="px-2 py-1"
      >
        <NextArrow className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Pagination;
