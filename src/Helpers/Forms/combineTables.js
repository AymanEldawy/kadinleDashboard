// address
const combine_address = [
  "id",
  "created_at",
  "country",
  "city",
  "postal_code",
  "line_one",
  "line_two",
];

const combine_brand = ["id", "name"];

const combine_bulk_alert = ["id", "created_at", "content"];

const combine_category = [
  "id",
  "parent_id",
  "display_homepage",
  "numeric",
  "title",
  "banner_video",
  "description",
  "mobile_image",
  "web_image",
];

const combine_chart = ["id", "number"];
const combine_chart_content = [
  "id",
  "number",
  "name",
  "column1",
  "column2",
  "column3",
  "column4",
  "column5",
  "column6",
  "column7",
  "column8",
];

const combine_chart_data = [
  "id",
  "chart",
  "product",
  "size",
  "column1",
  "column2",
  "column3",
  "column4",
  "column5",
  "column6",
  "column7",
  "column8",
];

// const combine_content = [
//   { name: "id", type: "uuid" },
//   { name: type: "uuid", key: "ref", tableName: "language" },
//   { name: "name", type: "text" },
// ];
const combine_collection = [
  "id",
  "created_at",
  //
  "name",
  "description",
  "image",
  // "products",
  "display_home",
];
const combine_color = [
  "id",
  "color_sku",
  "hex",
  "image",
  "parent_id",
  "numeric",

  "name",
];
const combine_comment = [
  "id",
  "created_at",
  "user",
  "product",
  "rating",
  "content",
  "url",
  "views",
];
const combine_country = [
  "id",
  "name",
  "alph-2",
  "alph-3",
  "currency",
  "rate",
  "exchange_percent",
];
const combine_coupon = [
  "id",
  "created_at",
  "code",
  "value",
  "percentage",
  "expiration_date",
  "public",
];
const combine_credit_card = [
  "id",
  "created_at",
  "user",
  "number",
  "exp_date",
  "CCV",
];
const combine_currency = ["id", "name", "code", "rate", "exchange_percent"];
const combine_home_reviews = ["id", "name", "rating", "content", "image"];
const combine_language = ["id", "name", "code"];
const combine_logs = [
  "id",
  "created_at",
  "description",
  "admin",
  "row_id",
  "table_name",
];

const combine_news = ["id", "created_at", "link", "content"];
const combine_newsletter = ["id", "created_at", "subject", "content"];
const combine_newsletter_subscription = ["email"];
const combine_offer = [
  "id",
  "created_at",
  "numerical",
  //
  "name",
  "description",
  "media",
  // "products",
  "display_home",
];

const combine_offer_product = ["id", "product", "offer"];
const combine_order = [
  "id",
  "created_at",
  "order_number",
  "price",
  "warehouse_from",
  "address",
  "shipping_date",
  "order_status",
  // "discount",
  // "coupon",
  // "numerical",
  // "variant",
  // "quantity",
  "user",
];
const combine_order_short = [
  "order_number",
  "user",
  "variant",
  "price",
  "order_status",
  "quantity",
];

const combine_order_return_request = [
  "id",
  "created_at",
  "order",
  "variant",
  "other_reason",
  "reason",
  "images",
  "return_status",
];

const combine_order_status = ["id", "numerical", "status"];
const combine_payment_status = [
  "numerical",
  "id",

  "payment_status_id",
  "status",
];
const combine_point = ["id", "numeric", "point_count", "cause", "language"];

const combine_product = [
  "id",
  "product_sku",
  "name",
  "description",
  "category",
  // "created_at",
  "price",
  "barcode",
  // "tax_percent",
  // "display",
  // "discount",
  // "featured",
  // "views",
  // "fabric",
  // "material",
  // "lining",
  // "collar",
  // "sleeve",
  // "season",
  // "feature",
  "brand",
  // "origin",
  // "pattern",
  // "product",
  //
  // "seo_title",
  // "seo_description",
  // "image_alt",
];
const combine_collection_product = [
  "id",
  "product_sku",
  "name",
  "category",
  "barcode",
  // "brand",
];

const combine_product_image = [
  "id",
  "product",
  "color",
  "image",
  "size",
  "pattern_sku",
];

const combine_product_variant = [
  "id",
  "product",
  "color",
  "size",
  "weight",
  "sku",
];

const combine_region = ["id", "name"];
const combine_return_status = ["id", "numerical", "status"];
const combine_sale = [
  "id",
  "created_at",
  // "products",
  "end_date",
];

const combine_showreel = [
  "id",
  "created_at",
  "user",
  "product",
  "url",
  "views",
];
const combine_size = [
  "id",
  "category",
  "size_sku",
  "numeric",
  "name",
  "region",
];

const combine_user = [
  "id",
  "created_at",
  "first_name",
  "last_name",
  "email",
  "title",
  "phone",
  "profile_img",
  "wallet",
  "points",
];
const combine_user_address = ["id", "created_at", "title", "address"]; //  "user",
const combine_user_alert = [
  "id",
  "created_at",
  // "user",
  "content",
  "status",
  "url",
];
const combine_user_cart = ["id", "created_at", "variant", "quantity"]; //"user",
const combine_user_invite = ["id", "created_at", "email", "status"]; //"user",
const combine_user_like = ["id", "created_at", "product"]; //"user",
const combine_user_point = [
  "id",
  // "user",
  "created_at",
  "point_numeric",
  "status",
  "cause",
];
const combine_user_suggestion = [
  "id",
  "created_at",
  // "user",
  "suggestion",
  "status",
];
const combine_user_ticket = ["id", "created_at", "ticket", "status"]; //  "user",
const combine_user_wallet = ["id", "amount", "created_at"]; //  "user",
const combine_warehouse_availability = [
  "id",
  "warehouse",
  "country",
  "shipping_price_id",
];

const combine_warehouse = ["id", "name", "address", "number"];

const combine_stock = ["id", "variant", "warehouse", "stock"];

// product features
const combine_collar = ["name"];
const combine_feature = ["name"];
const combine_lining = ["name"];
const combine_fabric = ["name"];
const combine_season = ["name"];
const combine_sleeve = ["name"];
const combine_material = ["name"];
const combine_pattern = ["name"];
export const combine_shipping_price = [
  "area",
  // 'weight',
  // 'fast_price',
  // 'normal_price',
  "min_fast_duration",
  "max_fast_duration",
  "min_normal_duration",
  "max_normal_duration",
];

export const combine_bill = [
  "id",
  "created_at",
  "user",
  "order_number",
  // "bill",
  "total",
  "shipping_cost",
];

export const combine_bill_report = [
  "id",
  "created_at",
  "user",
  "bill_id",
  "report",
];
export const combine_order_report = [
  "id",
  "created_at",
  "user",
  "order_number",
  "report",
];
const combine_suppliers = ["created_at", "pdf_source", "archive"];

const COMBINE_DB_API = {
  combine_address,
  combine_brand,
  combine_bulk_alert,
  combine_category,
  combine_chart,
  combine_chart_data,
  combine_chart_content,
  combine_suppliers,
  // combine_content,
  combine_collection,
  combine_collection_product,
  combine_color,
  combine_comment,
  combine_country,
  combine_coupon,
  combine_credit_card,
  combine_currency,
  combine_fabric,
  combine_feature,
  combine_collar,
  combine_home_reviews,
  combine_language,
  combine_lining,
  combine_logs,
  combine_material,
  combine_news,
  combine_newsletter,
  combine_newsletter_subscription,
  combine_offer,
  combine_offer_product,
  combine_order,
  combine_order_return_request,
  combine_order_status,
  combine_pattern,
  combine_payment_status,
  combine_point,
  combine_product,
  combine_product_image,
  combine_product_variant,
  combine_region,
  combine_return_status,
  combine_sale,
  combine_season,
  combine_showreel,
  combine_size,
  combine_sleeve,
  combine_user,
  combine_user_address,
  combine_user_alert,
  combine_user_cart,
  combine_user_invite,
  combine_user_like,
  combine_user_point,
  combine_user_suggestion,
  combine_user_ticket,
  combine_user_wallet,
  combine_warehouse_availability,
  combine_warehouse,
  combine_stock,
  combine_order_short,
  combine_shipping_price,
  combine_bill,
  combine_bill_report,
  combine_order_report,
};
export default COMBINE_DB_API;
