import React from "react";
import { useState } from "react";

const SuperDropdown = ({ labelContent, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      {open ? (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-black opacity-75"
          onClick={() => setOpen(false)}
        />
      ) : null}
      <button
        className="p-2 rounded-full hover:bg-[#0002] relative"
        onClick={() => setOpen(true)}
      >
        {labelContent}
      </button>

      {open ? (
        <ul className="absolute bg-white left-0 p-3 px-6 min-w-[200px] dark:bg-bgmaindark dark:text-gray-200 shadow rounded-md top-12 z-50 text-gray-500 text-sm flex flex-col gap-3">
          {children}
        </ul>
      ) : null}
    </div>
  );
};

export default SuperDropdown;
