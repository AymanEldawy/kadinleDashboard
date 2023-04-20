import React from "react";

const InputField = ({ label, error, className, ...field }) => {
  let additionalInfo = {

  }
  if (field?.type === 'number') {
    additionalInfo = {
      min: 0
    }
  }
  return (
    <div className="flex flex-col ">
      {label ? <label htmlFor={label} className="overflow-hidden text-ellipsis text-sm font-normal mb-1 capitalize">{label}</label> : null}
      <input id={label} {...field} min={field?.type === 'number' ? "0" : ''} className={`border read-only:bg-blue-100 dark:read-only:bg-[#444] rounded p-1 ${className} ${error ? 'border-red-200 text-red-500' : ''}`} />
      {error ? (
        <p className="bg-red-200 mt-2 rounded text-sm text-red-500 px-2 py-1">{error}</p>
      ) : null}
    </div>
  );
};

export default InputField;
