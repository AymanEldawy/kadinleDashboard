import React from "react";
import InputField from "../CustomForm/InputField";
import { OfferRowView } from "./OfferRowView";

const FIELDS = [
  {
    name: "start_date",
    type: "date",
    label: "start date",
  },
  {
    name: "end_date",
    type: "date",
    label: "end date",
  },
];

const FIELDS_ROW = [
  {
    name: "discount_value",
    type: "number",
    label: "discount value",
    has_icon: true
  },
  {
    name: "discount_type",
    type: "text",
    label: "discount type",
    required: true,
    list: [{ name: "amount" }, { name: "percentage" }, { name: "pay_x_buy_y" }],
  },
];

export const GeneralOfferTemplate = ({
  offer,
  handelChangeField,
  handleChangeRow,
  setData,
  data,
  onTouched,
  touched,
  errors,
  showIcon
}) => {
  console.log("🚀 ~ showIcon:", showIcon)
  return (
    <div className="grid lg:grid-cols-2 gap-2 p-4 bg-gray-100 my-4">
      <div className="grid grid-cols-2 gap-2">
        {FIELDS?.map((field) => {
          return (
            <InputField
              labelClassName="whitespace-nowrap min-w-[100px]"
              value={offer?.[field?.name]}
              name={field?.name}
              // key={offer?.offer_type + field?.name}
              type={field?.type}
              label={field?.label}
              onChange={(e) => handelChangeField(field?.name, e.target.value)}
              onFocus={() => onTouched(field?.name)}
              error={
                touched?.[field?.name] && errors?.[field?.name]
                  ? errors?.[field?.name]
                  : null
              }
              required
            />
          );
        })}
      </div>
      <OfferRowView
        fields={FIELDS_ROW}
        handleChangeRow={handleChangeRow}
        data={data}
        setData={setData}
        offer={offer}
        increasable={false}
        showIcon={showIcon}
      />
    </div>
  );
};
