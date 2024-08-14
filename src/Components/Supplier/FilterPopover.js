import React, { useState } from 'react'
import { FilterIcon } from '../../Helpers/Icons';

const FilterPopover = ({ STATUSES }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSelect = (status) => {
    setSelectedStatus(status);
    setIsMenuOpen(false); // إخفاء القائمة بعد اختيار عنصر
  };

  return (
    <div className="relative flex gap-2">
      <button onClick={toggleMenu} className="bg-gray-100 px-2 rounded-r-md h-10">
        <FilterIcon />
      </button>

      {isMenuOpen && (
        <ul className="absolute z-10 bg-gray-300 text-black rounded mt-10 w-48 shadow-lg">
          {STATUSES.map((status, index) => (
            <li
              key={index}
              onClick={() => handleSelect(status)}
              className="cursor-pointer p-2 hover:bg-gray-400"
            >
              {status}
            </li>
          ))}
        </ul>
      )}

      {selectedStatus && (
        <div className="mt-2 text-gray-700">Sort by: {selectedStatus}</div>
      )}
    </div>
  );
};

export default FilterPopover