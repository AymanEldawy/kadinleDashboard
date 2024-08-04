import React from "react";

const CheckboxField = ({ label, error, list, name, className, ...field }) => {
  return (
    <div className="flex flex-col">
      {label ? (
        <label className="overflow-hidden text-ellipsis text-sm font-normal mb-1 capitalize">
          {label}
        </label>
      ) : null}
      <div className="flex gap-4 items-center">
        <input
          id={label}
          className={`border read-only:bg-blue-100 dark:read-only:bg-[#444] rounded p-1 ${className} ${
            error ? "border-red-200 text-red-500" : ""
          }
          ${"checkbox" ? "w-7 h-7" : ""}
        `}
          type="checkbox"
          {...field}
        />
      </div>
      {error ? (
        <p className="bg-red-200 mt-2 rounded text-sm text-red-500 px-2 py-1">
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default CheckboxField;
