// address
const address = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date", hide_in_add_form: true },
  { name: "country", type: "uuid", key: "ref", tableName: "country" },
  { name: "city", type: "text" },
  { name: "postal_code", type: "number" },
  { name: "line_one", type: "text" },
  { name: "line_two", type: "text" },
];

const brand = [
  { name: "id", type: "uuid" },
  { name: "name", type: "text" },
];

const bulk_alert = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date", hide_in_add_form: true },
  { name: "content", type: "text" },
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
  { name: "display_homepage", type: "checkbox" },
  { name: "numeric", type: "text" },
];

const category_content = [
  { name: "id", type: "uuid" },
  { name: "title", type: "text" },
  { name: "description", type: "text" },
  {
    name: "category_id",
    type: "uuid",
    key: "ref",
    tableName: "category_content",
    refName: "title",
    refId: "category_id",
  },
  {
    name: "language_id",
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
  { name: "language_id", type: "uuid", key: "ref", tableName: "language" },
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
  },
];

export const chart_data = [
  { name: "id", type: "uuid" },
  { name: "chart_id", type: "uuid", key: "ref", tableName: "chart" },
  {
    name: "product_id",
    type: "uuid",
    key: "ref",
    tableName: "product_content",
    refId: "product_id",
  },
  {
    name: "size_id",
    type: "uuid",
    key: "ref",
    tableName: "size_content",
    refId: "size_id",
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
  },
  { name: "language_id", type: "uuid", key: "ref", tableName: "language" },
  { name: "name", type: "text" },
];
const collection = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date", hide_in_add_form: true },
  { name: "display_home", type: "checkbox" },
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
  },
  { name: "language_id", type: "uuid", key: "ref", tableName: "language" },
  { name: "name", type: "text" },
  { name: "description", type: "text" },
  { name: "image", type: "text", key: "image" },
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
  },
  {
    name: "product_id",
    type: "uuid",
    key: "ref",
    tableName: "product_content",
    refId: "product_id",
  },
];
const color = [
  { name: "id", type: "uuid" },
  { name: "color_sku", type: "number" },
  { name: "hex", type: "color" },
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
  },
  { name: "language_id", type: "uuid", key: "ref", tableName: "language" },
  { name: "name", type: "text" },
];
const comment = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date", hide_in_add_form: true },
  { name: "user_id", type: "uuid", key: "ref", tableName: "user" },
  {
    name: "product_id",
    type: "uuid",
    key: "ref",
    tableName: "product_content",
    refId: "product_id",
  },
  { name: "rating", type: "number" },
  { name: "content", type: "text" },
];
const comment_media = [
  { name: "id", type: "uuid" },
  { name: "comment_id", type: "uuid", key: "ref", tableName: "comment" },
  { name: "url", type: "text" },
  { name: "created_at", type: "date", hide_in_add_form: true },
  { name: "views", type: "number" },
];
const country = [
  { name: "id", type: "uuid" },
  { name: "name", type: "text" },
  { name: "alph-2", type: "text" },
  { name: "alph-3", type: "text" },
  { name: "code", type: "text" },
  { name: "currency_id", type: "uuid", key: "ref", tableName: "currency" },
  { name: "region_id", type: "uuid", key: "ref", tableName: "region" },
];
const coupon = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date", hide_in_add_form: true },
  { name: "code", type: "text" },
  { name: "value", type: "number" },
  { name: "percentage", type: "checkbox" },
  { name: "expiration_date", type: "date" },
  { name: "public", type: "checkbox" },
];
const credit_card = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date", hide_in_add_form: true },
  { name: "user_id", type: "uuid", key: "ref", tableName: "user" },
  { name: "number", type: "number" },
  { name: "exp_date", type: "date" },
  { name: "CCV", type: "number" },
];
const currency = [
  { name: "id", type: "uuid" },
  { name: "name", type: "text" },
  { name: "code", type: "text" },
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
    tableName: "fabric_content",
    refId: "fabric_id",
  },
  { name: "language_id", type: "uuid", key: "ref", tableName: "language" },
  { name: "name", type: "text" },
];
const feature = [{ name: "id", type: "uuid" }];
const feature_content = [
  { name: "id", type: "uuid" },
  {
    name: "feature_id",
    type: "uuid",
    key: "ref",
    tableName: "feature_content",
    refId: "feature_id",
  },
  { name: "language_id", type: "uuid", key: "ref", tableName: "language" },
  { name: "name", type: "text" },
];
const home_reviews = [
  { name: "id", type: "uuid" },
  { name: "name", type: "text" },
  { name: "rating", type: "number" },
  { name: "content", type: "text" },
  { name: "image", type: "text", key: "image" },
];
const language = [
  { name: "id", type: "uuid" },
  { name: "name", type: "text" },
  { name: "code", type: "text" },
];
const lining = [{ name: "id", type: "uuid" }];
const lining_content = [
  { name: "id", type: "uuid" },
  {
    name: "lining_id",
    type: "uuid",
    key: "ref",
    tableName: "lining_content",
    refId: "lining_id",
  },
  { name: "language_id", type: "uuid", key: "ref", tableName: "language" },
  { name: "name", type: "text" },
];
const logs = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date", hide_in_add_form: true },
  { name: "description", type: "text" },
  { name: "row_id", type: "uuid" },
  { name: "table_name", type: "text" },
];
const material = [{ name: "id", type: "uuid" }];
const material_content = [
  { name: "id", type: "uuid" },
  {
    name: "material_id",
    type: "uuid",
    key: "ref",
    tableName: "material_content",
    refId: "material_id",
  },
  { name: "language_id", type: "uuid", key: "ref", tableName: "language" },
  { name: "name", type: "text" },
];
const news = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date", hide_in_add_form: true },
  { name: "content", type: "text" },
];
const newsletter = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date", hide_in_add_form: true },
  { name: "subject", type: "text" },
  { name: "content", type: "text" },
];
const newsletter_subscription = [{ name: "email", type: "email" }];
const offer = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date", hide_in_add_form: true },
  { name: "numerical", type: "number" },
  { name: "display_home", type: "checkbox" },
];
export const offer_content = [
  { name: "id", type: "uuid" },
  { name: "language_id", type: "uuid", key: "ref", tableName: "language" },
  { name: "name", type: "text" },
  { name: "description", type: "text" },
  { name: "media", type: "text" },
  {
    name: "offer_id",
    type: "uuid",
    key: "ref",
    tableName: "offer_content",
    refId: "offer_id",
  },
];

const offer_product = [
  { name: "id", type: "uuid" },
  {
    name: "product_id",
    type: "uuid",
    key: "ref",
    tableName: "product_content",
    refId: "product_id",
  },
  {
    name: "offer_id",
    type: "uuid",
    key: "ref",
    tableName: "offer_content",
    refId: "offer_id",
  },
];
export const order = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date" },
  { name: "user_id", type: "uuid", key: "ref", tableName: "user" },
  { name: "shipping_adress", type: "uuid" },
  { name: "price", type: "number" },
  { name: "discount", type: "number" },
  { name: "payment_status", type: "uuid" },
  { name: "warehouse_from", type: "uuid" },
  { name: "shipping_date", type: "date" },
  { name: "credit_card_id", type: "uuid" },
  { name: "coupon_id", type: "uuid", key: "ref", tableName: "coupon" },
  { name: "order_number", type: "number" },
  { name: "order_status", type: "uuid" },
];

const order_content = [
  { name: "id", type: "uuid" },
  {
    name: "order_id",
    type: "uuid",
    key: "ref",
    tableName: "order_content",
    refId: "order_id",
  },
  {
    name: "variant_id",
    type: "uuid",
    key: "ref",
    tableName: "product_variant",
    // refId: "product_id",
  },
  { name: "quantity", type: "number" },
];
export const order_return_request = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date" },
  {
    name: "order_id",
    type: "uuid",
    key: "ref",
    tableName: "order_content",
    refId: "order_id",
  },
  {
    name: "variant_id",
    type: "uuid",
    key: "ref",
    tableName: "product_variant",
    // refId: "product_id",
  },
  { name: "reason", type: "text" },
  { name: "return_status", type: "uuid" },
];

const order_status = [
  { name: "id", type: "uuid" },
  { name: "numerical", type: "number" },
];
const order_status_content = [
  { name: "id", type: "uuid" },
  { name: "language_id", type: "uuid", key: "ref", tableName: "language" },
  {
    name: "order_status_id",
    type: "uuid",
    key: "ref",
    tableName: "order_status",
  },
  { name: "status", type: "text" },
];
const pattern = [{ name: "id", type: "uuid" }];
const pattern_content = [
  { name: "id", type: "uuid" },
  {
    name: "pattern_id",
    type: "uuid",
    key: "ref",
    tableName: "pattern_content",
    refId: "pattern_id",
  },
  { name: "language_id", type: "uuid", key: "ref", tableName: "language" },
  { name: "name", type: "text" },
];
const payment_status = [
  { name: "id", type: "uuid" },
  { name: "numerical", type: "number" },
];
const payment_status_content = [
  { name: "id", type: "uuid" },
  { name: "language_id", type: "uuid", key: "ref", tableName: "language" },
  {
    name: "payment_status_id",
    type: "uuid",
    key: "ref",
    tableName: "payment_status",
  },
  { name: "status", type: "text" },
];
const point_content = [
  { name: "id", type: "uuid" },
  { name: "language_id", type: "uuid", key: "ref", tableName: "language" },
  {
    name: "point_id",
    type: "uuid",
    key: "ref",
    tableName: "point_content",
    refId: "point_id",
  },
  { name: "cause", type: "text" },
  { name: "point_count", type: "number" },
];
const point_type = [
  { name: "id", type: "uuid" },
  { name: "numeric", type: "number" },
];
export const product = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date" },
  { name: "product_sku", type: "text" },
  {
    name: "category_id",
    type: "uuid",
    key: "ref",
    tableName: "category_content",
    refId: "category_id",
    refName: "title",
  },
  { name: "price", type: "number" },
  { name: "tax_percent", type: "number" },
  { name: "display", type: "checkbox" },
  { name: "discount", type: "number" },
  { name: "featured", type: "checkbox" },
  { name: "views", type: "number", hide_in_add_form: true },
  { name: "barcode", type: "number" },
  {
    name: "fabric_id",
    type: "uuid",
    key: "ref",
    tableName: "fabric_content",
    refId: "fabric_id",
  },
  {
    name: "material_id",
    type: "uuid",
    key: "ref",
    tableName: "material_content",
    refId: "material_id",
  },
  {
    name: "lining_id",
    type: "uuid",
    key: "ref",
    tableName: "lining_content",
    refId: "lining_id",
  },
  {
    name: "collar_id",
    type: "uuid",
    key: "ref",
    tableName: "collar_content",
    refId: "collar_id",
  },
  {
    name: "sleeve_id",
    type: "uuid",
    key: "ref",
    tableName: "sleeve_content",
    refId: "sleeve_id",
  },
  {
    name: "season_id",
    type: "uuid",
    key: "ref",
    tableName: "season_content",
    refId: "season_id",
  },
  {
    name: "feature_id",
    type: "uuid",
    key: "ref",
    tableName: "feature_content",
    refId: "feature_id",
  },
  { name: "brand_id", type: "uuid", key: "ref", tableName: "brand" },
  { name: "origin_id", type: "uuid", key: "ref", tableName: "country" },
  {
    name: "pattern_id",
    type: "uuid",
    key: "ref",
    tableName: "pattern_content",
    refId: "pattern_id",
  },
];

export const product_content = [
  { name: "id", type: "uuid" },
  {
    name: "product_id",
    type: "uuid",
    key: "ref",
    tableName: "product_content",
    refId: "product_id",
  },
  { name: "language_id", type: "uuid", key: "ref", tableName: "language" },
  { name: "name", type: "text" },
  { name: "description", type: "text" },
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
    tableName: "product_content",
    refId: "product_id",
  },
  {
    name: "color_id",
    type: "uuid",
    key: "ref",
    tableName: "color_content",
    refId: "color_id",
  },
  { name: "image", type: "text", key: "image" },
  {
    name: "size_id",
    type: "uuid",
    key: "ref",
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
    tableName: "product_content",
    refId: "product_id",
  },
  {
    name: "color_id",
    type: "uuid",
    key: "ref",
    tableName: "color_content",
    refId: "color_id",
  },
  {
    name: "size_id",
    type: "uuid",
    key: "ref",
    tableName: "size_content",
    refId: "size_id",
  },
  { name: "weight", type: "number" },
  { name: "sku", type: "text" },
];

const region = [
  { name: "id", type: "uuid" },
  { name: "name", type: "text" },
];
const return_status = [
  { name: "id", type: "uuid" },
  { name: "numerical", type: "number" },
];
const return_status_content = [
  { name: "id", type: "uuid" },
  { name: "language_id", type: "uuid", key: "ref", tableName: "language" },
  {
    name: "return_status_id",
    type: "uuid",
    key: "ref",
    tableName: "return_status_content",
    refId: "return_status_id",
  },
  { name: "status", type: "text" },
];
const sale = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date", hide_in_add_form: true },
  {
    name: "product_id",
    type: "uuid",
    key: "ref",
    tableName: "product_content",
    refId: "product_id",
  },
  { name: "end_date", type: "date" },
];
const season = [{ name: "id", type: "uuid" }];
const season_content = [
  { name: "id", type: "uuid" },
  {
    name: "season_id",
    type: "uuid",
    key: "ref",
    tableName: "season_content",
    refId: "season_id",
  },
  { name: "language_id", type: "uuid", key: "ref", tableName: "language" },
  { name: "name", type: "text" },
];
const showreel = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date", hide_in_add_form: true },
  { name: "user_id", type: "uuid", key: "ref", tableName: "user" },
  {
    name: "product_id",
    type: "uuid",
    key: "ref",
    tableName: "product_content",
    refId: "product_id",
  },
  { name: "url", type: "text" },
  { name: "views", type: "number" },
];
const showreel_like = [
  { name: "id", type: "uuid" },
  { name: "user_id", type: "uuid", key: "ref", tableName: "user" },
  { name: "showreel_id", type: "uuid", key: "ref", tableName: "showreel" },
];
export const size = [
  { name: "id", type: "uuid" },
  {
    name: "category_id",
    type: "uuid",
    key: "ref",
    tableName: "category_content",
    refId: "category_id",
    refName: "title",
  },
  { name: "size_sku", type: "text" },
  { name: "numeric", type: "number" },
];

export const size_content = [
  { name: "id", type: "uuid" },
  { name: "name", type: "text" },
  {
    name: "size_id",
    type: "uuid",
    key: "ref",
    tableName: "size_content",
    refId: "size_id",
  },
  { name: "region_id", type: "uuid", key: "ref", tableName: "region" },
];

const sleeve = [{ name: "id", type: "uuid" }];
const sleeve_content = [
  { name: "id", type: "uuid" },
  {
    name: "sleeve_id",
    type: "uuid",
    key: "ref",
    tableName: "sleeve_content",
    refId: "sleeve_id",
  },
  { name: "language_id", type: "uuid", key: "ref", tableName: "language" },
  { name: "name", type: "text" },
];
const stock = [
  { name: "id", type: "uuid" },
  {
    name: "variant_id",
    type: "uuid",
    key: "ref",
    tableName: "product_variant",
    // refId: "product_id",
  },
  { name: "warehouse_id", type: "uuid", key: "ref", tableName: "warehouse" },
  { name: "stock", type: "number" },
];
const user = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date", hide_in_add_form: true },
  { name: "first_name", type: "text" },
  { name: "last_name", type: "text" },
  { name: "email", type: "email" },
  { name: "phone", type: "text" },
  { name: "profile_img", type: "text" },
  { name: "wallet", type: "number" },
  { name: "country", type: "uuid", key: "ref", tableName: "country" },
  { name: "line_one", type: "text" },
  { name: "line_two", type: "text" },
  { name: "city", type: "text" },
  { name: "postal_code", type: "number" },
  {
    name: "default_address_id",
    type: "uuid",
    key: "ref",
    tableName: "address",
  },
  { name: "points", type: "number" },
];
const user_address = [
  { name: "id", type: "uuid" },
  { name: "title", type: "text" },
  { name: "user_id", type: "uuid", key: "ref", tableName: "user" },
  { name: "address_id", type: "uuid", key: "ref", tableName: "address" },
  { name: "created_at", type: "date" },
];
const user_alert = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date", hide_in_add_form: true },
  { name: "user_id", type: "uuid", key: "ref", tableName: "user" },
  { name: "content", type: "text" },
  { name: "status", type: "checkbox" },
  { name: "url", type: "text" },
];
const user_cart = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date", hide_in_add_form: true },
  { name: "user_id", type: "uuid", key: "ref", tableName: "user" },
  {
    name: "variant_id",
    type: "uuid",
    key: "ref",
    tableName: "product_variant",
    // refId: "product_id",
  },
  { name: "quantity", type: "number" },
];
const user_invite = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date", hide_in_add_form: true },
  { name: "user_id", type: "uuid", key: "ref", tableName: "user" },
  { name: "email", type: "email" },
  { name: "status", type: "checkbox" },
];
const user_like = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date", hide_in_add_form: true },
  { name: "user_id", type: "uuid", key: "ref", tableName: "user" },
  { name: "product_id", type: "uuid" },
];
const user_point = [
  { name: "id", type: "uuid" },
  { name: "user_id", type: "uuid", key: "ref", tableName: "user" },
  { name: "point", type: "number" },
  { name: "created_at", type: "date" },
  { name: "status", type: "text" },
  { name: "cause", type: "text" },
];
const user_suggestion = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date", hide_in_add_form: true },
  { name: "user_id", type: "uuid", key: "ref", tableName: "user" },
  { name: "suggestion", type: "text" },
  { name: "status", type: "checkbox" },
];
const user_ticket = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date", hide_in_add_form: true },
  { name: "user_id", type: "uuid", key: "ref", tableName: "user" },
  { name: "ticket", type: "text" },
  { name: "status", type: "checkbox" },
];
const user_wallet = [
  { name: "id", type: "uuid" },
  { name: "user_id", type: "uuid", key: "ref", tableName: "user" },
  { name: "amount", type: "number" },
  { name: "created_at", type: "date" },
];
const warehouse = [
  { name: "id", type: "uuid" },
  { name: "name", type: "text" },
  { name: "address_id", type: "uuid", key: "ref", tableName: "address" },
  { name: "number", type: "text" },
];
const warehouse_availability = [
  { name: "id", type: "uuid" },
  { name: "warehouse_id", type: "uuid", key: "ref", tableName: "address" },
  { name: "country_id", type: "uuid", key: "ref", tableName: "country" },
  { name: "shipping_cost", type: "number" },
  { name: "fast_shipping", type: "checkbox" },
  { name: "shipping_duration_min", type: "number" },
  { name: "shipping_duration_max", type: "number" },
  { name: "min_price_free_shipping", type: "number" },
  { name: "fast_shipping_duration", type: "number" },
  { name: "fast_shipping_price", type: "number" },
];

const DB_API = {
  address,
  brand,
  bulk_alert,
  category,
  category_content,
  chart,
  chart_content,
  chart_data,
  collar,
  collar_content,
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
  fabric,
  fabric_content,
  feature,
  feature_content,
  home_reviews,
  language,
  lining,
  lining_content,
  logs,
  material,
  material_content,
  news,
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
  pattern,
  pattern_content,
  payment_status,
  payment_status_content,
  point_content,
  point_type,
  product,
  product_content,
  product_image,
  product_variant,
  region,
  return_status,
  return_status_content,
  sale,
  season,
  season_content,
  showreel,
  showreel_like,
  size,
  size_content,
  sleeve,
  sleeve_content,
  stock,
  user,
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
};
export default DB_API;
