import React, { useState } from "react";
import Modal from "../../Modal/Modal";

export const FullImage = ({ src, alt, height, width, ...imgProps }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <img
        src={src}
        alt={alt}
        onClick={() => setOpen(true)}
        className="cursor-pointer"
        {...imgProps}
      />
      <Modal
        open={open}
        close={() => setOpen(false)}
        modalClassName="!p-2"
        containerClassName="max-w-[575px]"
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
