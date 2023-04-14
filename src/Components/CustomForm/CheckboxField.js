import React from "react";
import Checkbox from "./Checkbox";

const CheckboxField = ({ label, error, list, name, ...field }) => {
  return (
    <div className="flex flex-col">
      {label ? (
        <label className="overflow-hidden text-ellipsis text-sm font-normal mb-1 capitalize">{label}</label>
      ) : null}
      <div className="flex gap-4 items-center">
        {list?.map((item) => (
          <Checkbox key={item} name={name} value={item} {...field} label={item} />
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

export default CheckboxField;
