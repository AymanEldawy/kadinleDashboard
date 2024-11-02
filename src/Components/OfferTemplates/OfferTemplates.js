import React from "react";
import InputField from "../CustomForm/InputField";

// { value: 1, label: "شحن مجاني", type: "free_shipping" },
// { value: 2, label: "خصم ع السلة", type: "cart_discount" },
// { value: 3, label: "خصومات الكمية", type: "bulk_discounts" },
// { value: 4, label: "خصومات سريعة (فلاش)", type: "flash_discounts" },
// { value: 5, label: "خصم موسمي", type: "seasonal_discount" },
// { value: 6, label: "شحن سريع", type: "fast_shipping" },
// { value: 7, label: "كوبونات خصم", type: "discount_coupons" },
// { value: 8, label: "عرض القطعة الإضافية", type: "extra_item" },
// { value: 9, label: "خصومات الولاء", type: "loyalty_discounts" },
// { value: 10, label: "خصم ع المبلغ", type: "amount_discount" },
// { value: 11, label: "قسائم المشتريات", type: "purchase_vouchers" },

const fields = [
  { name: "code", type: "number", label: "code", role: [7, 11] },
  {
    name: "discount_price",
    type: "number",
    label: "discount amount",
    role: [3, 5, 7, 10, 11],
  },

  {
    name: "buy_n_pay_m_n",
    type: "number",
    label: "Number of items to buy",
    role: [3, 8],
  },
  {
    name: "buy_n_pay_m_m",
    type: "number",
    label: "Number of items to pay for",
    role: [3, 8],
  },
  {
    name: "max_discount_amount",
    type: "number",
    label: "max discount amount",
    role: [7, 10],
  },
  {
    name: "percentage",
    type: "checkbox",
    label: "percentage",
    role: [3, 5, 7],
  },
];

export const OfferTemplates = ({ offer, handelChangeField }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {fields?.map((field) => {
        if (field?.role?.includes(offer?.offer_type))
          return (
            <InputField
              containerClassName="flex-1"
              value={offer?.[field?.name]}
              name={field?.name}
              type={field?.type}
              label={field?.label}
              onChange={(e) =>
                handelChangeField(
                  field?.name,
                  field?.type === "checkbox" ? e.target.checked : e.target.value
                )
              }
            />
          );
      })}
    </div>
  );
};
