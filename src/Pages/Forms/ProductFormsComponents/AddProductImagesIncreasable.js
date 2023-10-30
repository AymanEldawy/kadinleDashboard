import React from "react";

import AddProductForm from "./AddProductForm";
import { useState } from "react";
import BlockPaper from "../../../Components/BlockPaper/BlockPaper";
import { FullImage } from "../../../Components/Global/FullImage/FullImage";
import { useAdd } from "../../../hooks/useAdd";
import { uploadProductImage } from "../../../Api/upload";
import { toast } from "react-toastify";

const AddProductImagesIncreasable = ({
  getCachedList,
  fields_image,
  productId,
}) => {
  const { addItem } = useAdd();
  const [productImagesValues, setProductImagesValues] = useState({});
  const [files, setFiles] = useState(null);
  const [filesPreviews, setFilesPreviews] = useState([]);

  const getImagesValueOnChange = (files) => {
    setFiles(files);
    const previews = Array.from(files);
    let previews_list = [];
    for (const img of previews) {
      previews_list?.push(URL.createObjectURL(img));
    }
    setFilesPreviews(previews_list);
  };
  const onSubmitProductImage = async (data) => {
    // if (!productId) {
    //   toast.error("You must add a product before upload images");
    //   return;
    // }
    if (!data?.color_id || !data?.size_id) {
      toast.error("Size & color are required fields");
      return;
    }
    for (const file of files) {
      // upload files
      const path = await uploadProductImage({
        productId,
        colorId: data?.color_id,
        file,
      });
      if (!path?.url) {
        toast.error(`Felid to upload ${file?.name}`);
      } else {
        const response = await addItem("product_image", {
          ...data,
          product_id: productId,
          image: path?.url,
        });
      }
    }
  };

  return (
    <div className="mb-8">
      <div>
        <BlockPaper containerClassName="!overflow-visible relative">
          <AddProductForm
            getCachedList={getCachedList}
            initialFields={fields_image}
            values={productImagesValues}
            setValues={setProductImagesValues}
            onSubmit={onSubmitProductImage}
            allMultiple
            getImagesValueOnChange={getImagesValueOnChange}
          />
          {filesPreviews?.length ? (
            <div className="flex flex-wrap gap-4 mt-8 bg-gray-100 p-4 border rounded-md">
              {filesPreviews?.map((img) => (
                <FullImage
                key={img?.id}
                  src={img}
                  width={120}
                  height={120}
                  className="w-32 h-32 object-contain border border-gray-300 rounded-md hover:shadow-md cursor-pointer"
                />
              ))}
            </div>
          ) : null}
        </BlockPaper>
      </div>
    </div>
  );
};

export default AddProductImagesIncreasable;
