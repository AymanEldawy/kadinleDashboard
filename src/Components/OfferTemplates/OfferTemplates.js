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

export const OfferTemplates = ({
  offer,
  handelChangeField,
  handleChangeRow,
  data,
  setData,
}) => {
  const fields = useMemo(() => {
    const default_fields = [
      {
        name: "minimum_order_count",
        type: "number",
        label: "Product Amount",
        required: true,
        has_icon: true,
      },
      {
        name: "discount_value",
        type: "number",
        label: "Discount Amount",
        has_icon: true,
        required: true,
      },
      {
        name: "discount_type",
        type: "text",
        label: "discount type",
        required: true,
        list: [{ name: "amount" }, { name: "percentage" }],
      },
    ];

    if (offer?.offer_type === "ITEMS") {
      default_fields.at(1).required = true;
      default_fields.at(0).label = "Number of pieces purchased";
      default_fields.at(1).label = "Number of pieces acquired";
      default_fields.at(2).list = [{ name: "pay_x_buy_y" }];
    }
    if (offer?.offer_type === "BULK") {
      default_fields.at(1).required = true;
      default_fields.at(0).label = "Number of pieces purchased";
    }

    if (offer?.offer_type === "FLASH" || offer?.offer_type === "CART") {
      default_fields.splice(0, 1);
      default_fields.unshift({
        name: "category_hex",
        type: "color",
        label: "category color",
        required: true,
      })
    }
    if (offer?.offer_type === "VOUCHERS") {
      default_fields.at(1).required = true;
      default_fields.at(0).label = "Purchase value";
      default_fields.unshift({
        name: "code",
        type: "text",
        label: "code",
        required: true,
      });
    }

    return default_fields;
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
