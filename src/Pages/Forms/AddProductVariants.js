import React from "react";

import DynamicForm from "../Dynamics/DynamicForm";
import AddProductForm from "../../Components/CustomForm/AddProductForm";
import { FormIncreasable } from "../../Components/CustomForm/FormIncreasable";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import { CloseIcon, PlusIcon } from "../../Helpers/Icons";

const AddProductVariants = ({
  getCachedList,
  fields_variant,
  productVariantValues,
  setProductVariantValues,
  increasableVariantsCount,
  fields_stock,
  setIncreasableVariantsCount,
  productWarehouseValues,
  setProductWarehouseValues,
}) => {
  const onSubmit = () => {};

  const onSubmitStock = () => {};

  const onChangeValues = (data) => {
    setProductWarehouseValues(data);
  };

  const decreaseVariants = (item) => {
    let warehouse = productWarehouseValues;
    delete warehouse[item];
    setProductWarehouseValues(warehouse);
    let variants = productVariantValues;
    delete variants[item];
    setProductVariantValues(variants);
    setIncreasableVariantsCount((prev) => prev !== item);
  };
  return (
    <div className="mb-8">
      {increasableVariantsCount?.map((item, index) => (
        <BlockPaper containerClassName="!overflow-visible relative">
          {increasableVariantsCount?.length > 1 ? (
            <button
              onClick={() => decreaseVariants(item)}
              className="absolute ltr:right-4 bg-primary-red text-white p-2 rounded-full -top-4"
            >
              <CloseIcon />
            </button>
          ) : null}
          <AddProductForm
            getCachedList={getCachedList}
            initialFields={fields_variant}
            values={productVariantValues}
            setValues={setProductVariantValues}
            onSubmit={onSubmit}
          />
          <FormIncreasable
            values={productWarehouseValues}
            setValues={setProductWarehouseValues}
            onSubmit={onSubmitStock}
            initialFields={fields_stock}
            increasableTitle="choose warehouse"
            onChangeValues={onChangeValues}
          />
        </BlockPaper>
      ))}
      <button
        onClick={() =>
          setIncreasableVariantsCount((prev) => [...prev, prev.length])
        }
        className="bg-primary-green text-black p-2 rounded-md mt-6 flex text-sm gap-2"
      >
        Add More Variant <PlusIcon />
      </button>
    </div>
  );
};

export default AddProductVariants;
