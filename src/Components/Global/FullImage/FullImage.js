import React, { useState } from "react";
import Modal from "../../Modal/Modal";

export const FullImage = ({ src, alt, height, width, ...imgProps }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {!!src ? (
        <img
          src={src}
          alt={alt}
          onClick={() => setOpen(true)}
          className="cursor-pointer"
          {...imgProps}
        />
      ) : (
        "No image"
      )}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        modalClassName="!p-2"
        containerClassName="max-w-[575px] z-[100]"
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
