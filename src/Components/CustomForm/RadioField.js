import React from "react";

const RadioField = ({ label, error, list, name, ...field }) => {
  return (
    <div className="flex flex-col">
      {label ? (
        <label className="text-sm font-normal mb-1 capitalize">{label}</label>
      ) : null}
      <div className="flex gap-4 items-center">
        {list?.map((item) => (
          <label key={item} className="overflow-hidden text-ellipsis flex gap-1 capitalize items-center p-1 px-2 rounded-md has-checked">
            <input type="radio" name={name} value={item} {...field} />
            <span>{item}</span>
          </label>
        ))}
      </div>
      {error ? (
        <p className="bg-red-200 mt-2 rounded text-sm text-red-500 px-2 py-1">
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default RadioField;
