import React, { useMemo, useState } from "react";
import { SearchIcon } from "../../Helpers/Icons";
import { set } from "react-hook-form";

const Filters = ({
  columnFilters,
  setColumnFilters,
  selectedStatus,
  data,
  setData,
  originalDataRef,
}) => {
  // const taskName =
  //   columnFilters.find((f) => f.id === selectedStatus)?.value || "";
  // const onFilterChange = (id, value) =>
  //   setColumnFilters((prev) =>
  //     prev
  //       .filter((f) => f.id !== id)
  //       .concat({
  //         id,
  //         value,
  //       })
  //   );

  const [searchTerm, setSearchTerm] = useState("");
  // const [filteredProducts, setFilteredProducts] = useState(dataFiltered);

  const onFilterChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === "") {
      setData(originalDataRef.current); 
    } else {
      const filtered = originalDataRef.current.filter((item) =>
        item.product_content.some((content) =>
          content.name.toLowerCase().includes(term)
        )
      );
      setData(filtered);
    }
  };
  console.log("data filtered: ", data);
  return (
    <div className="bg-gray-100 rounded-l-md p-2 flex items-center w-[200px] mb-3">
      <SearchIcon />
      <input
        type="text"
        className="ml-2 rounded-md focus:ring-black focus:outline-none w-full bg-gray-100 "
        placeholder="Search..."
        value={searchTerm}
        onChange={onFilterChange}
      />
    </div>
  );
};

export default Filters;
