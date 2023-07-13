import React from "react";

import { useState } from "react";
import { CloseIcon, PlusIcon } from "../../../Helpers/Icons";
import AddProductVariantsIncreasable from "./AddProductVariantsIncreasable";
import { v4 as uuidv4 } from "uuid";
const AddProductVariants = ({
  getCachedList,
  fields_variant,
  fields_stock,
  productId,
}) => {
  const [increasableVariantsCount, setIncreasableVariantsCount] = useState([
    uuidv4(),
  ]);

  const decreaseVariants = (item) => {
    console.log(
      increasableVariantsCount.filter((currentItem, index) => index !== item),
      item
    );
    setIncreasableVariantsCount(() =>
      increasableVariantsCount.filter((currentItem, index) => index !== item)
    );
  };

  console.log(increasableVariantsCount, "-");
  return (
    <div className="mb-8">
      {increasableVariantsCount?.map((item, index) => (
        <div className="relative z-10" kye={`${item}-index`}>
          {increasableVariantsCount?.length > 1 ? (
            <button
              onClick={() => decreaseVariants(index)}
              className="absolute z-10 ltr:right-4 bg-primary-red text-white p-2 rounded-full -top-4"
            >
              <CloseIcon />
            </button>
          ) : null}
          <AddProductVariantsIncreasable
            getCachedList={getCachedList}
            setIncreasableVariantsCount={setIncreasableVariantsCount}
            increasableVariantsCount={increasableVariantsCount}
            fields_variant={fields_variant}
            fields_stock={fields_stock}
            productId={productId}
            key={`${item}-form`}
          />
        </div>
      ))}

      <button
        onClick={() =>
          setIncreasableVariantsCount((prev) => [...prev, uuidv4()])
        }
        className="bg-primary-green text-black p-2 rounded-md mt-6 flex text-sm gap-2"
      >
        Add More Variant <PlusIcon />
      </button>
    </div>
  );
};

export default AddProductVariants;
