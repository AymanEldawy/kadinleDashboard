import React, { useState } from 'react'
import { FilterIcon } from '../../Helpers/Icons';

const FilterPopover = ({ STATUSES, selectedStatus, setSelectedStatus }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSelect = (status) => {
    setSelectedStatus(status);
    setIsMenuOpen(false);
  };

  return (
    <div className="relative flex gap-2">
      <button
        onClick={toggleMenu}
        className="bg-gray-100 px-2 rounded-r-md h-10"
      >
        <FilterIcon />
      </button>

      {isMenuOpen && (
        <ul className="absolute z-10 bg-gray-100 text-black rounded mt-10 w-48 shadow-lg">
          {STATUSES.map((status, index) => (
            <li
              key={index}
              onClick={() => handleSelect(status)}
              className="cursor-pointer p-2 hover:bg-gray-200"
            >
              {status}
            </li>
          ))}
        </ul>
      )}

      {selectedStatus && (
        <div className="mt-2 text-gray-700">Filter by: {selectedStatus}</div>
      )}
    </div>
  );
};

export default FilterPopover