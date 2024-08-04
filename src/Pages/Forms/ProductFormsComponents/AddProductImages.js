import React from "react";
import { useState } from "react";

import { CloseIcon, PlusIcon } from "../../../Helpers/Icons";
import AddProductImagesIncreasable from "./AddProductImagesIncreasable";
import { v4 as uuidv4 } from "uuid";

const AddProductImages = ({ getCachedList, fields_image, productId }) => {
  const [increasableImagesCount, setIncreasableImagesCount] = useState([
    uuidv4(),
  ]);
  const decreaseVariants = (item) => {
    setIncreasableImagesCount((prev) => prev.filter((i) => i !== item));
  };

  return (
    <div className="mb-8">
      {increasableImagesCount?.map((item, index) => (
        <div className="relative z-10" kye={item}>
          {increasableImagesCount?.length > 1 ? (
            <button
              onClick={() => decreaseVariants(item)}
              className="absolute z-10 ltr:right-4 bg-primary-red text-white p-2 rounded-full -top-4"
            >
              <CloseIcon />
            </button>
          ) : null}
          <AddProductImagesIncreasable
            getCachedList={getCachedList}
            fields_image={fields_image}
            increasableImagesCount={increasableImagesCount}
            setIncreasableImagesCount={setIncreasableImagesCount}
            productId={productId}
          />
        </div>
      ))}
      <button
        onClick={() => setIncreasableImagesCount((prev) => [...prev, uuidv4()])}
        className="bg-primary-green text-black p-2 rounded-md mt-6 flex text-sm gap-2"
      >
        Add More Images <PlusIcon />
      </button>
    </div>
  );
};

export default AddProductImages;
