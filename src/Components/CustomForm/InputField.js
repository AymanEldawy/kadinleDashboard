import React from "react";

const InputField = ({ label, error, labelClassName, containerClassName, className, ...field }) => {
  return (
    <div
      className={`flex flex-col ${containerClassName} ${field?.type === "checkbox" ? "" : ""} `}
      key={`${field?.index}-${field?.label}` || Math.round()}
    >
      {label ? (
        <label
          htmlFor={label}
          className={`overflow-hidden text-ellipsis flex items-center gap-1 text-sm font-normal mb-1 capitalize ${labelClassName}`}
        >
          {label}{" "}
          {field?.required ? (
            <span className="text-red-500 font-semibold">*</span>
          ) : (
            ""
          )}
        </label>
      ) : null}
      <input
        id={label}
        {...field}
        min={field?.type === "number" ? "0" : ""}
        className={`border read-only:bg-gray-200 dark:read-only:bg-[#444] rounded p-1 ${className} ${error ? "border-red-200 text-red-500" : ""
          }
          ${field?.type === "checkbox" ? "w-7 h-7" : ""}
        `}
      />
      {error ? (
        <p className="bg-red-200 mt-2 rounded text-sm text-red-500 px-2 py-1">
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default InputField;
