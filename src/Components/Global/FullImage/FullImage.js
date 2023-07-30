import React, { useState } from "react";

import Modal from "../../Modal/Modal";
import { useEffect } from "react";
import { useRef } from "react";

export const FullImage = ({ src, alt, height, width, ...imgProps }) => {
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
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          onClick={() => setOpen(true)}
          className="cursor-pointer !w-20 !h-16 object-contain"
          {...imgProps}
        />
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
        <img
          src={src}
          alt={alt}
          className="xs:w-96 min-w-[270px] w-full max-w-none max-h-[90vh] rounded-md object-cover "
        />
      </Modal>
    </>
  );
};
