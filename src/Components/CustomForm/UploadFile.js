import React, { useEffect, useState } from "react";

import { FullImage } from "../Global/FullImage/FullImage";

const UploadFile = ({ label, error, className, src, ...field }) => {
  const [preview, setPreview] = useState("");
  let additionalInfo = {};
  if (field?.type === "number") {
    additionalInfo = {
      min: 0,
    };
  }
  useEffect(() => {
    setPreview(src ? src : "");
  }, [src]);
  return (
    <div
      className={`flex flex-col relative ${
        field?.type === "checkbox" ? "" : ""
      } `}
    >
      {!!src ? (
        <FullImage
          src={preview}
          alt="preview"
          className="absolute ltr:right-0 rtl:left-0 top-0 h-16 cursor-pointer border-2 rounded-md border-black w-20 object-contain shadow"
        />
      ) : null}
      {label ? (
        <label
          htmlFor={label}
          className="overflow-hidden text-ellipsis text-sm font-normal mb-1 capitalize"
        >
          {label}
        </label>
      ) : null}
      <input
        id={label}
        type="file"
        {...field}
        min={field?.type === "number" ? "0" : ""}
        className={`border read-only:bg-blue-100 dark:read-only:bg-[#444] rounded p-1 ${className} ${
          error ? "border-red-200 text-red-500" : ""
        }`}
      />
      {error ? (
        <p className="bg-red-200 mt-2 rounded text-sm text-red-500 px-2 py-1">
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default UploadFile;
