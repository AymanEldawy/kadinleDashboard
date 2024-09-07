import React from "react";

const Checkbox = ({ checked, onChange, onClick }) => {
  return (
    <label className="inline-flex items-center cursor-pointer" onClick={onClick}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <span
        className={`w-4 h-4 rounded-sm flex items-center justify-center ${
          checked ? "bg-gray-500" : "bg-gray-300"
        }`}
      >
        {checked && (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        )}
      </span>
    </label>
  );
};

export default Checkbox;
