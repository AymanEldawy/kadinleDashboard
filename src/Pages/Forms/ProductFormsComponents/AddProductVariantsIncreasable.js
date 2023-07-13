import { toast } from "react-toastify";
import BlockPaper from "../../../Components/BlockPaper/BlockPaper";
import { CloseIcon, PlusIcon } from "../../../Helpers/Icons";
import { useAdd } from "../../../hooks/useAdd";
import AddProductForm from "./AddProductForm";
import { FormProductIncreasable } from "./FormProductIncreasable";
import React from "react";
import { useState } from "react";

const AddProductVariantsIncreasable = ({
  getCachedList,
  fields_variant,
  fields_stock,
  productId,
  key,
}) => {
  const { addItem } = useAdd();
  const [variantId, setVariantId] = useState(null);
  const [productVariantValues, setProductVariantValues] = useState({});
  const [productWarehouseValues, setProductWarehouseValues] = useState({});

  const onSubmitProductVariants = async (data) => {
    if (!productId) {
      toast.error("You must add a product before create variant");
      return;
    }
    const response = await addItem("product_variant", {
      ...data,
      product_id: productId,
    });
    if (response?.data) {
      setVariantId(response?.data?.[0].id);
    }
    console.log(data, "onSubmitProductVariants", response);
  };

  const onSubmitProductWarehouse = async (data) => {
    if (!variantId && data?.variant_id) {
      toast.error("You must add a variant before create warehouse");
      return;
    }
    const list = Object.values(data);
    for (const item of list) {
      const response = await addItem("stock", {
        ...item,
        variant_id: productId,
      });
      console.log(data, "onSubmitProductWarehouse", response);
    }
  };

  return (
    <div className="mb-8" key={key}>
      <div>
        <BlockPaper containerClassName="!overflow-visible relative">
          <AddProductForm
            getCachedList={getCachedList}
            initialFields={fields_variant}
            values={productVariantValues}
            setValues={setProductVariantValues}
            onSubmit={onSubmitProductVariants}
            onChangeValues={() => {}}
          />
          <FormProductIncreasable
            values={productWarehouseValues}
            setValues={setProductWarehouseValues}
            onSubmit={onSubmitProductWarehouse}
            initialFields={fields_stock}
            increasableTitle="choose warehouse"
            // onChangeValues={onChangeValues}
            getCachedList={getCachedList}
          />
        </BlockPaper>
      </div>
    </div>
  );
};

export default AddProductVariantsIncreasable;
