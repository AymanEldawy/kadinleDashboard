import React, { useState } from "react";
import { XmlImageListIncreasable } from "./XmlImageListIncreasable";
import InputField from "../CustomForm/InputField";
import SelectField from "../CustomForm/SelectField";
import { OfferRowView } from "../OfferTemplates/OfferRowView";
import { XmlSectionWrapper } from "./XmlSectionWrapper";

const PRODUCT_FIELDS = [
  { name: "root", key: "select" },
  { name: "list", key: "select" },
  { name: "item", key: "select" },
  { name: "sku", key: "select" },
  { name: "name", key: "select" },
  { name: "details", key: "select" },
  { name: "brand", key: "select" },
  { name: "category", key: "select" },
  { name: "price", key: "select" },
  { name: "stock", key: "select" },
  { name: "is_price_in_variant", type: "checkbox" },
  { name: "is_stock_in_variant", type: "checkbox" },
];

const VARIANT_FIELDS = [
  // { name: "has_variants", type: "checkbox" },
  { name: "variant_list", key: "select" },
  { name: "variant_list_item", key: "select" },
  { name: "variant_sku", key: "select" },
  { name: "variant_stock_quantity", key: "select" },
  { name: "variant_stock_code", key: "select" },
  { name: "variant_price", key: "select" },
  { name: "is_variant_specs_list", type: "checkbox" },
  { name: "variant_specs_list", key: "select" },
  { name: "variant_color_name", key: "select" },
  { name: "variant_color_value", key: "select" },
  { name: "variant_size_name", key: "select" },
  { name: "variant_size_value", key: "select" },
];

const IMAGES_FIELDS = [
  { name: "image_list", key: "select" },
  { name: "image_list_item", key: "select" },
];

const displayFields = ({ fields, handelChangeField, list, template }) => {
  return (
    <div className="grid grid-cols-2 gap-x-20 gap-2">
      {fields?.map((field) => {
        if (field?.type === "checkbox") {
          return (
            <InputField
              containerClassName="!flex-row gap-12"
              labelClassName="w-[130px] font-medium"
              value={template?.[field?.name]}
              name={field?.name}
              type={field?.type}
              label={field?.name}
              required={field?.required}
              onChange={(e) => handelChangeField(field?.name, e.target.value)}
            />
          );
        } else {
          return (
            <SelectField
              key={field?.name}
              containerClassName="!flex-row gap-12"
              labelClassName="w-[180px] font-medium"
              value={template?.[field?.name]}
              list={list}
              name={field?.name}
              type={field?.type}
              label={field?.name}
              keyLabel="label"
              keyValue="value"
              onChange={(option) => {
                handelChangeField(field?.name, option?.value);
              }}
            />
          );
        }
      })}
    </div>
  );
};

export const XmlMapFields = ({ fileFields, template, setTemplate }) => {
  const [images, setImages] = useState({
    1: {},
  });

  const handelChangeField = (name, value) => {
    setTemplate((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleChangeRow = (name, value, index) => {
    setImages((prev) => {
      return {
        ...prev,
        [index]: {
          ...prev?.[index],
          [name]: value,
        },
      };
    });
  };

  return (
    <div className="flex flex-col gap-8">
      {/* product */}
      <XmlSectionWrapper title={"Product Fields"}>
        {displayFields({
          fields: PRODUCT_FIELDS,
          list: fileFields,
          handelChangeField,
          template,
        })}
      </XmlSectionWrapper>
      <XmlSectionWrapper
        title={"Variants Fields"}
        bodyClassName={"flex justify-between"}
        extraContent={
          <InputField
            containerClassName="!flex-row gap-2"
            labelClassName="font-medium"
            checked={template?.has_variants}
            name="has_variants"
            type="checkbox"
            label="has_variants"
            onChange={(e) =>
              handelChangeField("has_variants", e.target.checked)
            }
          />
        }
      >
        {template?.has_variants
          ? displayFields({
              fields: VARIANT_FIELDS,
              list: fileFields,
              handelChangeField,
              template,
            })
          : null}
      </XmlSectionWrapper>

      <XmlSectionWrapper
        title={"Images Fields"}
        bodyClassName="flex justify-between"
        extraContent={
          <InputField
            containerClassName="!flex-row gap-2"
            labelClassName="font-medium"
            checked={template?.is_image_list}
            name="is_image_list"
            type="checkbox"
            label="is_image_list"
            onChange={(e) =>
              handelChangeField("is_image_list", e.target.checked)
            }
          />
        }
      >
        {template?.is_image_list ? (
          displayFields({
            fields: IMAGES_FIELDS,
            list: fileFields,
            handelChangeField,
            template,
          })
        ) : (
          <OfferRowView
            data={images}
            handleChangeRow={handleChangeRow}
            setData={setImages}
            fields={[
              {
                name: "image1",
                label: "images",
              },
            ]}
          />
        )}
      </XmlSectionWrapper>
    </div>
  );
};
