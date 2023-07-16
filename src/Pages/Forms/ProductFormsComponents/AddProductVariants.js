import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import { uploadProductImage } from "../../../Api/upload";
import { Button } from "../../../Components/Global/Button";
import { CloseIcon, PlusIcon } from "../../../Helpers/Icons";
import { useAdd } from "../../../hooks/useAdd";
import { IncreasableBar } from "./../../../Components/Global/IncreasableBar";
import AddProductVariantsIncreasable from "./AddProductVariantsIncreasable";

const AddProductVariants = ({
  getCachedList,
  fields_variant,
  fields_stock,
  productId,
  CACHED_TABLES_SKU,
  productSku,
  setAllValues,
  allValues,
}) => {
  const [increasableVariantsCount, setIncreasableVariantsCount] = useState([0]);
  const [activeTab, setActiveTab] = useState(increasableVariantsCount[0]);
  const { addItem } = useAdd();
  const [files, setFiles] = React.useState([]);
  // values

  // submit

  // const onSubmitProductVariants = async (data) => {
  //   if (!productId) {
  //     toast.error("You must add a product before create variant");
  //     return;
  //   }
  //   const response = await addItem("product_variant", {
  //     ...data,
  //     product_id: productId,
  //   });
  //   if (response?.data) {
  //     setVariantId(response?.data?.[0].id);
  //   }
  // };

  // const onSubmitProductWarehouse = async (data) => {
  //   if (!variantId && data?.variant_id) {
  //     toast.error("You must add a variant before create warehouse");
  //     return;
  //   }
  //   const list = Object.values(data);
  //   for (const item of list) {
  //     const response = await addItem("stock", {
  //       ...item,
  //       variant_id: productId,
  //     });
  //   }
  // };

  /**
   * loop of color count
   * create variant
   * loop of stocks
   * create stocks
   */
  const onSubmitProductVariants = async (e) => {
    e.preventDefault();
    if (!productId) {
      toast.error(`You cannot add variant before adding the product`);
      return;
    }
    if (!allValues) {
      toast.error(`Please fill the required fields`);
      return;
    }
    const valuesList = Object.values(allValues);
    for (const values of valuesList) {
      const color_id = values?.color_id;
      const model_size = values?.model_size;
      if (values?.color_id && model_size) {
        const files = values?.files;
        const sizes = values?.sizes;
        const stocks = values?.stocks;
        if (values?.files) {
          for (const file of files) {
            // upload files
            const path = await uploadProductImage({
              productSku,
              colorSku: CACHED_TABLES_SKU?.color?.[color_id],
              file: file?.file,
            });

            if (!path?.url) {
              toast.error(`Felid to upload ${file?.name}`);
            } else {
              await addItem("product_image", {
                product_id: productId,
                color_id,
                size_id: model_size,
                image: path?.url,
              });
            }
          }
        } else {
          toast.error(`image is required`);
        }

        // add variant
        for (const size of Object.values(sizes)) {
          const sku = `${productSku} ${CACHED_TABLES_SKU?.size?.[size?.id]} ${
            CACHED_TABLES_SKU?.color?.[color_id]
          } ${size?.pattern}`;
          const responseVariant = await addItem("product_variant", {
            product_id: productId,
            size_id: size?.size_id,
            color_id,
            weight: size?.weight,
            sku,
          });
          const variantId = responseVariant?.data?.[0]?.id;
          if (variantId) {
            for (const stock of Object.values(stocks)) {
              await addItem("stock", {
                ...stock,
                variant_id: variantId,
              });
            }
          }
        }
      }
    }
  };

  return (
    <form className="mb-8" onSubmit={onSubmitProductVariants}>
      <IncreasableBar
        title={"Color"}
        list={increasableVariantsCount}
        setList={setIncreasableVariantsCount}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {increasableVariantsCount?.map((item, index) => {
        return (
          <div
            className={`relative z-10 ${activeTab !== item ? "hidden" : ""} `}
            kye={`${index}-index`}
          >
            <AddProductVariantsIncreasable
              getCachedList={getCachedList}
              productId={productId}
              CACHED_TABLES_SKU={CACHED_TABLES_SKU}
              productSku={productSku}
              files={files}
              setFiles={setFiles}
              itemKey={`${item}-variant`}
              allValues={allValues}
              setAllValues={setAllValues}
            />
          </div>
        );
      })}
      <Button classes="" title="Submit" />
    </form>
  );
};

export default AddProductVariants;
