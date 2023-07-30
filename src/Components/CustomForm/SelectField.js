import React from "react";

const SelectField = ({
  label,
  error,
  className,
  list,
  keyLabel = "name",
  keyValue = "id",
  hideText,
  index,
  key,
  value,
  name,
  required,
  onChange,
  firstOptionText,
  containerClassName,
  ...field
}) => {
  return (
    <div
      className={`flex flex-col ${containerClassName}`}
      key={`${index}-${label}` || Math.round()}
    >
      {label ? (
        <label className="overflow-hidden flex gap-1 items-center text-ellipsis text-sm font-normal mb-1 capitalize">
          {label}
          {field?.required ? (
            <span className="text-red-500 font-semibold">*</span>
          ) : (
            ""
          )}
        </label>
      ) : null}
      <select
        className={`border rounded p-1 ${className}  ${
          error ? "border-red-200 text-red-500" : ""
        }`}
        onChange={onChange}
        value={value}
        name={name}
        required={required}
        // {...field}
      >
        {!hideText ? (
          <option>{firstOptionText ? firstOptionText : "Choose..."}</option>
        ) : null}
        {list?.length
          ? list?.map((item, index) => {
              return (
                <option
                  key={`${item[keyValue]}-${name}`}
                  className="p-1"
                  value={item[keyValue]}
                >
                  {keyLabel === "full_name"
                    ? item?.first_name + " " + item?.last_name
                    : item[keyLabel] || item?.id}
                </option>
              );
            })
          : null}
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
