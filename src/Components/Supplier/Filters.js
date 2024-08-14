import React from "react";
import { SearchIcon } from "../../Helpers/Icons";

const Filters = ({ columnFilters, setColumnFilters }) => {
  const taskName = columnFilters.find((f) => f.id === "one")?.value || "";
 const onFilterChange = (id, value) =>
   setColumnFilters((prev) =>
     prev
       .filter((f) => f.id !== id)
       .concat({
         id,
         value,
       })
   );
  return (
    <div class="bg-gray-100 rounded-l-md p-2 flex items-center w-[200px] mb-3">
      <SearchIcon />
      <input
        type="text"
        className="ml-2 rounded-md focus:ring-black focus:outline-none w-full bg-gray-100 "
        placeholder="Search..."
        value={taskName}
        onChange={(e) => onFilterChange("one", e.target.value)}
      />
    </div>
  );
};

export default Filters;
