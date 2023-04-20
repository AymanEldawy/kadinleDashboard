import React from "react";

const Checkbox = ({
  label,
  name,
  value,
  checked,
  onChange,
  className,
  ...field
}) => {
  return (
    <div className={`flex items-center mr-4 ${className}`}>
      <label
        htmlFor={label}
        className="overflow-hidden text-ellipsis text-sm p-1 font-medium text-gray-900 dark:text-gray-400 flex gap-1 capitalize items-center rounded-md has-checked"
      >
        <input
          name={name}
          checked={checked}
          id={label}
          type="checkbox"
          value={value}
          className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-gray-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          {...field}
          onChange={onChange}
        />
        {label ? <span className="ml-1 rtl:mr-1 rtl:ml-0">{label}</span> : ""}
      </label>
    </div>
  );
};

export default Checkbox;
