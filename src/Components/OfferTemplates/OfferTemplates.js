import React, { useMemo, useState } from "react";
import InputField from "../CustomForm/InputField";
import { OfferRowView } from "./OfferRowView";
import { OfferPercentageOrAmount } from "./OfferPercentageOrAmount";

const VIEW = {
  FREE_SHIPPING: "",
  FAST_SHIPPING: "",

  FLASH: "one",
  CART: "one",
  GENERAL: "one",

  SEASONAL: "grid",
  BULK: "grid",
  AMOUNT: "grid",
  COUPONS: "grid",
  VOUCHERS: "grid",
  ITEMS: "grid",
};

const getFields = (withCoupon) => {
  const fields = [
    {
      name: "discount_value",
      type: "number",
      label: "Field 2",
    },
    {
      name: "discount_type",
      type: "text",
      label: "discount type",
      list: [
        { name: "amount" },
        { name: "percentage" },
        { name: "pay_x_buy_y" },
      ],
    },
  ];
  if (withCoupon)
    fields.unshift({
      name: "code",
      type: "text",
      label: "code",
    });
  else
    fields.unshift({
      name: "minimum_order_count",
      type: "number",
      label: "Field 1",
    });

  return fields;
};

export const OfferTemplates = ({
  offer,
  handelChangeField,
  handleChangeRow,
  data,
  setData,
}) => {
  const fields = useMemo(() => {
    if (offer?.offer_type === "VOUCHERS" || offer?.offer_type === "COUPONS")
      return getFields(true);
    return getFields();
  }, [offer?.offer_type]);

  const view = VIEW?.[offer?.offer_type];
  if (!view) return;

  return (
    <div className="flex gap-4 flex-1 p-2 shadow bg-gray-100 my-8">
      <OfferRowView
        fields={fields}
        handleChangeRow={handleChangeRow}
        data={data}
        setData={setData}
        offer={offer}
        increasable={view === "grid"}
      />
    </div>
  );
};
