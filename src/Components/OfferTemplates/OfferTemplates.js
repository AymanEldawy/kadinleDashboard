import React, { useState } from "react";
import InputField from "../CustomForm/InputField";
import { OfferRowView } from "./OfferRowView";
import { OfferPercentageOrAmount } from "./OfferPercentageOrAmount";

// { value: 1, label: "شحن مجاني", type: "free_shipping" },
// { value: 4, label: "خصومات سريعة (فلاش)", type: "flash" },
// { value: 6, label: "شحن سريع", type: "fast_shipping" },

// { value: 2, label: "خصم ع السلة", type: "cart_discount" },
// { value: 3, label: "خصومات الكمية", type: "bulk_discounts" },
// { value: 5, label: "خصم موسمي", type: "seasonal_discount" },
// { value: 7, label: "كوبونات خصم", type: "discount_coupons" },
// { value: 10, label: "خصم ع المبلغ", type: "amount_discount" },
// { value: 11, label: "قسائم المشتريات", type: "purchase_vouchers" },
// { value: 9, label: "خصومات الولاء", type: "loyalty_discounts" },

// { value: 8, label: "عرض القطعة الإضافية", type: "extra_item" },

// Change status
// is_flash
// is_fast_shipping
// is_free_shipping
// is_seasonal

const offer_pay_get_tier = [
  {
    name: "buy_quantity",
    type: "number",
    label: "buy quantity",
  },
  {
    name: "pay_quantity",
    type: "number",
    label: "pay quantity",
  },
];

const offer_amount_tier = [
  {
    name: "minimum_order_count",
    type: "number",
    label: "minimum order count",
  },
  {
    name: "discount_amount",
    type: "number",
    label: "discount amount",
  },
];

export const OfferTemplates = ({
  offer,
  offer_type,
  handelChangeField,
  handleChangeRow,
  data,
}) => {
  if (
    offer?.offer_type === "FREE_SHIPPING" ||
    offer?.offer_type === "FAST_SHIPPING"
  )
    return;

  return (
    <div className="flex gap-4 flex-1">
      {offer_type === "amount" && (
        <OfferPercentageOrAmount
          handelChangeField={handelChangeField}
          offer={offer}
        />
      )}
      {offer_type === "amount_tier" && (
        <OfferRowView
          fields={offer_amount_tier}
          handleChangeRow={handleChangeRow}
          data={data}
        />
      )}
      {offer_type === "pay_x_buy_y" && (
        <OfferRowView
          fields={offer_pay_get_tier}
          handleChangeRow={handleChangeRow}
          data={data}
        />
      )}
      {offer?.offer_type === "VOUCHERS" && (
        <OfferPercentageOrAmount
          containerClassName="grid-cols-2"
          handelChangeField={handelChangeField}
          offer={offer}
          extra={
            <InputField
              containerClassName="flex-1 mb-1 gap-2 !flex-row"
              labelClassName="w-[100px]"
              className="flex-1 w-full"
              value={data?.[0]?.code}
              name={"code"}
              label={"code"}
              required
              onChange={(e) => handleChangeRow("code", e.target.value, 0)}
            />
          }
        />
      )}
      {offer?.offer_type === "COUPONS" && (
        <OfferPercentageOrAmount
          handelChangeField={handelChangeField}
          offer={offer}
          extra={
            <OfferRowView
              containerClassName="order-4"
              fields={[
                {
                  name: "code",
                  type: "number",
                  label: "code",
                },
              ]}
              handleChangeRow={handleChangeRow}
              data={data}
              increasable={offer?.offer_type !== "VOUCHERS"}
            />
          }
        />
      )}
    </div>
  );
};
