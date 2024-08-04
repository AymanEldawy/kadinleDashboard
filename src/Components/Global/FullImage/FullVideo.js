import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

import Modal from "../../Modal/Modal";
import { PlayIcon } from "../../../Helpers/Icons";

export const FullVideo = ({ src, ...imgProps }) => {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imageRef = useRef();

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleError = () => {
    setError(true);
  };

  useEffect(() => {
    if (!src) return;

    setError(false);
    setLoaded(false);
    imageRef?.current?.addEventListener("load", handleLoad);
    imageRef?.current?.addEventListener("error", handleError);
  }, [src]);

  return (
    <>
      {!error ? (
        <button
          onClick={() => setOpen(true)}
          className={`cursor-pointer !w-20 flex items-center justify-center bg-gray-800 border-gray-900 border rounded-lg !h-16 object-contain ${imgProps?.className}`}
        >
          <span className="bg-white p-1 rounded-full flex items-center justify-center ">
            <PlayIcon />
          </span>
        </button>
      ) : (
        <span
          className={`bg-primary-blue text-white rounded-full flex items-center justify-center !w-10 !h-10 text-xs object-contain ${imgProps?.className}`}
        >
          UnK
        </span>
      )}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        modalClassName="!p-2"
        containerClassName="max-w-[575px] z-50"
      >
        <video
          src={src}
          controls
          className="xs:w-96 min-w-[270px] w-full max-w-none max-h-[90vh] rounded-md object-cover "
        />
      </Modal>
    </>
  );
};
