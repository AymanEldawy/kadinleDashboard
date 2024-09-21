// address
const address = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date", hide_in_add_form: true },
  {
    name: "country",
    type: "uuid",
    key: "ref",
    tableName: "country",
    required: true,
  },
  { name: "city", type: "text", required: true },
  { name: "postal_code", type: "number" },
  { name: "line_one", type: "text", required: true },
  { name: "line_two", type: "text" },
];

const brand = [
  { name: "id", type: "uuid" },
  { name: "name", type: "text", required: true },
];

const chunks = [
  { name: "min_price", type: "number", required: true },
  { name: "max_price", type: "number", required: true },
  { name: "percentage", type: "number", required: true },
  { name: "available", key: "checkbox", required: false },
];

const bulk_alert = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date", hide_in_add_form: true },
  { name: "content", type: "text", required: true },
];

const category = [
  { name: "id", type: "uuid" },
  {
    name: "parent_id",
    type: "uuid",
    key: "ref",
    tableName: "category_content",
    refName: "title",
    refId: "category_id",
  },
  { name: "display_homepage", key: "checkbox" },
  { name: "numeric", type: "text" },
  { name: "banner_video", type: "text", key: "image" },
  { label: "icon", name: "image", type: "text", key: "image" },
];

const category_content = [
  { name: "id", type: "uuid" },
  { name: "title", type: "text", required: true },
  { name: "short_title", type: "text", },
  { name: "description", type: "text" },
  {
    name: "category_id",
    type: "uuid",
    key: "ref",
    tableName: "category_content",
    refName: "title",
    refId: "category_id",
    hide_in_add_form: true,
    required: true,
  },
  {
    name: "language_id",
    required: true,
    type: "uuid",
    key: "ref",
    tableName: "language",
  },
  { name: "mobile_image", type: "text", key: "image" },
  { name: "web_image", type: "text", key: "image" },
];

const chart = [
  { name: "id", type: "uuid" },
  { name: "number", type: "number" },
];

export const chart_content = [
  { name: "id", type: "uuid" },
  {
    name: "language_id",
    required: true,
    type: "uuid",
    key: "ref",
    tableName: "language",
  },
  { name: "name", type: "text" },
  { name: "column1", type: "text" },
  { name: "column2", type: "text" },
  { name: "column3", type: "text" },
  { name: "column4", type: "text" },
  { name: "column5", type: "text" },
  { name: "column6", type: "text" },
  { name: "column7", type: "text" },
  { name: "column8", type: "text" },
  {
    name: "chart_id",
    type: "uuid",
    key: "ref",
    tableName: "chart",
    refId: "id",
    hide_in_add_form: true,
    required: true,
  },
];

export const chart_data = [
  { name: "id", type: "uuid" },
  {
    name: "chart_id",
    type: "uuid",
    key: "ref",
    tableName: "chart",
    required: true,
    hide_in_add_form: true,
  },
  {
    name: "product_id",
    type: "uuid",
    key: "ref",
    tableName: "product_content",
    refId: "product_id",
    required: true,
    hide_in_add_form: true,
  },
  {
    name: "size_id",
    type: "uuid",
    key: "ref",
    tableName: "size_content",
    refId: "size_id",
    required: true,
  },
  { name: "column1", type: "number" },
  { name: "column2", type: "number" },
  { name: "column3", type: "number" },
  { name: "column4", type: "number" },
  { name: "column5", type: "number" },
  { name: "column6", type: "number" },
  { name: "column7", type: "number" },
  { name: "column8", type: "number" },
];

const collar = [{ name: "id", type: "uuid" }];
const collar_content = [
  { name: "id", type: "uuid" },
  {
    name: "collar_id",
    type: "uuid",
    key: "ref",
    tableName: "collar_content",
    refId: "collar_id",
    hide_in_add_form: true,
    required: true,
  },
  {
    name: "language_id",
    required: true,
    type: "uuid",
    key: "ref",
    tableName: "language",
  },
  { name: "name", type: "text", required: true },
];
const collection = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date" },
  { name: "collection_connect", key: "collection_connect" },
  {
    name: "category_id",
    key: "ref",
    refId: "category_id",
    tableName: "category_content",
    refName: "title",
    hide_in_add_form: true,
  },
  { name: "display_home", key: "checkbox" },
];
const collection_content = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date", hide_in_add_form: true },
  {
    name: "collection_id",
    type: "uuid",
    key: "ref",
    tableName: "collection_content",
    refId: "collection_id",
    hide_in_add_form: true,
    required: true,
  },
  {
    name: "language_id",
    required: true,
    type: "uuid",
    key: "ref",
    tableName: "language",
  },
  { name: "name", type: "text", required: true },
  { name: "description", type: "text" },
  { name: "image", type: "text", key: "image" },
];

const less_than = [
  { name: "sku", type: "number", required: true },
  { name: "price", type: "number", required: true },
];

const less_than_content = [
  {
    name: "language_id",
    required: true,
    type: "uuid",
    key: "ref",
    tableName: "language",
  },
  { name: "web_image", type: "text", key: "image", required: true },
  { name: "mobile_image", type: "text", key: "image", required: true },
];

const definitions = [
  { name: "sku", type: "text", required: true },
  { name: "url", type: "text", required: true },
];

const definitions_content = [
  {
    name: "language_id",
    required: true,
    type: "uuid",
    key: "ref",
    tableName: "language",
  },
  { name: "image", type: "text", key: "image", required: true },
];

const collection_product = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date", hide_in_add_form: true },
  {
    name: "collection_id",
    type: "uuid",
    key: "ref",
    tableName: "collection_content",
    refId: "collection_id",
    required: true,
  },
  {
    name: "product_id",
    type: "uuid",
    key: "ref",
    tableName: "product_content",
    refId: "product_id",
    required: true,
  },
];
const color = [
  { name: "id", type: "uuid" },
  { name: "color_sku", type: "number", required: true },
  { name: "hex", type: "color", required: true },
  { name: "image", type: "text", key: "image" },
  {
    name: "parent_id",
    type: "uuid",
    key: "ref",
    tableName: "color_content",
    refId: "color_id",
  },
  { name: "numeric", type: "text" },
];
const color_content = [
  { name: "id", type: "uuid" },
  {
    name: "color_id",
    type: "uuid",
    key: "ref",
    tableName: "color_content",
    refId: "color_id",
    hide_in_add_form: true,
    required: true,
  },
  {
    name: "language_id",
    required: true,
    type: "uuid",
    key: "ref",
    tableName: "language",
  },
  { name: "name", type: "text", required: true },
];
const comment = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date", hide_in_add_form: true },
  {
    name: "user_id",
    type: "uuid",
    key: "ref",
    tableName: "user",
    refName: "full_name",
    required: true,
  },
  {
    name: "product_id",
    type: "uuid",
    key: "ref",
    tableName: "product_content",
    refId: "product_id",
    required: true,
  },
  { name: "rating", type: "number" },
  { name: "content", type: "text", required: true },
];
const comment_media = [
  { name: "id", type: "uuid" },
  {
    name: "comment_id",
    type: "uuid",
    key: "ref",
    tableName: "comment",
    required: true,
  },
  { name: "url", type: "text" },
  { name: "created_at", type: "date", hide_in_add_form: true },
  { name: "views", type: "number" },
];
const country = [
  { name: "id", type: "uuid" },
  { name: "name", type: "text", required: true },
  { name: "ar_name", type: "text", required: true },
  { name: "tr_name", type: "text", required: true },
  { name: "alph-2", type: "text" },
  { name: "alph-3", type: "text" },
  { name: "code", type: "text", required: true },
  {
    name: "currency_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "currency",
  },
  {
    name: "region_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "region",
  },
];
const coupon = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date", hide_in_add_form: true },
  { name: "code", type: "text", required: true },
  { name: "value", type: "number", required: true },
  { name: "percentage", key: "checkbox" },
  { name: "expiration_date", type: "date", required: true },
  { name: "public", key: "checkbox" },
];
const credit_card = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date", hide_in_add_form: true },
  {
    name: "user_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "user",
    refName: "full_name",
  },
  { name: "number", type: "number" },
  { name: "exp_date", type: "date" },
  { name: "CCV", type: "number" },
];
const currency = [
  { name: "id", type: "uuid" },
  { name: "name", type: "text", required: true },
  { name: "code", type: "text", required: true },
  { name: "rate", type: "number" },
  { name: "exchange_percent", type: "number" },
];
const fabric = [{ name: "id", type: "uuid" }];
const fabric_content = [
  { name: "id", type: "uuid" },
  {
    name: "fabric_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "fabric_content",
    refId: "fabric_id",
    hide_in_add_form: true,
  },
  {
    name: "language_id",
    required: true,
    type: "uuid",
    key: "ref",
    tableName: "language",
  },
  { name: "name", type: "text" },
];
const feature = [{ name: "id", type: "uuid" }];
const feature_content = [
  { name: "id", type: "uuid" },
  {
    name: "feature_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "feature_content",
    refId: "feature_id",
    hide_in_add_form: true,
  },
  {
    name: "language_id",
    required: true,
    type: "uuid",
    key: "ref",
    tableName: "language",
  },
  { name: "name", type: "text" },
];
const home_reviews = [
  { name: "id", type: "uuid" },
  { name: "name", type: "text", required: true },
  { name: "rating", type: "number" },
  { name: "content", type: "text", required: true },
  { name: "image", type: "text", key: "image" },
];
const language = [
  { name: "id", type: "uuid" },
  { name: "name", type: "text", required: true },
  { name: "code", type: "text", required: true },
];
const logs = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date", hide_in_add_form: true },
  { name: "description", type: "text", required: true },
  { name: "row_id", type: "uuid" },
  { name: "table_name", type: "text" },
];


const news = [
  { name: "id", type: "uuid" },
  // { name: "created_at", type: "date" },
  { name: "link", type: "text", required: true },
];
export const news_content = [
  { name: "id", type: "uuid" },
  { name: "news_id", type: "uuid", hide_in_add_form: true },
  { name: "language_id", type: "uuid", tableName: "language", key: "ref" },
  { name: "content", type: "text" },
];

const newsletter = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date" },
  { name: "subject", type: "text", required: true },
  { name: "content", type: "text", required: true },
];
const newsletter_subscription = [
  { name: "email", type: "email", required: true },
];
const offer = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date" },
  { name: "numerical", type: "number" },
  { name: "display_home", key: "checkbox" },
  { name: "icon", type: "text", key: "image", required: true },
  { name: "is_banner", key: "checkbox" },

];
export const offer_content = [
  { name: "id", type: "uuid" },
  {
    name: "language_id",
    required: true,
    type: "uuid",
    key: "ref",
    tableName: "language",
  },
  { name: "name", type: "text", required: true },
  { name: "description", type: "text", required: true },
  { name: "media", type: "text", key: "image", required: true },
  {
    name: "offer_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "offer_content",
    refId: "offer_id",
    hide_in_add_form: true,
  },
];

const offer_product = [
  { name: "id", type: "uuid" },
  {
    name: "product_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "product_content",
    refId: "product_id",
  },
  {
    name: "offer_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "offer_content",
    refId: "offer_id",
  },
];
export const order = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date" },
  {
    name: "user_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "user",
    refName: "full_name",
    hide_in_add_form: true,
  },
  { name: "shipping_adress", type: "uuid", hide_in_add_form: true },
  { name: "price", type: "number", required: true },
  { name: "discount", type: "number" },
  // { name: "payment_status", type: "uuid" },
  {
    name: "warehouse_from",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "warehouse",
  },
  { name: "shipping_date", type: "text" },
  {
    name: "coupon_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "coupon",
    refName: "code",
    hide_in_add_form: true,
  },
  { name: "order_number", type: "number" },
  {
    name: "order_status",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "order_status_content",
    refId: "order_status_id",
    refName: "status",
  },
];

const order_content = [
  { name: "id", type: "uuid" },
  {
    name: "order_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "order_content",
    refId: "order_id",
    hide_in_add_form: true,
  },
  {
    name: "variant_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "product_variant",
    refName: "sku",
  },
  { name: "quantity", type: "number", required: true },
];
export const order_return_request = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date" },
  {
    name: "order_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "order_content",
    refId: "order_id",
  },
  {
    name: "variant_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "product_variant",
    refName: "sku",
  },
  { name: "other_reason", type: "text", required: true },
  {
    name: "reason",
    type: "text",
    key: "ref",
    tableName: "return_reason_content",
    refId: "return_reason_id",
    refName: "reason",
    required: true,
  },
  {
    name: "return_status",
    type: "uuid",
    key: "ref",
    tableName: "return_status_content",
    refId: "return_status_id",
    refName: "status",
    required: true,
  },
];

const order_status = [
  { name: "id", type: "uuid" },
  { name: "numerical", type: "number" },
];
const order_status_content = [
  { name: "id", type: "uuid" },
  {
    name: "language_id",
    required: true,
    type: "uuid",
    key: "ref",
    tableName: "language",
  },
  {
    name: "order_status_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "order_status_content",
    refName: "status",
    hide_in_add_form: true,
  },
  { name: "status", type: "text", required: true },
];
// const pattern = [{ name: "id", type: "uuid" }];
// const pattern_content = [
//   { name: "id", type: "uuid" },
//   {
//     name: "pattern_id",
//     type: "uuid",
//     key: "ref",
//     required: true,
//     tableName: "pattern_content",
//     refId: "pattern_id",
//     hide_in_add_form: true,
//   },
//   {
//     name: "language_id",
//     required: true,
//     type: "uuid",
//     key: "ref",
//     tableName: "language",
//   },
//   { name: "name", type: "text" },
// ];
const payment_status = [
  { name: "id", type: "uuid" },
  { name: "numerical", type: "number" },
];
const payment_status_content = [
  { name: "id", type: "uuid" },
  {
    name: "language_id",
    required: true,
    type: "uuid",
    key: "ref",
    tableName: "language",
  },
  {
    name: "payment_status_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "payment_status",
  },
  { name: "status", type: "text" },
];
const point_content = [
  { name: "id", type: "uuid" },
  {
    name: "language_id",
    required: true,
    type: "uuid",
    key: "ref",
    tableName: "language",
  },
  {
    name: "point_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "point",
    refName: "numeric",
    hide_in_add_form: true,
  },
  { name: "cause", type: "text", required: true },
];
const point = [
  { name: "id", type: "uuid" },
  { name: "numeric", type: "number" },
  { name: "point_count", type: "number", required: true },
];
export const product = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date", hide_in_add_form: true },
  { name: "product_sku", type: "text", required: true },
  {
    name: "category_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "category_content",
    refId: "category_id",
    refName: "title",
  },
  { name: "price", type: "number", required: true },
  { name: "tax_percent", type: "number" },
  { name: "display", key: "checkbox" },
  { name: "discount", type: "number" },
  { name: "featured", key: "checkbox" },
  { name: "views", type: "number", hide_in_add_form: true },
  { name: "barcode", type: "number", required: true },
  {
    name: "brand_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "brand",
  },
  {
    name: "origin_id",
    type: "uuid",
    key: "ref",
    // required: true,
    tableName: "country",
  },
  {
    name: "washing_instructions_id",
    type: "uuid",
    key: "ref",
    tableName: "washing_instructions_content",
    refId: "washing_instructions_id",
  },
];

export const product_content = [
  { name: "id", type: "uuid" },
  {
    name: "product_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "product_content",
    refId: "product_id",
    hide_in_add_form_add: true,
  },
  {
    name: "language_id",
    required: true,
    type: "uuid",
    key: "ref",
    tableName: "language",
  },
  { name: "name", type: "text", required: true },
  { name: "description", type: "text", required: true },
  { name: "seo_title", type: "text" },
  { name: "seo_description", type: "text" },

  { name: "image_alt", type: "text" },
];

export const product_image = [
  { name: "id", type: "uuid" },
  {
    name: "product_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "product_content",
    refId: "product_id",
    hide_in_add_form_add: true,
  },
  {
    name: "color_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "color_content",
    refId: "color_id",
  },
  { name: "image", type: "text", key: "image", required: true },
  {
    name: "size_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "size_content",
    refId: "size_id",
  },
  { name: "pattern_sku", type: "number" },
];

export const product_variant = [
  { name: "id", type: "uuid" },
  {
    name: "product_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "product_content",
    refId: "product_id",
    hide_in_add_form_add: true,
  },
  {
    name: "color_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "color_content",
    refId: "color_id",
  },
  {
    name: "size_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "size_content",
    refId: "size_id",
  },
  { name: "weight", type: "number" },
  { name: "sku", type: "text", required: true, readonly: true },
  { name: "pattern_sku", type: "number" },
];
const stock = [
  { name: "id", type: "uuid" },
  {
    name: "variant_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "product_variant",
    // hide_in_add_form: true,
    refName: "sku",
  },
  {
    name: "warehouse_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "warehouse",
  },
  { name: "stock", type: "number", required: true },
];

const region = [
  { name: "id", type: "uuid" },
  { name: "name", type: "text", required: true },
];
const return_status = [
  { name: "id", type: "uuid" },
  { name: "numerical", type: "number" },
];
const return_status_content = [
  { name: "id", type: "uuid" },
  {
    name: "language_id",
    required: true,
    type: "uuid",
    key: "ref",
    tableName: "language",
  },
  {
    name: "return_status_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "return_status_content",
    refId: "return_status_id",
    hide_in_add_form: true,
  },
  { name: "status", type: "text", required: true },
];
const sale = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date" },
  {
    name: "product_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "product_content",
    refId: "product_id",
    hide_in_add_form: true,
  },
  { name: "end_date", type: "date", required: true },
];
const season = [{ name: "id", type: "uuid" }];
const season_content = [
  { name: "id", type: "uuid" },
  {
    name: "season_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "season_content",
    refId: "season_id",
    hide_in_add_form: true,
  },
  {
    name: "language_id",
    required: true,
    type: "uuid",
    key: "ref",
    tableName: "language",
  },
  { name: "name", type: "text" },
];
const showreel = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date", hide_in_add_form: true },
  {
    name: "user_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "user",
    refName: "full_name",
  },
  {
    name: "product_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "product_content",
    refId: "product_id",
  },
  { name: "url", type: "text", required: true },
  { name: "views", type: "number" },
];
const showreel_like = [
  { name: "id", type: "uuid" },
  {
    name: "user_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "user",
    refName: "full_name",
  },
  {
    name: "showreel_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "showreel",
  },
];
export const size = [
  { name: "id", type: "uuid" },
  {
    name: "category_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "category_content",
    refId: "category_id",
    refName: "title",
  },
  { name: "size_sku", type: "text", required: true },
  { name: "numeric", type: "number" },
];

export const size_content = [
  { name: "id", type: "uuid" },
  { name: "name", type: "text", required: true },
  {
    name: "size_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "size_content",
    refId: "size_id",
    hide_in_add_form: true,
  },
  {
    name: "region_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "region",
  },
];

const sleeve = [{ name: "id", type: "uuid" }];
const sleeve_content = [
  { name: "id", type: "uuid" },
  {
    name: "sleeve_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "sleeve_content",
    refId: "sleeve_id",
    hide_in_add_form: true,
  },
  {
    name: "language_id",
    required: true,
    type: "uuid",
    key: "ref",
    tableName: "language",
  },
  { name: "name", type: "text", required: true },
];

const user = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date", hide_in_add_form: true },
  { name: "first_name", type: "text", required: true },
  { name: "last_name", type: "text" },
  { name: "email", type: "email", required: true },
  { name: "phone", type: "text" },
  { name: "profile_img", type: "text", key: "image" },
  { name: "wallet", type: "number", hide_in_add_form_add: true },
  {
    name: "country",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "country",
    hide_in_add_form_add: true,
  },
  { name: "line_one", type: "text", hide_in_add_form_add: true },
  { name: "line_two", type: "text", hide_in_add_form_add: true },
  { name: "city", type: "text", hide_in_add_form_add: true },
  { name: "postal_code", type: "number", hide_in_add_form_add: true },
  {
    name: "default_address_id",
    type: "uuid",
    key: "ref",
    tableName: "address",
    hide_in_add_form_add: true,
  },
  { name: "points", type: "number", hide_in_add_form_add: true },
];
const user_address = [
  { name: "id", type: "uuid" },
  { name: "title", type: "text" },
  {
    name: "user_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "user",
    refName: "full_name",
  },
  {
    name: "address_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "address",
  },
  { name: "created_at", type: "date" },
];
const user_alert = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date", hide_in_add_form: true },
  {
    name: "user_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "user",
    refName: "full_name",
  },
  { name: "content", type: "text", required: true },
  { name: "status", key: "checkbox" },
  { name: "url", type: "text" },
];
const user_cart = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date", hide_in_add_form: true },
  {
    name: "user_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "user",
    refName: "full_name",
  },
  {
    name: "variant_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "product_variant",
    refName: "sku",
    // refId: "product_id",
  },
  { name: "quantity", type: "number", required: true },
];
const user_invite = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date", hide_in_add_form: true },
  {
    name: "user_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "user",
    refName: "full_name",
  },
  { name: "email", type: "email", required: true },
  { name: "status", key: "checkbox" },
];
const user_like = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date", hide_in_add_form: true },
  {
    name: "user_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "user",
    refName: "full_name",
  },
  {
    name: "product_id",
    type: "uuid",
    tableName: "product_id",
    refId: "product_id",
    required: true,
  },
];
const user_point = [
  { name: "id", type: "uuid" },
  {
    name: "user_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "user",
    refName: "full_name",
  },
  { name: "point", type: "number", required: true },
  { name: "created_at", type: "date" },
  { name: "status", type: "text", required: true },
  {
    name: "point_numeric",
    type: "text",
    key: "ref",
    tableName: "point",
    refName: "numeric",
    required: true,
  },
];
const user_suggestion = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date", hide_in_add_form: true },
  {
    name: "user_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "user",
    refName: "full_name",
  },
  { name: "suggestion", type: "text", required: true, readonly: true },
  { name: "status", key: "checkbox" },
];
const user_ticket = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date", hide_in_add_form: true },
  {
    name: "user_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "user",
    refName: "full_name",
  },
  { name: "ticket", type: "text", required: true, readonly: true },
  { name: "status", key: "checkbox" },
];
const user_wallet = [
  { name: "id", type: "uuid" },
  {
    name: "user_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "user",
    refName: "full_name",
  },
  { name: "amount", type: "number", required: true },
  { name: "created_at", type: "date" },
];
const warehouse = [
  { name: "id", type: "uuid" },
  { name: "name", type: "text", required: true },
  {
    name: "address_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "address",
  },
  { name: "number", type: "text" },
];
const warehouse_availability = [
  { name: "id", type: "uuid" },
  {
    name: "warehouse_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "warehouse",
  },
  {
    name: "country_id",
    type: "uuid",
    key: "ref",
    required: true,
    tableName: "country",
  },
  {
    name: "shipping_price_id",
    key: "ref",
    required: true,
    tableName: "shipping_price",
    refName: "area",
  },
];
export const shipping_price = [
  { name: "id", type: "uuid" },
  { name: "weight", type: "string" },
  { name: "fast_price", type: "string" },
  { name: "normal_price", type: "string" },
  { name: "min_normal_duration", type: "number" },
  { name: "max_normal_duration", type: "number" },
  { name: "min_fast_duration", type: "number" },
  { name: "max_fast_duration", type: "number" },
  { name: "area", type: "number" },
];
export const partner = [
  { name: "name", type: "text" },
  { name: "image", key: "image" },
  { name: "link", type: "text" },
];

export const stock_fields = stock;

const supplier_request = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "timestamptz" },
  {
    name: "user_id",
    type: "uuid",
    key: "ref",
    tableName: "user",
    refName: "title",
  },
  { name: "company_name", type: "varchar" },
  { name: "company_type", type: "varchar" },
  { name: "tax_office", type: "varchar" },
  { name: "tax_number", type: "varchar" },
  { name: "kep_address", type: "varchar" },
  { name: "mersis_number", type: "varchar" },
  { name: "iban_number", type: "varchar" },
  { name: "billing_address", type: "varchar" },
  { name: "shipping_address", type: "varchar" },
  { name: "return_address", type: "varchar" },
  { name: "province", type: "varchar" },
  { name: "district", type: "varchar" },
  { name: "neighborhood", type: "varchar" },
  { name: "address", type: "varchar" },
  { name: "full_name", type: "varchar" },
  { name: "email_address", type: "varchar" },
  { name: "phone_number", type: "varchar" },
  { name: "main", type: "varchar" },
  { name: "finance", type: "varchar" },
  { name: "operations", type: "varchar" },
  { name: "sales", type: "varchar" },
  { name: "other", type: "varchar" },
  { name: "status", type: "checkbox" },
  { name: "ban", type: "checkbox" },
];

const home_sliders = [
  { name: "url", type: "text" },
  { name: "sku", type: "number", required: true },
];

const home_sliders_content = [
  {
    name: "language_id",
    required: true,
    type: "uuid",
    key: "ref",
    tableName: "language",
  },
  { name: "title", type: "text" },
  { name: "description", type: "text" },
  { name: "web_image", type: "text", key: "image", required: true },
  { name: "mobile_image", type: "text", key: "image", required: true },
];

const products_slider = [
  {
    name: "product_id",
    type: "uuid",
    key: "ref",
    tableName: "product_content",
    refId: "product_id",
    required: true,
    hide_in_add_form: true,
  },
  { name: "sku", type: "number", required: true },
  { name: "display_homepage", key: "checkbox" },
];

const DB_API = {
  products_slider,
  home_sliders,
  home_sliders_content,
  supplier_request,
  partner,
  stock_fields,
  address,
  brand,
  bulk_alert,
  category,
  category_content,
  chart,
  chart_content,
  chart_data,
  collection,
  collection_content,
  collection_product,
  color,
  color_content,
  comment,
  comment_media,
  country,
  coupon,
  credit_card,
  currency,
  home_reviews,
  language,
  logs,
  news,
  news_content,
  newsletter,
  newsletter_subscription,
  offer,
  offer_content,
  offer_product,
  order,
  order_content,
  order_return_request,
  order_status,
  order_status_content,
  payment_status,
  payment_status_content,
  point_content,
  point,
  product,
  product_content,
  product_image,
  product_variant,
  region,
  return_status,
  return_status_content,
  sale,
  showreel,
  showreel_like,
  size,
  size_content,
  user,
  stock,
  user_address,
  user_alert,
  user_cart,
  user_invite,
  user_like,
  user_point,
  user_suggestion,
  user_ticket,
  user_wallet,
  warehouse,
  warehouse_availability,
  shipping_price,
  less_than,
  less_than_content,
  definitions,
  definitions_content,
  chunks
};
export default DB_API;
