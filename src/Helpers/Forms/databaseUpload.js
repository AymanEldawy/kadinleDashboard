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

const category_content = [
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

const home_reviews = [
  { name: "id", type: "uuid" },
  { name: "name", type: "text", required: true },
  { name: "rating", type: "number" },
  { name: "content", type: "text", required: true },
  { name: "image", type: "text", key: "image" },
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
  { name: "media", type: "text", required: true },
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

const UPLOAD_DB_API = {
  product_image,
  category_content,
  collection_content,
  color,
  home_reviews,
  offer_content,
};
export default UPLOAD_DB_API;
