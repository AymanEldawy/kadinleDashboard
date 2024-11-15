import React from "react";
import InputField from "../CustomForm/InputField";

export const OfferPercentageOrAmount = ({
  handelChangeField,
  offer,
  extra,
  containerClassName,
}) => {
  return (
    <div
      className={`grid justify-between gap-4 items-center w-full ${containerClassName || 'grid-cols-3'}`}
    >
      {extra ? extra : null}
      <InputField
        containerClassName="flex-1 mb-1 gap-2 !flex-row"
        className="flex-1 w-full"
        labelClassName="whitespace-nowrap w-[100px]"
        value={offer?.discount_value}
        name={"discount_value"}
        type={"number"}
        label={"discount value"}
        required
        onChange={(e) => handelChangeField("discount_value", e.target.value)}
      />
      <InputField
        containerClassName="flex-1 mb-1 gap-2 !flex-row justify-center"
        defaultChecked={offer?.discount_type}
        className="w-4 h-4"
        labelClassName="order-1"
        name={"discount_type"}
        type={"radio"}
        value="amount"
        label={"amount"}
        required
        onChange={(e) => handelChangeField("discount_type", e.target.value)}
      />
      <InputField
        containerClassName="flex-1 mb-1 gap-2 !flex-row justify-center"
        defaultChecked={offer?.discount_type}
        className="w-4 h-4"
        labelClassName="order-1"
        name={"discount_type"}
        type={"radio"}
        value="percentage"
        label={"percentage"}
        required
        onChange={(e) => handelChangeField("discount_type", e.target.value)}
      />
    </div>
  );
};
