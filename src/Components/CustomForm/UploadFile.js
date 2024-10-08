import React, { useEffect, useState } from "react";

import { EyeIcon, FolderPlusIcon } from "../../Helpers/Icons";
import { FullImage } from "../Global/FullImage/FullImage";
import { FullVideo } from "../Global/FullImage/FullVideo";

const UploadFile = ({
  label,
  error,
  className,
  src,
  textPlaceholder,
  containerClassName,
  boxContainerClassName,
  onShowExample,
  ...field
}) => {
  const [preview, setPreview] = useState("");
  const [videoPreview, setVideoPreview] = useState(false);

  useEffect(() => {
    if (src && typeof src === "object") {
      if (src?.type?.indexOf("video/") !== -1) {
        setVideoPreview(true);
      } else {
        setVideoPreview(false);
      }
      setPreview(URL.createObjectURL(src));
    } else {
      if (src?.indexOf(".mp4") !== -1) {
        setVideoPreview(true);
      } else {
        setVideoPreview(false);
      }
      setPreview(src);
    }
  }, [src]);

  return (
    <div
      className={`flex flex-col relative ${containerClassName}`}
      key={`${field?.index}-${field?.label}-${src}` || Math.round()}
    >
      {!!src ? (
        <>
          {typeof src === "number" ? (
            <span className="absolute flex items-center whitespace-nowrap gap-1 bg-primary-green text-black ltr:right-0 z-20 pointer-events-none rtl:left-0 -top-1 h-16 cursor-pointer border-2 rounded-md max-w-[160px] object-contain shadow py-1 px-4">
              {src} {src > 1 ? "Images" : "image"}
            </span>
          ) : (
            <>
              {videoPreview ? (
                <FullVideo
                  src={preview}
                  className="absolute ltr:right-0 rtl:left-0 -top-1 h-16 cursor-pointer border-2 rounded-md border-black w-20 object-contain shadow z-20"
                />
              ) : (
                <FullImage
                  src={preview}
                  alt="preview"
                  className="absolute ltr:right-0 rtl:left-0 -top-1 h-16 cursor-pointer border-2 rounded-md border-black w-20 object-contain shadow z-20"
                />
              )}
            </>
          )}
        </>
      ) : null}
      {label ? (
        <label
          htmlFor={label}
          className="overflow-hidden flex gap-1 items-center text-ellipsis text-sm font-normal mb-1 capitalize"
        >
          {label}
          {field?.required ? (
            <span className="text-red-500 font-semibold">*</span>
          ) : (
            ""
          )}
        </label>
      ) : null}
      <div className="relative group">
        <input
          id={label}
          type="file"
          {...field}
          min={field?.type === "number" ? "0" : ""}
          className={`border top-0 left-0 w-full h-full z-10 absolute opacity-0 rounded p-1 ${className} ${
            error ? "border-red-200 text-red-500" : ""
          }`}
        />
        <span
          className={`bg-gray-100 dark:bg-[#2c2c2c] rounded-md group-hover:bg-gray-200 group-hover:shadow min-h-[37px] cursor-pointer capitalize left-0 w-full h-full top-0 flex gap-4 items-center justify-center ${boxContainerClassName}`}
        >
          <FolderPlusIcon />
          {textPlaceholder ? textPlaceholder : "upload file"}
        </span>
      </div>
      {error ? (
        <p className="bg-red-200 mt-2 rounded text-sm text-red-500 px-2 py-1">
          {error}
        </p>
      ) : null}
      {!!onShowExample ? (
        <button
          onClick={onShowExample}
          className="text-red-500 mt-1 hover:underline w-fit flex items-center gap-2 text-xs capitalize"
        >
          <EyeIcon className="w-5 h-5" />
          show example file
        </button>
      ) : null}
    </div>
  );
};

export default UploadFile;
