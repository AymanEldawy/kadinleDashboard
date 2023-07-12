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
  "description",
  "mobile_image",
  "web_image",
  "language",
];

const combine_chart = [
  "id",
  "number",
  "language",
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
//   { name: "language", type: "uuid", key: "ref", tableName: "language" },
//   { name: "name", type: "text" },
// ];
const combine_collection = [
  "id",
  "created_at",
  "display_home",
  "language",
  "name",
  "description",
  "image",
];
const combine_collection_product = [
  "id",
  "created_at",
  "collection",
  "product",
];
const combine_color = [
  "id",
  "color_sku",
  "hex",
  "image",
  "parent_id",
  "numeric",
  "language",
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
  // "region",
  // "code",
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
  "row_id",
  "table_name",
];

const combine_news = ["id", "created_at", "content"];
const combine_newsletter = ["id", "created_at", "subject", "content"];
const combine_newsletter_subscription = ["email"];
const combine_offer = [
  "id",
  "created_at",
  "numerical",
  "display_home",
  "language",
  "name",
  "description",
  "media",
];

const combine_offer_product = ["id", "product", "offer"];
const combine_order = [
  "id",
  "created_at",
  "order_number",
  "address",
  "price",
  "discount",
  "warehouse_from",
  "shipping_date",
  "coupon",
  "numerical",
  "order_status",
  "variant",
  "quantity",
  // "payment_status",
  "user",
];

const combine_order_return_request = [
  "id",
  "created_at",
  "order",
  "variant",
  "reason",
  "return_status",
];

const combine_order_status = [
  "numerical",
  "id",
  "language",
  "order_status_id",
  "status",
];
const combine_payment_status = [
  "numerical",
  "id",
  "language",
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
  "created_at",
  "price",
  "barcode",
  "tax_percent",
  "display",
  "discount",
  "featured",
  "views",
  "fabric",
  "material",
  "lining",
  "collar",
  "sleeve",
  "season",
  "feature",
  "brand",
  // "origin",
  "pattern",
  // "product",
  "language",
  "seo_title",
  "seo_description",
  "image_alt",
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
const combine_return_status = [
  "id",
  "numerical",
  "language",
  "return_status",
  "status",
];
const combine_sale = ["id", "created_at", "product", "end_date"];

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
  "phone",
  "profile_img",
  "wallet",
  "country",
  "line_one",
  "line_two",
  "city",
  "postal_code",
  // "default_address_id",
  "points",
];
const combine_user_address = ["id", "title", "user", "address", "created_at"];
const combine_user_alert = [
  "id",
  "created_at",
  "user",
  "content",
  "status",
  "url",
];
const combine_user_cart = ["id", "created_at", "user", "variant", "quantity"];
const combine_user_invite = ["id", "created_at", "user", "email", "status"];
const combine_user_like = ["id", "created_at", "user", "product"];
const combine_user_point = [
  "id",
  "user",
  "point",
  "created_at",
  "status",
  "cause",
];
const combine_user_suggestion = [
  "id",
  "created_at",
  "user",
  "suggestion",
  "status",
];
const combine_user_ticket = ["id", "created_at", "user", "ticket", "status"];
const combine_user_wallet = ["id", "user", "amount", "created_at"];
const combine_warehouse = [
  "id",
  "name",
  "address",
  "number",
  "country",
  "shipping_cost",
  "fast_shipping",
  "shipping_duration_min",
  "shipping_duration_max",
  "min_price_free_shipping",
  "fast_shipping_duration",
  "fast_shipping_price",
  "stock",
];

// product features
const combine_collar = ["collar_id", "language", "name"];
const combine_feature = ["feature_id", "language", "name"];
const combine_lining = ["lining_id", "language", "name"];
const combine_fabric = ["fabric_id", "language", "name"];
const combine_season = ["season_id", "language", "name"];
const combine_sleeve = ["sleeve_id", "language", "name"];
const combine_material = ["material_id", "language", "name"];
const combine_pattern = ["pattern_id", "language", "name"];

const COMBINE_DB_API = {
  combine_address,
  combine_brand,
  combine_bulk_alert,
  combine_category,
  combine_chart,
  combine_chart_data,
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
  combine_warehouse,
};
export default COMBINE_DB_API;
