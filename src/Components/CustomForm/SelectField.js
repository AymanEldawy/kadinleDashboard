import React from "react";
import Select from "react-select";

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
  labelClassName,
  ...field
}) => {
  const uniqueObjectsSet = new Set();

  // Filter the array and only keep objects with unique 'id' values
  const uniqueList = list?.filter((obj) => {
    const isUnique = !uniqueObjectsSet.has(obj?.[keyLabel]);
    if (isUnique) {
      uniqueObjectsSet.add(obj?.[keyLabel]);
    }
    return isUnique;
  });

console.log(value, '---v');

  
  return (
    <div
      className={`flex flex-col ${containerClassName}`}
      key={`${index}-${label}` || Math.round()}
    >
      {" "}
      {label ? (
        <label
          htmlFor={label}
          className={`overflow-hidden text-ellipsis flex items-center gap-1 text-sm font-normal mb-1 capitalize ${labelClassName}`}
        >
          {label}{" "}
          {field?.required || required ? (
            <span className="text-red-500 font-semibold">*</span>
          ) : (
            ""
          )}
        </label>
      ) : null}
      <Select
        menuPlacement="auto"
        menuPortalTarget={document?.body}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        getOptionLabel={(option) => {
          console.log(option, keyLabel);

          return keyLabel === "full_name"
            ? option?.first_name + " " + option?.last_name
            : option[keyLabel] || option?.id;
        }}
        getOptionValue={(option) => option[keyValue]}
        // components={{ Option: ({ innerProps }) => <option></option> }}
        options={uniqueList}
        required={required}
        onChange={onChange}
        value={value}
      />
      {error ? (
        <p className="bg-red-200 mt-2 rounded text-sm text-red-500 px-2 py-1">
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default SelectField;
