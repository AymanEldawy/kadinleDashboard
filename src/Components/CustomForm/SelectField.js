import React from "react";

const SelectField = ({
  label,
  error,
  className,
  list,
  keyLabel = "name",
  keyValue = "id",
  hideText,
  ...field
}) => {
  return (
    <div className="flex flex-col">
      {label ? (
        <label className="overflow-hidden text-ellipsis text-sm font-normal mb-1 capitalize">{label}</label>
      ) : null}
      <select
        className={`border rounded p-1 ${className}  ${
          error ? "border-red-200 text-red-500" : ""
        }`}
        {...field}
      >
        {!hideText ? <option>Choose...</option> : null}
        {list?.map((item, index) => (
          <option key={item[keyValue]} className="p-1" value={item[keyValue]}>
            {item[keyLabel]}
          </option>
        ))}
      </select>
      {error ? (
        <p className="bg-red-200 mt-2 rounded text-sm text-red-500 px-2 py-1">
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default SelectField;
