export const languages = {
  English: "c53d7987-f51a-4b47-9ee0-3215becdce17",
  Turkish: "c1a063e3-8f21-4526-8302-453b705ed27d",
  Arabic: "35ed73f2-5923-4d55-b48c-9c4198b63409",
};
export const regions = {
  US: "44650daa-9c58-4939-93e1-447345e74459",
  UK: "e27e38c7-954f-42e7-937b-aef1e4e9a02b",
  AR: "761b26bc-1d55-4d42-8980-43e161ebd494",
  TR: "608a4779-64dd-4d06-8500-ac6d653c57f7",
  EU: "83f4acbc-d93b-4b3d-9c78-11d1b353517a",
};

export const XML_IMPORT_STEPS = [
  { name: "Import Xml File", icon: "" },
  { name: "Mapping", icon: "" },
  { name: "Second Mapping", icon: "" },
  { name: "Report", icon: "" },
  { name: "Completed", icon: "" },
];

export const OFFER_TYPES = [
  { label: "شحن مجاني", type: "shipping", offer_type: "FREE_SHIPPING" },
  { label: "شحن سريع", type: "shipping", offer_type: "FAST_SHIPPING" },

  { label: "خصم ع السلة", type: "amount", offer_type: "CART" },
  { label: "خصومات الكمية", type: "amount", offer_type: "BULK" },
  { label: "خصم موسمي", type: "amount", offer_type: "SEASONAL" },
  { label: "خصومات سريعة (فلاش)", type: "amount", offer_type: "FLASH" },

  { label: "خصم ع المبلغ", type: "amount_tier", offer_type: "AMOUNT" },

  { label: "كوبونات خصم", type: "coupon", offer_type: "COUPONS" },
  { label: "قسائم المشتريات", type: "coupon", offer_type: "VOUCHERS" },
  // { label: "كوبونات خصم", type: "amount_tier", offer_type: "COUPONS" },

  { label: "عرض القطعة الإضافية", type: "pay_x_buy_y", offer_type: "ITEMS" },

  // { label: "خصومات الولاء", type: "amount", offer_type: "LOYALTY" },
];

export const OFFER_CHECKED_TYPES = [
  {
    name: "is_fast_shipping",
    type: "checkbox",
    label: "fast shipping",
  },
  {
    name: "is_free_shipping",
    type: "checkbox",
    label: "free shipping",
  },
  {
    name: "is_flash",
    type: "checkbox",
    label: "Flash Sale",
  },
  {
    name: "is_seasonal",
    type: "checkbox",
    label: "Seasonal",
  },
];

export const OFFER_FIELDS = [
  {
    name: "sku",
    type: "number",
    label: "sku",
  },
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
  {
    name: "hex",
    type: "color",
    label: "hex",
  },
  {
    name: "icon",
    key: "image",
    label: "icon",
  },
];

export const TABLES_NAMES = {
  amount_tier: "offer_amount_tier",
  coupon: "offer_coupons",
  pay_x_buy_y: "offer_pay_get_tier",
  VOUCHERS: "offer_coupons",
  COUPONS: "offer_coupons",
  AMOUNT: "offer_amount_tier",
  ITEMS: "offer_pay_get_tier",
};

export const XML_FIELDS = [
  { root: "" },
  { list: "" },
  { item: "" },
  { sku: "" },
  { name: "" },
  { details: "" },
  { brand: "" },
  { category: "" },
  { price: "" },
  { is_price_in_variant: true },
  { stock: "" },
  { is_stock_in_variant: true },
  { is_image_list: true },
  { image_list: "" },
  { image_list_item: "" },
  { image_fields: [] },
  { has_variants: true },
  { variant_list: "" },
  { variant_list_item: "" },
  { variant_sku: "" },
  { variant_stock_quantity: "" },
  { variant_stock_code: "" },
  { variant_price: "" },
  { is_variant_specs_list: true },
  { variant_specs_list: "" },
  { variant_color_name: "" },
  { variant_color_value: "" },
  { variant_size_name: "" },
  { variant_size_value: "" },
];
