// address
const address = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date" },
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
  { name: "created_at", type: "date" },
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
  },
  {
    name: "language_id",
    type: "uuid",
    key: "ref",
    tableName: "language",
    refName: "",
  },
  { name: "mobile_image", type: "text" },
  { name: "web_image", type: "text" },
];

const chart = [
  { name: "id", type: "uuid" },
  { name: "number", type: "number" },
];
const chart_content = [
  { name: "id", type: "uuid" },
  {
    name: "language_id",
    type: "uuid",

    key: "ref",
    tableName: "language",
  },
  { name: "name", type: "text" },
  { name: "column1", type: "text" },
];
const chart_data = [
  { name: "id", type: "uuid" },
  { name: "chart_id", type: "uuid" },
  {
    name: "product_id",
    type: "uuid",
    key: "ref",
    tableName: "product_content",
  },
  { name: "size_id", type: "uuid", key: "ref", tableName: "size_content" },
  { name: "column1", type: "float8" },
];
const collar = [{ name: "id", type: "uuid" }];
const collar_content = [
  { name: "id", type: "uuid" },
  { name: "collar_id", type: "uuid", key: "ref", tableName: "collar" },
  { name: "language_id", type: "uuid", key: "ref", tableName: "language" },
  { name: "name", type: "text" },
];

const collection = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date" },
  { name: "display_home", type: "checkbox" },
];
const collection_content = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date" },
  {
    name: "collection_id",
    type: "uuid",
    key: "ref",
    tableName: "collection",
    refName: "id",
  },
  { name: "language_id", type: "uuid", key: "ref", tableName: "language" },
  { name: "name", type: "text" },
];
const collection_product = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date" },
  {
    name: "collection_id",
    type: "uuid",
    key: "ref",
    tableName: "collection_content",
  },
  {
    name: "product_id",
    type: "uuid",
    key: "ref",
    tableName: "product_content",
  },
];
const color = [
  { name: "id", type: "uuid" },
  { name: "color_sku", type: "number" },
  { name: "hex", type: "color" },
  { name: "image", type: "text" },
  { name: "parent_id", type: "uuid", key: "ref", tableName: "color_content" },
];
const color_content = [
  { name: "id", type: "uuid" },
  { name: "color_id", type: "uuid", key: "ref", tableName: "color_content" },
  { name: "language_id", type: "uuid", key: "ref", tableName: "language" },
  { name: "name", type: "text" },
];
const comment = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date" },
  { name: "user_id", type: "uuid", key: "ref", tableName: "user" },
  {
    name: "product_id",
    type: "uuid",
    key: "ref",
    tableName: "product_content",
  },
  { name: "rating", type: "number" },
];
const comment_media = [
  { name: "id", type: "uuid" },
  { name: "comment_id", type: "uuid", key: "ref", tableName: "comment" },
  { name: "url", type: "text" },
  { name: "created_at", type: "date" },
];
const country = [
  { name: "id", type: "uuid" },
  { name: "name", type: "text" },
  { name: "alph-2", type: "text" },
  { name: "alph-3", type: "text" },
  { name: "code", type: "text" },
];
const coupon = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date" },
  { name: "code", type: "text" },
  { name: "value", type: "float8" },
  { name: "percentage", type: "checkbox" },
];
const credit_card = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date" },
  { name: "user_id", type: "uuid", key: "ref", tableName: "user" },
  { name: "number", type: "number" },
  { name: "exp_date", type: "date" },
];
const currency = [
  { name: "id", type: "uuid" },
  { name: "name", type: "text" },
  { name: "code", type: "text" },
  { name: "rate", type: "float8" },
  { name: "exchange_percent", type: "float8" },
];
const fabric = [{ name: "id", type: "uuid" }];
const fabric_content = [
  { name: "id", type: "uuid" },
  { name: "fabric_id", type: "uuid", key: "ref", tableName: "fabric" },
  { name: "language_id", type: "uuid", key: "ref", tableName: "language" },
  { name: "name", type: "text" },
];
const feature = [{ name: "id", type: "uuid" }];
const feature_content = [
  { name: "id", type: "uuid" },
  { name: "feature_id", type: "uuid", key: "ref", tableName: "feature" },
  { name: "language_id", type: "uuid", key: "ref", tableName: "language" },
  { name: "name", type: "text" },
];
const home_reviews = [
  { name: "id", type: "uuid" },
  { name: "name", type: "text" },
  { name: "rating", type: "int2" },
  { name: "content", type: "text" },
  { name: "image", type: "text" },
];
const language = [
  { name: "id", type: "uuid" },
  { name: "name", type: "text" },
  { name: "code", type: "text" },
];
const lining = [{ name: "id", type: "uuid" }];
const lining_content = [
  { name: "id", type: "uuid" },
  { name: "lining_id", type: "uuid", key: "ref", tableName: "lining" },
  { name: "language_id", type: "uuid", key: "ref", tableName: "language" },
];
const logs = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date" },
  { name: "description", type: "text" },
];
const material = [{ name: "id", type: "uuid" }];
const material_content = [
  { name: "id", type: "uuid" },
  { name: "material_id", type: "uuid", key: "ref", tableName: "material" },
  { name: "language_id", type: "uuid", key: "ref", tableName: "language" },
];
const news = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date" },
  { name: "content", type: "text" },
];
const newsletter = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date" },
  { name: "subject", type: "text" },
];
const newsletter_subscription = [{ name: "email", type: "text" }];
const offer = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date" },
  { name: "numerical", type: "number" },
];
const offer_content = [
  { name: "id", type: "uuid" },
  { name: "language_id", type: "uuid", key: "ref", tableName: "language" },
  { name: "name", type: "text" },
];
const offer_product = [
  { name: "id", type: "uuid" },
  {
    name: "product_id",
    type: "uuid",
    key: "ref",
    tableName: "product_content",
  },
  { name: "offer_id", type: "uuid", key: "ref", tableName: "offer_content" },
];
const order = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date" },
  { name: "user_id", type: "uuid", key: "ref", tableName: "user" },
];
const order_content = [
  { name: "id", type: "uuid" },
  { name: "order_id", type: "uuid", key: "ref", tableName: "order_content" },
  {
    name: "variant_id",
    type: "uuid",
    key: "ref",
    tableName: "product_content",
  },
];
const order_return_request = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date" },
  { name: "order_id", type: "uuid", key: "ref", tableName: "order_content" },
];
const order_status = [
  { name: "id", type: "uuid" },
  { name: "numerical", type: "int2" },
];
const order_status_content = [
  { name: "id", type: "uuid" },
  { name: "language_id", type: "uuid", key: "ref", tableName: "language" },
  {
    name: "order_status_id",
    type: "uuid",
    key: "ref",
    tableName: "order_status_content",
  },
];
const pattern = [{ name: "id", type: "uuid" }];
const pattern_content = [
  { name: "id", type: "uuid" },
  { name: "pattern_id", type: "uuid", key: "ref", tableName: "pattern" },
  { name: "language_id", type: "uuid", key: "ref", tableName: "language" },
];
const payment_status = [
  { name: "id", type: "uuid" },
  { name: "numerical", type: "int2" },
];
const payment_status_content = [
  { name: "id", type: "uuid" },
  { name: "language_id", type: "uuid", key: "ref", tableName: "language" },
  {
    name: "payment_status_id",
    type: "uuid",
    key: "ref",
    tableName: "payment_status_content",
  },
];
const point_content = [
  { name: "id", type: "uuid" },
  { name: "language_id", type: "uuid", key: "ref", tableName: "language" },
  { name: "point_id", type: "uuid", key: "ref", tableName: "point_content" },
];
const point_type = [
  { name: "id", type: "uuid" },
  { name: "numeric", type: "number" },
];
const product = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date" },
  { name: "product_sku", type: "text" },
];
const product_content = [
  { name: "id", type: "uuid" },
  {
    name: "product_id",
    type: "uuid",
    key: "ref",
    tableName: "product_content",
  },
  { name: "language_id", type: "uuid", key: "ref", tableName: "language" },
];
const product_image = [
  { name: "id", type: "uuid" },
  {
    name: "product_id",
    type: "uuid",
    key: "ref",
    tableName: "product_content",
  },
  { name: "color_id", type: "uuid", key: "ref", tableName: "color" },
];
const product_variant = [
  { name: "id", type: "uuid" },
  {
    name: "product_id",
    type: "uuid",
    key: "ref",
    tableName: "product_content",
  },
  { name: "color_id", type: "uuid", key: "ref", tableName: "color" },
];
const region = [
  { name: "id", type: "uuid" },
  { name: "name", type: "text" },
];
const return_status = [
  { name: "id", type: "uuid" },
  { name: "numerical", type: "int2" },
];
const return_status_content = [
  { name: "id", type: "uuid" },
  { name: "language_id", type: "uuid", key: "ref", tableName: "language" },
  {
    name: "return_status_id",
    type: "uuid",
    key: "ref",
    tableName: "return_status_content",
  },
];
const sale = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date" },
  {
    name: "product_id",
    type: "uuid",
    key: "ref",
    tableName: "product_content",
  },
];
const season = [{ name: "id", type: "uuid" }];
const season_content = [
  { name: "id", type: "uuid" },
  { name: "season_id", type: "uuid", key: "ref", tableName: "season" },
  { name: "language_id", type: "uuid", key: "ref", tableName: "language" },
];
const showreel = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date" },
  { name: "user_id", type: "uuid", key: "ref", tableName: "user" },
];
const showreel_like = [
  { name: "id", type: "uuid" },
  { name: "user_id", type: "uuid", key: "ref", tableName: "user" },
  { name: "showreel_id", type: "uuid", key: "ref", tableName: "showreel" },
];
const size = [
  { name: "id", type: "uuid" },
  {
    name: "category_id",
    type: "uuid",
    key: "ref",
    tableName: "category_content",
  },
  { name: "size_sku", type: "text" },
];
const size_content = [
  { name: "id", type: "uuid" },
  { name: "name", type: "text" },
  { name: "size_id", type: "uuid", key: "ref", tableName: "size_content" },
];
const sleeve = [{ name: "id", type: "uuid" }];
const sleeve_content = [
  { name: "id", type: "uuid" },
  { name: "sleeve_id", type: "uuid", key: "ref", tableName: "sleeve" },
  { name: "language_id", type: "uuid", key: "ref", tableName: "language" },
];
const stock = [
  { name: "id", type: "uuid" },
  {
    name: "variant_id",
    type: "uuid",
    key: "ref",
    tableName: "product_content",
  },
  { name: "warehouse_id", type: "uuid", key: "ref", tableName: "warehouse" },
];
const user = [
  { name: "id", format: "uuid" },
  { name: "created_at", format: "date" },
  { name: "first_name", format: "text" },
  { name: "last_name", format: "text" },
  { name: "email", format: "email" },
  { name: "phone", format: "text" },
  { name: "profile_img", format: "text" },
  { name: "wallet", format: "number" },
  { name: "country", format: "uuid", key: "ref", tableName: "country" },
  { name: "line_one", format: "text" },
  { name: "line_two", format: "text" },
  { name: "city", format: "text" },
  { name: "postal_code", format: "number" },
  {
    name: "default_address_id",
    format: "uuid",
    key: "ref",
    tableName: "address",
  },
  { name: "points", format: "number" },
];
const user_address = [
  { name: "id", type: "uuid" },
  { name: "title", type: "text" },
  { name: "user_id", type: "uuid", key: "ref", tableName: "user" },
];
const user_alert = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date" },
  { name: "user_id", type: "uuid", key: "ref", tableName: "user" },
];
const user_cart = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date" },
  { name: "user_id", type: "uuid", key: "ref", tableName: "user" },
];
const user_invite = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date" },
  { name: "user_id", type: "uuid", key: "ref", tableName: "user" },
];
const user_like = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date" },
  { name: "user_id", type: "uuid", key: "ref", tableName: "user" },
];
const user_point = [
  { name: "id", type: "uuid" },
  { name: "user_id", type: "uuid", key: "ref", tableName: "user" },
  { name: "point", type: "number" },
];
const user_suggestion = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date" },
  { name: "user_id", type: "uuid", key: "ref", tableName: "user" },
];
const user_ticket = [
  { name: "id", type: "uuid" },
  { name: "created_at", type: "date" },
  { name: "user_id", type: "uuid", key: "ref", tableName: "user" },
];
const user_wallet = [
  { name: "id", type: "uuid" },
  { name: "user_id", type: "uuid", key: "ref", tableName: "user" },
  { name: "amount", type: "number" },
];
const warehouse = [
  { name: "id", type: "uuid" },
  { name: "name", type: "text" },
  { name: "address_id", type: "uuid", key: "ref", tableName: "address" },
];
const warehouse_availability = [
  { name: "id", type: "uuid" },
  { name: "warehouse_id", type: "uuid", key: "ref", tableName: "address" },
  { name: "country_id", type: "uuid", key: "ref", tableName: "country" },
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
