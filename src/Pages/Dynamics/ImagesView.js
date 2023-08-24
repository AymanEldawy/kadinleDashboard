import React from "react";
import { useState } from "react";

import { FullImage } from "../../Components/Global/FullImage/FullImage";

export const ImagesView = ({ images }) => {
  const [imageErrors, setImageErrors] = useState({});
  return (
    <div className="flex gap-2 items-center flex-wrap">
      {images?.map((src) => (
        <FullImage
          src={src}
          height="120px"
          width="80px"
          className="!h-36 !w-32 object-cover rounded-md p-[2px] shadow-md border border-gray-300"
        />
      ))}
    </div>
  );
};
